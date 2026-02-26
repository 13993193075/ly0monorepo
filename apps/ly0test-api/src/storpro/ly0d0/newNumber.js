import {GQuery} from '../../main/GQuery.js'
import {crypto} from '@yoooloo42/ly0nodejs'

// 注册新工号（用户管理）
async function newNumber(data) {
    // data.userTbl
    // data.userId
    // data.number
    // data.password

    if(!data.userTbl){
        return {code: 1, message: "没有用户表名"}
    }
    if(!data.userId){
        return {code: 1, message: "没有用户id"}
    }
    if(!data.number){
        return {code: 1, message: "没有工号"}
    }
    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 密码加密
    const passwordCipherText = crypto.Hash.sha256(data.password)

    // 查询工号是否已被占用
    let result = await GQuery({
        tblName: 'ly0d0number',
        operator: 'findOne',
        query: {number: data.number},
    })
    if(result.data){
        return {code: 1, message: '工号已被占用'}
    }

    // 获取用户信息
    result = await GQuery({
        tblName: data.userTbl,
        operator: 'findOne',
        query: {_id: data.userId},
    })
    const objUser = result.data

    // 用户是否已注册登录账号
    let objLogin = null
    if(objUser.id_login){
        // 用户已注册登录账号，获取账号信息
        result = await GQuery({
            tblName: 'ly0d0login',
            operator: 'findOne',
            query: {_id: objUser.id_login}
        })
        objLogin = result.data
    }else{
        // 否则，发生新的登录账号记录
        result = await GQuery({
            tblName: 'ly0d0login',
            operator: 'insertOne',
            update: {count: 0}
        })
        objLogin = result.dataNew
    }

    // 发生新的工号记录
    await GQuery({
        tblName: 'ly0d0number',
        operator: 'insertOne',
        update: {
            id_login: objLogin._id,
            number: data.number,
            password: passwordCipherText,
        }
    })

    // 用户未注册过登录账号，完成注册
    if(!objUser.id_login){
        await GQuery({
            tblName: data.userTbl,
            operator: 'updateOne',
            query: {_id: data.userId},
            update: {id_login: objLogin._id}
        })
    }

    return {code: 0, message: '工号注册成功'}
}

// 注册新工号（已登录）
async function loggedin(data){
    // data.id_login
    // data.number
    // data.password

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }
    if(!data.number){
        return {code: 1, message: "没有工号"}
    }
    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 登录密码格式
    let result = ly0utils.regexp.password(data.password)
    if (result.code !== 0) {
        return result
    }
    // 登录密码加密
    let passwordCipherText = crypto.Hash.sha256(data.password)

    result = await GQuery({
        tblName: "ly0d0login",
        operator: "findOne",
        query: {_id: data.id_login}
    })
    const objLogin = result.data
    if(!objLogin){
        return {code: 1, message: "账号id不存在"}
    }
    result = await GQuery({
        tblName: "ly0d0number",
        operator: "findOne",
        query: {
            number: data.number
        }
    })
    const objNumber = result.data
    if(!!objNumber){
        return {code: 1, message: "工号已存在"}
    }

    await GQuery({
        tblName: "ly0d0number",
        operator: "insertOne",
        update: {
            id_login: data.id_login,
            number: data.number,
            password: passwordCipherText
        }
    })
    return {code: 0, message: "注册工号成功"}
}
export default {
    newNumber,
    loggedin
}