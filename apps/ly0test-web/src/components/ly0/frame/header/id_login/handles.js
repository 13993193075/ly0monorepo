import { ElMessage, ElMessageBox } from 'element-plus'
import {request as ly0request} from '@yoooloo42/ly0browser'

function getData(scopeThis){
    return new Promise((resolve, reject)=>{
        ly0request.ly0request.storpro({
            noSession: true,
            storproName: "ly0d0login.destroy.id_login",
            data: {id_login: scopeThis.id_login}
        }).then(result=>{
            scopeThis.loginData.objLogin = result.data.objLogin
            scopeThis.loginData.arrNumber = result.data.arrNumber
            scopeThis.loginData.arrCellphone = result.data.arrCellphone
            scopeThis.loginData.arrEmail = result.data.arrEmail
            scopeThis.loginData.arrWx = result.data.arrWx
            resolve()
        })
    })
}

function setPassword(scopeThis, number, type){
    scopeThis.setPassword.formData.number = number
    scopeThis.setPassword.formData.type = type

    if(type === "number"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "工号"
    }else if(type === "cellphone"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "手机号"
    }else if(type === "email"){
        scopeThis.setPassword.formProps.cols[0].items[0].label = "email"
    }

    scopeThis.setPassword.formProps.popup.visible = true
}

function destroy(scopeThis, type){
    // type.type
    // type.number
    // type.cellphone
    // type.email
    // type.wx_appid
    // type.wx_openid
    // type.wx_nickname
    // type.id_login

    return new Promise((resolve, reject)=>{
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
            warnLabel = "注销email " + type.email
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

        ElMessageBox.confirm(warnLabel, '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            ly0request.ly0request.storpro({
                storproName,
                data: q
            }).then(result=>{
                ElMessage(result.message)
                if(type.type === "destroy"){
                    scopeThis.result.destroy = true // 账号已注销
                    scopeThis.myProps.popup.visible = false
                    resolve()
                }else{
                    getData(scopeThis)
                    resolve()
                }
            })
        }).catch(()=>{
            ElMessage({type: 'info', message: '取消'})
            resolve()
        })
    })
}

export default {
    getData,
    setPassword,
    destroy
}
