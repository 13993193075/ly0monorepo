import {crypto} from '@yoooloo42/ly0nodejs'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {GQuery} from '../../main/GQuery.js'

// 密码登录
async function login(data){
    // data.number 工号
    // data.type 工号类型：number, cellphone, email
    // data.password 登录密码

    let type = data.type ? data.type : "number"
    if(!data.number){
        let message = ""
        if(type === "number"){
            message = "没有工号"
        }else if(type === "cellphone"){
            message = "没有手机号"
        }else if(type === "email"){
            message = "没有电子邮箱"
        }
        return {code: 1, message}
    }
    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 密码加密
    let passwordCipherText = crypto.Hash.sha256(data.password)
    // 表名及查询条件
    let tblName = "ly0d0number", q = {}
    if(data.type === "cellphone"){
        tblName = "ly0d0cellphone"
    }else if(data.type === "email"){
        tblName = "ly0d0email"
    }
    q[type] = data.number
    // 获取注册信息
    const result = await GQuery({
        tblName,
        operator: "findOne",
        query: q
    })
    const objNumber = result.data
    if(!objNumber){
        let message = ""
        if(type === "number"){
            message = "工号未注册"
        }else if(type === "cellphone"){
            message = "手机号未注册"
        }else if(type === "email"){
            message = "电子邮箱未注册"
        }
        return {code: 1, message}
    }
    // 密码验证
    if(objNumber.password === passwordCipherText){
        return {code: 0, message: "密码登录成功",
            id_login: objNumber.id_login
        }
    }else{
        return {code: 1, message: "密码错误，不能登录"}
    }
}

// 修改登录密码
async function setPassword(data) {
    // data.number
    // data.type
    // data.password
    // data.password_old

    let label = ""
    if(data.type === "number"){
        label = "工号"
    }else if(data.type === "cellphone"){
        label = "手机号"
    }else if(data.type === "email"){
        label = "电子邮箱"
    }

    if(!data.number){
        return {code: 1, message: "没有" + label}
    }
    let type = data.type || "number"
    if(!data.password){
        return {code: 1, message: "没有新密码"}
    }

    // 新密码格式
    let result = ly0utils.regexp.password(data.password)
    if (!result) {
        return {code: 1, message: '新密码格式错误或强度不够'}
    }
    // 密码加密
    const passwordCipherText = crypto.Hash.sha256(data.password)
    const passwordCipherText_old = crypto.Hash.sha256(data.password_old)

    // 表名及查询条件
    let tblName = "ly0d0number", q = {}
    if(data.type === "cellphone"){
        tblName = "ly0d0cellphone"
    }else if(data.type === "email"){
        tblName = "ly0d0email"
    }
    q[type] = data.number

    // 获取注册信息
    result = await GQuery({
        tblName,
        operator: "findOne",
        query: q
    })
    const objNumber = result.data
    if(!objNumber){
        return {code: 1, message: label + "未注册"}
    }
    if(objNumber.password !== passwordCipherText_old){
        return {code: 1, message: "旧密码错误"}
    }

    // 修改密码
    await GQuery({
        tblName,
        operator: "updateOne",
        query: {_id: objNumber._id},
        update: {password: passwordCipherText}
    })
    return {code: 0, message: "修改密码成功"}
}

export default {
    login,
    setPassword,
}