import {request as ly0request} from "@yoooloo42/ly0browser";
import password from "./password.js"
import sms from "./sms.js"
import email from "./email.js"
import wx from "./wx.js"
import ly0 from "./ly0/handlers.js"
import {ElMessage} from "element-plus"
import branchApp from "./branch-app.js"

// 发生新session
async function newSession({scopeThis}){
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
            usertbl: scopeThis.loginData.branch[scopeThis.loginData.app].usertbl,
            id_user: scopeThis.loginData.branch[scopeThis.loginData.app].id_user,
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
    const result = await branchApp.go({scopeThis})
    if(result === 'go'){ // 页面转移
        return
    }

    // 发生新session
    await newSession({scopeThis})

    // 通知父组件，已登录成功
    scopeThis.emit('loggedin', true)
    // 关闭登录窗口
    if(scopeThis.popup.switch){
        scopeThis.popup.visible = false
    }

    // 仅刷新session，不做路由跳转
    if(scopeThis.loginData.sessionOnly){
        return
    }

    // 路由跳转
    if(scopeThis.loginData.route_type && scopeThis.loginData.route){
        ly0request.ly0.navigate({
            code: scopeThis.loginData.route_type,
            path: scopeThis.loginData.route,
            routerInstance: scopeThis.routerInstance
        })
    }
}

export default {
    newSession,
    loggedin,
    password,
    sms,
    email,
    wx,
    ly0,
}