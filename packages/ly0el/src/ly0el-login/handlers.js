import {request as ly0request} from "@yoooloo42/ly0browser";
import password from "./password.js"
import sms from "./sms.js"
import email from "./email.js"
import wx from "./wx.js"
import ly0 from "./ly0/handlers.js"
import {ElMessage} from "element-plus";

// 发生新session
async function newSession({scopeThis}){
    let usertbl = '',
        id_user = null
    if(scopeThis.loginData.app === 'ly0'){
        usertbl = scopeThis.loginData.ly0.usertbl
        id_user = scopeThis.loginData.ly0.arrUser0[0]._id
    }

    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.session.newSession",
        data: {
            id_login: scopeThis.loginData.id_login,
            type: scopeThis.loginData.type,
            number: scopeThis.loginData.number,
            cellphone: scopeThis.loginData.cellphone,
            email: scopeThis.loginData.email,
            wx_appid: scopeThis.loginData.wx_appid,
            wx_openid: scopeThis.loginData.wx_openid,
            app: scopeThis.loginData.app,
            usertbl,
            id_user,
        },
        noSession: true,
    })
    ElMessage(result.message)
    if(result.code !== 0){
        ElMessage("数据库写入session失败")
        scopeThis.showPg = "password"
        return
    }
    // 浏览器缓存session
    ly0request.ly0.ly0sessionSave(result.ly0session)
}

// 登录账号验证完成
async function loggedin({scopeThis}){
    // 应用入口：ly0，选择用户组
    if(scopeThis.loginData.app && scopeThis.loginData.app === 'ly0' && scopeThis.loginData.ly0){
        scopeThis.showPg = "ly0"
        return
    }

    // 发生新session
    await newSession({scopeThis})

    // 仅刷新session，不做路由跳转
    if(scopeThis.loginData.sessionOnly){
        // 关闭登录窗口
        if(scopeThis.popup.switch){
            scopeThis.popup.visible = false
        }
        // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
        emit("update:modelValue", scopeThis.loginData.id_login)
        return
    }

    // 路由跳转
    if(scopeThis.loginData.route_type && scopeThis.loginData.route){
        // 关闭登录窗口
        if(scopeThis.popup.switch){
            scopeThis.popup.visible = false
        }
        // 路由跳转
        ly0request.ly0.navigate({
            code: scopeThis.loginData.route_type,
            path: scopeThis.loginData.route,
        })
    }
}

export default {
    loggedin,
    newSession,
    password,
    sms,
    email,
    wx,
    ly0,
}