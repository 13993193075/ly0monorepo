import {blindboxes} from '@yoooloo42/blindboxes'
import {crypto, Ali} from '@yoooloo42/ihavebacking'
import {GQuery} from '../../main/GQuery.js'

// 阿里云客户端参数集
const clientBox = {
    accessKeyId: process.env.ALI_SMS_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_SMS_ACCESS_KEY_SECRET,
    signName: process.env.ALI_SMS_SIGN_NAME,
    templateCode: process.env.ALI_SMS_TEMPLATE_CODE,
}

// 获取验证码
function getVercode (data) {
    // data.cellphone
    let codeLength = 6, // 验证码长度
        time = new Date(), // 验证码发生时间
        minutes = 5 // 几分钟内有效

    return new Promise(function (resolve, reject) {
        if(!data.cellphone){
            return resolve({code: 1, message: "没有手机号"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code: 1, message: "手机号格式错误"})
        }

        // 调用阿里云接口
        Ali.SMS.sendVercode(data.cellphone, codeLength, clientBox).then(result => {
            if(result.code === 0){
                console.log('短信验证码：', result.vercode)
                resolve({code: 0, message: '获取验证码成功',
                    data: {
                        cellphone: data.cellphone,
                        vercode: result.vercode,
                        time,
                        minutes
                    }
                })
            }else{
                resolve({code: 1, message: '获取验证码失败'})
            }
        })
    })
}

// 获取验证码 - 登录时
function getVercodeLogin (data) {
    // data.cellphone

    return new Promise(function (resolve, reject) {
        // 获取手机号注册信息
        GQuery({
            tblName: 'ly0d0cellphone',
            operator: 'findOne',
            query: {cellphone: data.cellphone}
        }).then(result => {
            if(!result.data){
                return resolve({code: 1, message: "手机号未注册"})
            }
            let objCellphone = result.data

            // 短信额度
            GQuery({
                tblName: "ly0d0login",
                operator: "findOne",
                query: {_id: objCellphone.id_login}
            }).then(result=>{
                let objLogin = result.data
                if (!objLogin.count || objLogin.count <= 0) {
                    return resolve({code: 1, message: '短信额度剩余次数不足'})
                }

                // 获取验证码
                getVercode({cellphone: data.cellphone}).then(resultGetVercode => {
                    if (resultGetVercode.code !== 0) {
                        return resolve({code: 1, message: "获取验证码失败"})
                    }

                    // 验证码加密
                    let vercodeCipherText = resultGetVercode.data.vercode ? crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
                    // 缓存验证码
                    GQuery({
                        tblName: 'ly0d0cellphone',
                        operator: 'updateOne',
                        query: {_id: objCellphone._id},
                        update: {
                            vercode: vercodeCipherText,
                            time: resultGetVercode.data.time,
                            minutes: resultGetVercode.data.minutes
                        }
                    }).then(() => {
                        GQuery({
                            tblName: "ly0d0login",
                            operator: "updateOne",
                            query: {_id: objLogin._id},
                            update: {
                                count: objLogin.count - 1 // 短信额度剩余次数减1
                            }
                        }).then(()=>{
                            resolve({code: 0, message: "获取验证码成功"})
                        })
                    })
                })
            })
        })
    })
}

// 短信登录
function login(data){
    // data.cellphone
    // data.vercode

    return new Promise(function (resolve, reject) {
        if(!data.cellphone){
            return resolve({code: 1, message: "没有手机号"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)){
            return resolve({code: 1, message: "手机号格式错误"})
        }
        if(!data.vercode){
            return resolve({code: 1, message: "没有验证码"})
        }
        // 验证码加密
        let vercodeCipherText = data.vercode ? crypto.Hash.sha256(data.vercode) : ""

        // 获取手机号注册信息
        GQuery({
            tblName: 'ly0d0cellphone',
            operator: 'findOne',
            query: {cellphone: data.cellphone}
        }).then(result => {
            if(!result.data){
                return resolve({code: 1, message: "手机号未注册"})
            }
            let objCellphone = result.data

            // 短信登录许可验证
            if(!objCellphone.vercode || objCellphone.vercode !== vercodeCipherText){
                return resolve({code: 1, message: "验证码错误"})
            }
            resolve({code: 0, message: "短信登录成功",
                id_login: objCellphone.id_login
            })
        })
    })
}

// 获取验证码 - 绑定时
function getVercodeBind (data) {
    // data.id_login
    // data.cellphone

    return new Promise(function (resolve, reject) {
        if(!data.id_login){
            return resolve({code: 1, message: "没有账号id"})
        }
        if(!data.cellphone){
            return resolve({code: 1, message: "没有手机号"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code: 1, message: "手机号格式错误"})
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
            let objLogin = result.data

            // 短信额度
            if (!objLogin.count || objLogin.count <= 0) {
                return resolve({code: 1, message: '短信额度剩余次数不足'})
            }

            // 获取验证码
            getVercode({cellphone: data.cellphone}).then(resultGetVercode => {
                if (resultGetVercode.code !== 0) {
                    return resolve({code: 1, message: "获取验证码失败"})
                }

                // 验证码加密
                let vercodeCipherText = resultGetVercode.data.vercode ? crypto.Hash.sha256(resultGetVercode.data.vercode) : ""
                // 缓存验证码
                GQuery({
                    tblName: "ly0d0cellphone",
                    operator: "updateOne",
                    query: {cellphone: data.cellphone},
                    update: {
                        id_login: objLogin._id,
                        cellphone: data.cellphone,
                        vercode: vercodeCipherText,
                        time: resultGetVercode.data.time,
                        minutes: resultGetVercode.data.minutes
                    },
                    upsert: true
                }).then(()=>{
                    GQuery({
                        tblName: "ly0d0login",
                        operator: "updateOne",
                        query: {_id: objLogin._id},
                        update: {count: objLogin.count - 1} // 短信额度剩余次数减1
                    }).then(()=>{
                        return resolve({code: 0, message: "获取验证码成功"})
                    })
                })
            })
        })
    })
}

// 手机号绑定
function bind (data) {
    // data.id_login
    // data.cellphone
    // data.vercode
    // data.password

    return new Promise(function (resolve, reject) {
        if(!data.id_login){
            return resolve({code: 1, message: "没有账号id"})
        }

        if(!data.cellphone){
            return resolve({code: 1, message: "没有手机号"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code: 1, message: "手机号格式错误"})
        }

        if(!data.vercode){
            return resolve({code: 1, message: "没有验证码"})
        }
        // 验证码加密
        let vercodeCipherText = crypto.Hash.sha256(data.vercode)

        if(!data.password){
            return resolve({code: 1, message: "没有登录密码"})
        }
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
                tblName: 'ly0d0cellphone',
                operator: 'findOne',
                query: {
                    cellphone: data.cellphone
                }
            }).then(result => {
                // 绑定许可验证
                if(
                    !result.data ||
                    result.data.vercode !== vercodeCipherText
                ){
                    return resolve({code: 1, message: "手机号或验证码错误"})
                }
                // 清空垃圾数据
                GQuery({
                    tblName: 'ly0d0cellphone',
                    operator: 'deleteMany',
                    query: {cellphone: data.cellphone}
                }).then(() => {
                    // 注册手机号
                    GQuery({
                        tblName: 'ly0d0cellphone',
                        operator: 'insertOne',
                        update: {
                            id_login: objLogin._id,
                            cellphone: data.cellphone,
                            password: passwordCipherText
                        }
                    }).then(() => {
                        resolve({code: 0, message: '绑定手机号成功'})
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