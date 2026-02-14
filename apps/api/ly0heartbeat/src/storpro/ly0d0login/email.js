import {crypto, Email} from 'packages/ly0libs'
import {blindboxes} from 'packages/ly0utils'
import {GQuery} from '../../main/GQuery.js'

// 获取验证码
function getVercode (data) {
    // data.email
    let codeLength = 6, // 验证码长度
        time = new Date(), // 验证码发生时间
        minutes = 5 // 几分钟内有效

    return new Promise(function (resolve, reject) {
        if(!data.email){
            return resolve({code: 1, message: "没有Email"})
        }
        if (!blindboxes.regexp.email(data.email)) {
            return resolve({code: 1, message: "Email格式错误"})
        }

        // 发送验证码
        Email.sendVercode(data.email, codeLength, minutes).then(result=>{
            if(result.success){
                resolve({code: 0, message: 'Email获取验证码成功',
                    data: {
                        email: data.email,
                        vercode: result.vercode,
                        time,
                        minutes
                    }
                })
            }else{
                resolve({code: 1, message: 'Email获取验证码失败'})
            }
        })
    })
}

// 获取验证码 - 登录时
function getVercodeLogin (data) {
    // data.email

    return new Promise(function (resolve, reject) {
        // 获取Email注册信息
        GQuery({
            tblName: 'ly0d0email',
            operator: 'findOne',
            query: {email: data.email}
        }).then(result => {
            if(!result.data){
                return resolve({code: 1, message: "Email未注册"})
            }
            let objEmail = result.data

            // 获取验证码
            getVercode({email: data.email}).then(resultGetVercode => {
                if (resultGetVercode.code !== 0) {
                    return resolve({code: 1, message: "获取验证码失败"})
                }

                // 验证码加密
                let vercodeCipherText = resultGetVercode.data.vercode ? crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
                // 缓存验证码
                GQuery({
                    tblName: 'ly0d0email',
                    operator: 'updateOne',
                    query: {_id: objEmail._id},
                    update: {
                        vercode: vercodeCipherText,
                        time: resultGetVercode.data.time,
                        minutes: resultGetVercode.data.minutes
                    }
                }).then(() => {
                    resolve({code: 0, message: "获取验证码成功"})
                })
            })
        })
    })
}

// Email验证码登录
function login(data){
    // data.email
    // data.vercode

    return new Promise(function (resolve, reject) {
        if(!data.email){
            return resolve({code: 1, message: "没有Email"})
        }
        // Email格式
        if (!blindboxes.regexp.email(data.email)) {
            return resolve({code: 1, message: "Email格式错误"})
        }
        if(!data.vercode){
            return resolve({code: 1, message: "没有验证码"})
        }
        // 验证码加密
        let vercodeCipherText = data.vercode ? crypto.Hash.sha256(data.vercode) : ""

        // 获取Email注册信息
        GQuery({
            tblName: 'ly0d0email',
            operator: 'findOne',
            query: {email: data.email}
        }).then(result => {
            if(!result.data){
                return resolve({code: 1, message: "Email未注册"})
            }
            const objEmail = result.data

            // Email登录许可验证
            if(!objEmail.vercode || objEmail.vercode !== vercodeCipherText){
                return resolve({code: 1, message: "验证码错误"})
            }
            resolve({code: 0, message: "Email验证码登录成功",
                id_login: objEmail.id_login
            })
        })
    })
}

// 获取验证码 - 绑定时
function getVercodeBind (data) {
    // data.id_login
    // data.email

    return new Promise(function (resolve, reject) {
        if(!data.id_login){
            return resolve({code: 1, message: "没有账号id"})
        }
        if(!data.email){
            return resolve({code: 1, message: "没有Email"})
        }
        // Email格式
        if (!blindboxes.regexp.email(data.email)) {
            return resolve({code: 1, message: "Email格式错误"})
        }

        // 获取登录账号信息
        GQuery({
            tblName: "ly0d0login",
            operator: "findOne",
            query: {_id: data.id_login}
        }).then(result=>{
            if(!result.data){
                return resolve({code: 0, message: "账号id错误"})
            }
            const objLogin = result.data

            // 获取验证码并发送
            getVercode({email: data.email}).then(resultGetVercode => {
                if (resultGetVercode.code !== 0) {
                    return resolve({code: 1, message: "获取验证码失败"})
                }

                // 验证码加密
                let vercodeCipherText = resultGetVercode.data.vercode ? crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
                // 缓存验证码
                GQuery({
                    tblName: "ly0d0email",
                    operator: "updateOne",
                    query: {email: data.email},
                    update: {
                        id_login: objLogin._id,
                        email: data.email,
                        vercode: vercodeCipherText,
                        time: resultGetVercode.data.time,
                        minutes: resultGetVercode.data.minutes
                    },
                    upsert: true
                }).then(()=>{
                    return resolve({code: 0, message: "获取验证码成功"})
                })
            })
        })
    })
}

// email绑定
function bind (data) {
    // data.id_login
    // data.email
    // data.vercode
    // data.password

    return new Promise(function (resolve, reject) {
        if(!data.id_login){
            return resolve({code: 1, message: "没有账号id"})
        }

        if(!data.email){
            return resolve({code: 1, message: "没有Email"})
        }
        if (!blindboxes.regexp.email(data.email)) {
            return resolve({code: 1, message: "Email格式错误"})
        }

        if(!data.vercode){
            return resolve({code: 1, message: "没有验证码"})
        }
        // 验证码加密
        let vercodeCipherText = crypto.Hash.sha256(data.vercode)

        if(!data.password){
            return resolve({code: 1, message: "没有登录密码"})
        }
        // 登录密码格式验证
        if (!blindboxes.regexp.password(data.password)) {
            return resolve({code: 1, message: '登录密码格式错误'})
        }
        // 登录密码加密
        let passwordCipherText = crypto.Hash.sha256(data.password)

        // 获取登录账号信息
        GQuery({
            tblName: 'ly0d0login',
            operator: 'findOne',
            query: {_id: data.id_login}
        }).then(result => {
            if (!result.data) {
                return resolve({code: 1, message: '账号id错误'})
            }
            let objLogin = result.data

            GQuery({
                tblName: 'ly0d0email',
                operator: 'findOne',
                query: {
                    email: data.email
                }
            }).then(result => {
                // 绑定许可验证
                if(
                    !result.data ||
                    result.data.vercode !== vercodeCipherText
                ){
                    return resolve({code: 1, message: "Email或验证码错误"})
                }
                // 清空垃圾数据
                GQuery({
                    tblName: 'ly0d0email',
                    operator: 'deleteMany',
                    query: {email: data.email}
                }).then(() => {
                    // 注册Email
                    GQuery({
                        tblName: 'ly0d0email',
                        operator: 'insertOne',
                        update: {
                            id_login: objLogin._id,
                            email: data.email,
                            password: passwordCipherText
                        }
                    }).then(() => {
                        resolve({code: 0, message: '绑定Email成功'})
                    })
                })
            })
        })
    })
}

export default {
    getVercode,
    getVercodeLogin,
    login,
    getVercodeBind,
    bind
}