import {WeChat, request} from "@yoooloo42/ihavebacking"
import { ElMessage, ElMessageBox } from 'element-plus'
const ly0request = request.ly0

// 消息监听处理
let messageHdlShell
function messageHdl(scopeThis){
    return function(event){
        // 只接受来自特定源的消息
        console.log(event.origin)

        if(!event.data.appid || !event.data.wx_openid){
            return
        }
        window.removeEventListener('message', messageHdlShell)

        // 登录信息初始化
        scopeThis.loginData = JSON.parse(JSON.stringify(scopeThis.loginDataInit))

        if (event.data.code === 0) {
            // 登录验证
            ly0request.storpro({
                storproName: "ly0d0login.wx.loginWithOpenid",
                data: {
                    appid: event.data.appid,
                    openid: event.data.wx_openid
                },
                noSession: true,
            }).then(result=>{
                if(result.code === 0){
                    // 重置登录信息
                    scopeThis.loginData.id_login = result.id_login
                    scopeThis.loginData.wx_appid = event.data.appid
                    scopeThis.loginData.wx_openid = event.data.wx_openid
                    scopeThis.loginData.wx_nickname = event.data.wx_nickname
                    scopeThis.loginData.wx_headimgurl = event.data.wx_headimgurl
                    scopeThis.loginData.type = "wx"
                    scopeThis.loginPg = "login"
                    ElMessage("微信登录成功")
                }else{
                    ElMessage("微信登录失败")
                    setTimeout(() => { // 验证失败，3秒延时后刷新页面
                        scopeThis.loginPg = "password"
                    }, "3000")
                }
            })
        } else {
            ElMessage("微信登录失败")
            setTimeout(() => { // 验证失败，3秒延时后刷新页面
                scopeThis.loginPg = "password"
            }, "3000")
        }
    }
}

function show(scopeThis){
    // 消息监听处理
    messageHdlShell = messageHdl(scopeThis)

    // 获取appid
    ly0request.storpro({
        storproName: "ly0d0login.wx.getAppid",
        data: null,
        noSession: true,
    }).then(result => {
        let appid = result.code === 0 ? result.objAppid.appid : ""

        // 生成微信二维码图片，监听用户操作
        WeChat.WxLogin({
            elementId: "elIdLoginWxCode",
            redirect_uri: ly0request.domain + "/ly0/wechat-login-redirect",
            appid
        })

        let iframe = document.getElementById("elIdLoginWxCode").childNodes [0]
        // iframe重载侦听
        iframe.addEventListener("load", event=>{
            // 消息侦听：微信用户扫码后，获取iframe发送的微信用户信息
            window.addEventListener('message', messageHdlShell)
        })
    })
}

export default {
    show
}
