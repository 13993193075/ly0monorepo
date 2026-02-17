import { ElMessage, ElMessageBox } from 'element-plus'
import { request as ly0request } from '@yoooloo42/ly0browser'

// 复位
function reset({scopeThis}) {
    scopeThis.emailData.email = ""
    scopeThis.emailData.vercode = ""
}

// 获取验证码
async function getVercode({scopeThis}) {
    scopeThis.emailData.thisTime = new Date()
    if (scopeThis.emailData.lastTime && (scopeThis.emailData.thisTime - scopeThis.emailData.lastTime) <= 1000 * 60) {
        ElMessage("1分钟内不能再次发送验证码")
        return
    }

    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.email.getVercodeLogin",
        data: {email: scopeThis.emailData.email},
        noSession: true,
    })
    ElMessage(result.message)
    if (result.code === 0) {
        scopeThis.emailData.lastTime = scopeThis.emailData.thisTime
    } else {
        scopeThis.emailData.lastTime = null
    }
}

// 提交
async function submit({scopeThis}) {
    if (!scopeThis.emailData.email) {
        ElMessage("没有输入电子邮箱")
        return
    }
    if (!scopeThis.emailData.vercode) {
        ElMessage("没有输入验证码")
        return
    }

    // 后台登录
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.email.login",
        data: {
            email: scopeThis.emailData.email,
            vercode: scopeThis.emailData.vercode
        },
        noSession: true,
    })
    ElMessage(result.message)

    // 应用入口处理
    if (result.code === 0) {
        scopeThis.loginData.type = "email"
        scopeThis.loginData.id_login = result.id_login
        scopeThis.loginData.email = scopeThis.emailData.email
        if(scopeThis.app === 'ly0'){
            // 应用入口：ly0，选择用户组
            scopeThis.showPg = "Group"
            return
        }
        ElMessage('没有预置应用入口')
    }
}

export default {
    reset,
    getVercode,
    submit,
}
