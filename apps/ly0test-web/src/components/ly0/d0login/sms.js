import { ElMessage, ElMessageBox } from 'element-plus'
import {request} from 'packages/ly0libs/src/index.js'
const ly0request = request.ly0

function getVercode(scopeThis) {
    return new Promise((resolve, reject)=>{
        scopeThis.smsData.thisTime = new Date()
        if (scopeThis.smsData.lastTime && (scopeThis.smsData.thisTime - scopeThis.smsData.lastTime) <= 1000 * 60) {
            ElMessage("1分钟内不能再次发送验证码")
            return resolve()
        }

        ly0request.storpro({
            storproName: "ly0d0login.sms.getVercodeLogin",
            data: {cellphone: scopeThis.smsData.cellphone},
            noSession: true,
        }).then(result => {
            ElMessage(result.message)
            if (result.code === 0) {
                scopeThis.smsData.lastTime = scopeThis.smsData.thisTime
            } else {
                scopeThis.smsData.lastTime = null
            }
            resolve()
        })
    })
}

function submit(scopeThis) {
    return new Promise((resolve, reject)=>{
        if (!scopeThis.smsData.cellphone) {
            ElMessage("没有手机号")
            return resolve()
        }
        if (!scopeThis.smsData.vercode) {
            ElMessage("没有验证码")
            return resolve()
        }

        // 后台登录
        ly0request.storpro({
            storproName: "ly0d0login.sms.login",
            data: {
                cellphone: scopeThis.smsData.cellphone,
                vercode: scopeThis.smsData.vercode
            },
            noSession: true,
        }).then(result => {
            // 登录信息初始化
            scopeThis.loginData = JSON.parse(JSON.stringify(scopeThis.loginDataInit))
            // 重置登录信息
            if (result.code === 0) {
                scopeThis.loginData.id_login = result.id_login
                scopeThis.loginData.cellphone = scopeThis.smsData.cellphone
                scopeThis.loginData.type = "cellphone"
                scopeThis.loginPg = "login"
                ElMessage("短信登录成功")
                resolve()
            }else{
                ElMessage("短信登录失败")
                resolve()
            }
        })
    })
}

function reset(scopeThis) {
    scopeThis.smsData.cellphone = ""
    scopeThis.smsData.vercode = ""
}

export default {
    getVercode,
    submit,
    reset
}
