import {exec as storproExec} from '../storpro/index.js'
function WechatLoginRedirect (request, response) {
    // request.query.code

    storproExec({
        storproName: 'ly0d0login.wx.getAppid',
        data: null
    }).then(result => {
        let appid = result.objAppid.appid
        storproExec({
            storproName: 'ly0d0login.wx.getUserinfoWithCode',
            data: {
                appid,
                code: request.query.code
            }
        }).then(result => {
            if(result.code !== 0){
                // 获取微信用户信息失败
                response.redirect('/ly0/foreend/iframe/wx-login.html?code=1')
            }else{
                // 获取微信用户信息成功
                let wxUser = result.data
                response.redirect(
                    '/ly0/foreend/iframe/wx-login.html?code=0&appid=' + appid +
                    '&wx_openid=' + wxUser.openid +
                    '&wx_nickname=' + wxUser.nickname +
                    '&wx_headimgurl=' + wxUser.headimgurl
                )
            }
        })
    })
}

export default {
    WechatLoginRedirect
}
