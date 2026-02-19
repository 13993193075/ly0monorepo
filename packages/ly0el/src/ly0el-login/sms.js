import { ElMessage, ElMessageBox } from 'element-plus'
import { request as ly0request } from '@yoooloo42/ly0browser'

// 复位
function reset({scopeThis}) {
    scopeThis.smsData.cellphone = ""
    scopeThis.smsData.vercode = ""
}

// 获取验证码
async function getVercode({scopeThis}) {
    scopeThis.smsData.thisTime = new Date()
    if (scopeThis.smsData.lastTime && (scopeThis.smsData.thisTime - scopeThis.smsData.lastTime) <= 1000 * 60) {
        ElMessage("1分钟内不能再次发送验证码")
        return
    }

    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.sms.getVercodeLogin",
        data: {cellphone: scopeThis.smsData.cellphone},
        noSession: true,
    })
    ElMessage(result.message)
    if (result.code === 0) {
        scopeThis.smsData.lastTime = scopeThis.smsData.thisTime
    } else {
        scopeThis.smsData.lastTime = null
    }
}

// 提交
async function submit({scopeThis}) {
    if (!scopeThis.smsData.cellphone) {
        ElMessage("没有输入手机号")
        return
    }
    if (!scopeThis.smsData.vercode) {
        ElMessage("没有输入验证码")
        return
    }

    // 登录账号验证
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.sms.login",
        data: {
            cellphone: scopeThis.smsData.cellphone,
            vercode: scopeThis.smsData.vercode
        },
        noSession: true,
    })
    if (result.code === 0) {
        ElMessage('登录账号验证成功')
        scopeThis.loginData.type = scopeThis.passwordData.type
        scopeThis.loginData.id_login = result.id_login
        scopeThis.loginData[scopeThis.passwordData.type] = scopeThis.passwordData.number
        await scopeThis.handlers.loggedin({scopeThis})
    }else{
        ElMessage('登录账号验证失败')
    }
}

export default {
    reset,
    getVercode,
    submit,
}
