// <script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
function fun(){
    !function(e,t){e.WxLogin=function(e){var r="default";!0===e.self_redirect?r="true":!1===e.self_redirect&&(r="false");var i=t.createElement("iframe"),n="https://open.weixin.qq.com/connect/qrconnect?appid="+e.appid+"&scope="+e.scope+"&redirect_uri="+e.redirect_uri+"&state="+e.state+"&login_type=jssdk&self_redirect="+r+"&styletype="+(e.styletype||"")+"&sizetype="+(e.sizetype||"")+"&bgcolor="+(e.bgcolor||"")+"&rst="+(e.rst||"");n+=e.style?"&style="+e.style:"",n+=e.href?"&href="+e.href:"",n+="en"===e.lang?"&lang=en":"",n+=1===e.stylelite?"&stylelite=1":"",n+=0===e.fast_login?"&fast_login=0":"",i.src=n,i.frameBorder="0",i.allowTransparency="true",i.scrolling="no",i.width="300px",i.height="400px";var l=t.getElementById(e.id);l.innerHTML="",l.appendChild(i)}}(window,document);
}

function run(para){
    // para.elementId
    // para.redirect_uri
    // para.appid

    // 生成二维码图片
    fun()
    new WxLogin({
        self_redirect: true,
        id: para.elementId,
        appid: para.appid,
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(para.redirect_uri),
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30="
    })
}

export default {
    WxLogin: run
}