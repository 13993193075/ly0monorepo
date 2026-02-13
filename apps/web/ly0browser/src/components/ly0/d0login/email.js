import { ElMessage, ElMessageBox } from 'element-plus'
import {request} from '@yoooloo42/ihavebacking'
const ly0request = request.ly0

function getVercode(scopeThis) {
    return new Promise((resolve, reject)=>{
        scopeThis.emailData.thisTime = new Date()
        if (scopeThis.emailData.lastTime && (scopeThis.emailData.thisTime - scopeThis.emailData.lastTime) <= 1000 * 60) {
            ElMessage("1分钟内不能再次发送验证码")
            return resolve()
        }

        ly0request.storpro({
            storproName: "ly0d0login.email.getVercodeLogin",
            data: {email: scopeThis.emailData.email},
            noSession: true,
        }).then(result => {
            ElMessage(result.message)
            if (result.code === 0) {
                scopeThis.emailData.lastTime = scopeThis.emailData.thisTime
            } else {
                scopeThis.emailData.lastTime = null
            }
            resolve()
        })
    })
}

function submit(scopeThis) {
    return new Promise((resolve, reject)=>{
        if (!scopeThis.emailData.email) {
            ElMessage("没有email")
            return resolve()
        }
        if (!scopeThis.emailData.vercode) {
            ElMessage("没有验证码")
            return resolve()
        }

        // 后台登录
        ly0request.storpro({
            storproName: "ly0d0login.email.login",
            data: {
                email: scopeThis.emailData.email,
                vercode: scopeThis.emailData.vercode
            },
            noSession: true,
        }).then(result => {
            // 登录信息初始化
            scopeThis.loginData = JSON.parse(JSON.stringify(scopeThis.loginDataInit))
            // 重置登录信息
            if (result.code === 0) {
                scopeThis.loginData.id_login = result.id_login
                scopeThis.loginData.email = scopeThis.emailData.email
                scopeThis.loginData.type = "email"
                scopeThis.loginPg = "login"
                ElMessage("Email登录成功")
                resolve()
            }else{
                ElMessage("Email登录失败")
                resolve()
            }
        })
    })
}

function reset(scopeThis) {
    scopeThis.emailData.email = ""
    scopeThis.emailData.vercode = ""
}

export default {
    getVercode,
    submit,
    reset
}
