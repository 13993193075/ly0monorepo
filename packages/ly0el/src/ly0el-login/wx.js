import {WeChat} from "@yoooloo42/ly0browser"
import { ElMessage, ElMessageBox } from 'element-plus'
import { request as ly0request } from '@yoooloo42/ly0browser'

// 消息监听处理
let messageHdlShell = null

/**
 * 清理函数：统一处理监听器的移除
 */
const cleanup = () => {
    if (messageHdlShell) {
        window.removeEventListener('message', messageHdlShell);
        messageHdlShell = null;
    }
};

function messageHdl({scopeThis}){
    return function(event){
        console.log(event.origin)
        // 安全校验：只接受来自特定源的消息
        // 假设消息来自你自己的域名或微信特定的 redirect_uri 所在域
        if (!event.origin.includes(ly0request.ly0.domain.split('//')[1])) return;

        const { appid, wx_openid, code } = event.data || {};
        if (!appid || !wx_openid) return;

        // 收到有效数据后立即清理，防止重复触发
        cleanup();

        if (code === 0) {
            // 登录验证
            ly0request.ly0.storpro({
                storproName: "ly0d0login.wx.loginWithOpenid",
                data: {
                    appid,
                    openid: wx_openid
                },
                noSession: true,
            }).then(result=>{
                ElMessage(result.message)

                if(result.code === 0){
                    Object.assign(scopeThis.loginData, {
                        type: "wx",
                        id_login: result.id_login,
                        wx_appid: appid,
                        wx_openid: wx_openid,
                        wx_nickname: event.data.wx_nickname,
                        wx_headimgurl: event.data.wx_headimgurl
                    });

                    if(scopeThis.app === 'ly0'){
                        // 应用入口：ly0，选择用户组
                        scopeThis.showPg = "Group"
                        return
                    }
                    ElMessage('没有预置应用入口')
                }else{
                    setTimeout(() => { // 验证失败，3秒延时后刷新页面
                        scopeThis.showPg = "password"
                    }, 3000)
                }
            }).catch(err=>{
                ElMessage("微信登录失败")
                setTimeout(() => { // 验证失败，3秒延时后刷新页面
                    scopeThis.showPg = "password"
                }, 3000)
            })
        } else {
            ElMessage("微信登录失败")
            setTimeout(() => { // 验证失败，3秒延时后刷新页面
                scopeThis.showPg = "password"
            }, 3000)
        }
    }
}

function show({scopeThis}){
    // 每次进入前先清理旧的监听
    cleanup();

    // 消息监听处理
    messageHdlShell = messageHdl({scopeThis})

    // 获取appid
    ly0request.ly0.storpro({
        storproName: "ly0d0login.wx.getAppid",
        data: null,
        noSession: true,
    }).then(result => {
        if (result.code !== 0) {
            ElMessage.error("获取AppID失败");
            return;
        }
        const appid = result.objAppid.appid

        // 生成微信二维码图片，监听用户操作
        WeChat.WxLogin({
            elementId: "elIdLoginWxCode",
            redirect_uri: ly0request.ly0.domain + "/ly0/wechat-login-redirect",
            appid
        })

        const iframe = document.getElementById("elIdLoginWxCode").getElementsByTagName("iframe")[0]
        if(iframe){
            // iframe重载侦听
            iframe.addEventListener(
                "load",
                ()=>{
                    // 消息侦听：微信用户扫码后，获取iframe发送的微信用户信息
                    window.addEventListener('message', messageHdlShell)
                },
                { once: true } // 使用 { once: true } 确保 load 事件只触发一次
            )
        }

    })
}

export default {
    show
}
