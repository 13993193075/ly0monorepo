import { ElMessage, ElMessageBox } from 'element-plus'
import {request as ly0request} from '@yoooloo42/ly0browser'

// 获取登录账号信息
async function getData({scopeThis}){
    const result = await ly0request.ly0.storpro({
        noSession: true,
        storproName: "ly0d0login.destroy.id_login",
        data: {id_login: scopeThis.Props.id_login}
    })
    scopeThis.loginData.objLogin = result.data.objLogin
    scopeThis.loginData.arrNumber = result.data.arrNumber
    scopeThis.loginData.arrCellphone = result.data.arrCellphone
    scopeThis.loginData.arrEmail = result.data.arrEmail
    scopeThis.loginData.arrWx = result.data.arrWx
}

// 弹出设置登录密码窗口
function setPassword({scopeThis, number, type}){
    scopeThis.setPassword.formData.number = number
    scopeThis.setPassword.formData.type = type
    if(type === "number"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "工号"
    }else if(type === "cellphone"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "手机号"
    }else if(type === "email"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "电子邮箱"
    }
    scopeThis.setPassword.formProps.popup.visible = true
}

// 注销工号|手机号|电子邮箱|微信|登录账号
async function destroy({scopeThis, type}){
    // type.type
    // type.number
    // type.cellphone
    // type.email
    // type.wx_appid
    // type.wx_openid
    // type.wx_nickname
    // type.id_login

    let warnLabel, storproName, q
    if(type.type === "number"){
        warnLabel = "注销工号 " + type.number
        storproName = "ly0d0login.destroy.number"
        q = {number: type.number}
    }else if(type.type === "cellphone"){
        warnLabel = "注销手机号 " + type.cellphone
        storproName = "ly0d0login.destroy.cellphone"
        q = {cellphone: type.cellphone}
    }else if(type.type === "email"){
        warnLabel = "注销电子邮箱 " + type.email
        storproName = "ly0d0login.destroy.email"
        q = {email: type.email}
    }else if(type.type === "wx"){
        warnLabel = "注销微信 " + type.wx_nickname
        storproName = "ly0d0login.destroy.wx"
        q = {
            appid: type.wx_appid,
            openid: type.wx_openid
        }
    }else if(type.type === "destroy"){
        warnLabel = "注销登录账号 " + type.id_login
        storproName = "ly0d0login.destroy.destroy"
        q = {id_login: type.id_login}
    }

    try{
        await ElMessageBox.confirm(warnLabel, '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        const result = await ly0request.ly0.storpro({
            storproName,
            data: q
        })
        ElMessage(result.message)
        if(type.type === "destroy"){
            scopeThis.Props.popup.visible = false
        }else{
            await getData({scopeThis})
        }
    }catch(err){
        ElMessage({type: 'info', message: '取消'})
    }
}

export default {
    getData,
    setPassword,
    destroy
}
