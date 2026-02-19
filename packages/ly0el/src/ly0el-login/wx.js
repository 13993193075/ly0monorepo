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

// 延时执行函数（毫秒级）
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function messageHdl({scopeThis}){
    return async function(event){
        console.log(event.origin)
        // 安全校验：只接受来自特定源的消息
        // 假设消息来自你自己的域名或微信特定的 redirect_uri 所在域
        if (!event.origin.includes(ly0request.ly0.domain.split('//')[1])) return;

        const { appid, wx_openid, code, wx_nickname, wx_headimgurl } = event.data || {};
        if (!appid || !wx_openid) return;

        // 收到有效数据后立即清理，防止重复触发
        cleanup();

        try{
            if (code !== 0) throw new Error("微信授权失败");

            // 登录账号验证
            const result = await ly0request.ly0.storpro({
                storproName: "ly0d0login.wx.loginWithOpenid",
                data: {
                    appid,
                    openid: wx_openid
                },
                noSession: true,
            })
            if(result.code === 0){
                ElMessage('登录账号验证成功')
                Object.assign(scopeThis.loginData, {
                    type: "wx",
                    id_login: result.id_login,
                    wx_appid: appid,
                    wx_openid,
                    wx_nickname,
                    wx_headimgurl
                });
                await sleep(3000);
                await scopeThis.handlers.loggedin({scopeThis})
            }else{
                ElMessage('登录账号验证失败')
                await sleep(3000);
                scopeThis.showPg = "Password";
            }
        }catch(err){
            ElMessage('登录账号验证失败')
            await sleep(3000);
            scopeThis.showPg = "Password";
        }
    }
}

async function show({scopeThis}){
    // 每次进入前先清理旧的监听
    cleanup();

    // 消息监听处理
    messageHdlShell = await (messageHdl({scopeThis}))

    // 获取appid
    const result = await ly0request.ly0.storpro({
        storproName: "ly0d0login.wx.getAppid",
        data: null,
        noSession: true,
    })
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
}

export default {
    show
}
