import { ElMessage, ElMessageBox } from 'element-plus'
import {request} from '@yoooloo42/ihavebacking'
const ly0request = request.ly0

function submit(scopeThis) {
    return new Promise((resolve, reject)=>{
        if (!scopeThis.passwordData.number) {
            if(scopeThis.passwordData.type === "number"){
                ElMessage("没有工号")
            }else if(scopeThis.passwordData.type === "cellphone"){
                ElMessage("没有手机号")
            }else if(scopeThis.passwordData.type === "email"){
                ElMessage("没有email")
            }
            return resolve()
        }
        if (!scopeThis.passwordData.password) {
            ElMessage("没有密码")
            return resolve()
        }

        // 后台登录
        ly0request.storpro({
            storproName: "ly0d0login.password.login",
            data: {
                number: scopeThis.passwordData.number,
                type: scopeThis.passwordData.type,
                password: scopeThis.passwordData.password
            },
            noSession: true,
        }).then(result => {
            ElMessage(result.message)
            // 登录信息初始化
            scopeThis.loginData = JSON.parse(JSON.stringify(scopeThis.loginDataInit))
            // 重置登录信息
            if (result.code === 0) {
                scopeThis.loginData.id_login = result.id_login
                scopeThis.loginData[scopeThis.passwordData.type] = scopeThis.passwordData.number
                scopeThis.loginData.type = scopeThis.passwordData.type
                scopeThis.loginPg = "login"
            }
            resolve()
        })
    })
}

export default {
    submit
}
