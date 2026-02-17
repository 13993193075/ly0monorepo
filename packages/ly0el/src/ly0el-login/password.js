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

    // 后台登录
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.password.login",
        data: {
            type: scopeThis.passwordData.type,
            number: scopeThis.passwordData.number,
            password: scopeThis.passwordData.password
        },
        noSession: true,
    })
    ElMessage(result.message)

    // 应用入口处理
    if (result.code === 0) {
        scopeThis.loginData.type = scopeThis.passwordData.type
        scopeThis.loginData.id_login = result.id_login
        scopeThis.loginData[scopeThis.passwordData.type] = scopeThis.passwordData.number
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
    labelChange,
    submit
}
