import { ElMessage, ElMessageBox } from 'element-plus'
import { request as ly0request } from '@yoooloo42/ly0browser'

// 复位
function reset({scopeThis}) {
    scopeThis.passwordData.type = 'number'
    scopeThis.passwordData.label = '工号'
    scopeThis.passwordData.number = ''
    scopeThis.passwordData.password = ''
}

// 密码登录标签
function labelChange({scopeThis, type}) {
    scopeThis.passwordData.type = type
    if (type === 'number') {
        scopeThis.passwordData.label = '工号'
    } else if (type === 'cellphone') {
        scopeThis.passwordData.label = '手机号'
    } else if (type === 'email') {
        scopeThis.passwordData.label = '电子邮箱'
    } else {
        scopeThis.passwordData.branch = 'number'
        scopeThis.passwordData.label = '工号'
    }
}

// 提交
async function submit({scopeThis}) {
    if (!scopeThis.passwordData.number) {
        ElMessage("没有输入" + scopeThis.passwordData.label)
        return
    }
    if (!scopeThis.passwordData.password) {
        ElMessage("没有输入密码")
        return
    }

    // 登录账号验证
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.password.login",
        data: {
            type: scopeThis.passwordData.type,
            number: scopeThis.passwordData.number,
            password: scopeThis.passwordData.password
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
    labelChange,
    submit
}
