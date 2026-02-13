import {WeChat} from "@yoooloo42/joker"
import { ElMessage } from 'element-plus'
import {request as ly0request} from "@yoooloo42/joker"

// 消息监听处理
let messageHdlShell
function messageHdl(myProps){
    return function(event){
        // 只接受来自特定源的消息
        console.log(event.origin)

        if(!event.data.appid || !event.data.wx_openid){
            return
        }
        window.removeEventListener('message', messageHdlShell)

        if (event.data.code === 0) {
            // 微信绑定
            ly0request.ly0.storpro({
                noSession: true,
                storproName: "ly0d0login.wx.bind",
                data: {
                    id_login: myProps.data.id_login,
                    appid: event.data.appid,
                    wxUser: {
                        openid: event.data.wx_openid,
                        nickname: event.data.wx_nickname,
                        headimgurl: event.data.wx_headimgurl
                    }
                }
            }).then(result=>{
                myProps.popup = false
                if(result.code === 0){
                    ElMessage("微信绑定成功")
                }else{
                    ElMessage("微信绑定失败")
                }
            })
        } else {
            myProps.popup = false
            ElMessage("微信绑定失败")
        }
    }
}

function show(myProps){
    // 消息监听处理
    messageHdlShell = messageHdl(myProps)

    // 获取appid
    ly0request.ly0.storpro({
        noSession: true,
        storproName: "ly0d0login.wx.getAppid",
        data: null
    }).then(result => {
        let appid = result.code === 0 ? result.objAppid.appid : ""

        // 生成微信二维码图片，监听用户操作
        WeChat.WxLogin({
            elementId: "elIdWxBindCode",
            redirect_uri: ly0request.ly0.domain + "/ly0/wechat-login-redirect",
            appid
        })

        let iframe = document.getElementById("elIdWxBindCode").childNodes [0]
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
