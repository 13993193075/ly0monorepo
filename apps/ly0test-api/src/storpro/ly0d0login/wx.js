// appid - 微信应用id
// secret - 微信应用密钥
// access_token - 微信接口调用凭据（一些微信接口的调用需要使用）
// 一个微信用户针对一个appid会对应一个唯一且不变的openid
// 用户扫码授权后，微信后台发送临时票据code
// 小程序前端提供appid以及临时票据js_code

// 获取用于本站微信登录的appid凭据信息
async function getAppid ({data, dependencies, storproRun}) {
    // data: null

    return await storproRun({
        storproName: 'ly0d1.d0appid.getAppidWithThiswebsiteLogin',
        data: null
    })
}

// 通过appid和code获取access_token和openid
async function getOpenidWithCode ({data, dependencies, storproRun}) {
    // data.appid
    // data.code

    let result = await storproRun({
        storproName: 'ly0d1.d0appid.getAppidMore',
        data: {appid: data.appid}
    })
    if (result.code !== 0) {
        return result
    }
    const objAppid = result.objAppid
    result = await dependencies.ly0nodejs.WeChat.Token.getWebOAuth2Token({
        code: data.code,
        appid: data.appid,
        secret: objAppid.secret
    })
    // result.data.openid
    // result.data.access_token
    return result
}

// 通过access_token和openid获取微信用户信息
async function getUserinfo ({data, dependencies}) {
    // data.access_token
    // data.openid

    return await dependencies.ly0nodejs.WeChat.Token.getUserinfo({
        access_token: data.access_token,
        openid: data.openid
    })
}

// 通过appid和code获取微信用户信息
async function getUserinfoWithCode ({data, dependencies}) {
    // data.appid
    // data.code

    let result = await getOpenidWithCode({
        code: data.code,
        appid: data.appid
    })
    if (result.code !== 0) {
        return result
    }
    result = await getUserinfo({
        access_token: result.data.access_token,
        openid: result.data.openid
    })
    if (result.code !== 0) {
        return {code: 1, message: '获取微信用户信息失败'}
    }

    return {code: 0, message: '获取微信用户信息成功',
        data: result.data
    }
}

// 登录 - 使用openid
async function loginWithOpenid ({data, dependencies}) {
    // data.appid
    // data.openid

    // 获取微信注册信息
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0wx',
        operator: 'findOne',
        query: {
            appid: data.appid,
            openid: data.openid
        }
    })
    const objWx = result.data
    if (!objWx) {
        return {code: 1, message: '微信注册信息不存在，登录失败'}
    }
    return {code: 0, message: "微信登录成功",
        id_login: objWx.id_login
    }
}

// 登录 - 使用临时票据code
async function loginWithCode ({data, dependencies}) {
    // data.appid
    // data.code

    // 获取openid
    let result = await getOpenidWithCode({
        appid: data.appid,
        code: data.code
    })
    if (result.code !== 0) {
        return {code: 1, message: '临时票据code过期或非法'}
    }
    const openid = result.data.openid

    return await loginWithOpenid({
        appid: data.appid,
        openid
    })
}

// 微信绑定
async function bind ({data, dependencies}) {
    // data.id_login
    // data.appid
    // data.wxUser.openid
    // data.wxUser.nickname
    // data.wxUser.headimgurl

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0wx',
        operator: 'deleteMany',
        query: {
            $and: [
                {appid: data.appid},
                {openid: data.wxUser.openid}
            ]
        }
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0wx',
        operator: 'insertOne',
        update: {
            id_login: data.id_login,
            appid: data.appid,
            openid: data.wxUser.openid,
            nickname: data.wxUser.nickname,
            headimgurl: data.wxUser.headimgurl
        }
    })
    return {code: 0, message: '绑定微信成功'}
}

// 网页用户扫码后，微信后台向ly0指定的接口路径（"/ly0/test/forward/wx-user"）发送临时票据code，启动登录或绑定流程，
// 这里获取到临时票据code后，向前端页面发送微信用户信息
async function sendWxUserinfoWithCode ({data, dependencies}) {
    // data.code

    let result = await getAppid(null)
    if (result.code !== 0) {
        // 向前端页面发送消息
        let pg = '微信验证失败 ...'
            + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
        return pg
    }

    result = getUserinfoWithCode({
        appid: result.objAppid.appid,
        code: data.code
    })
    if (result.code !== 0) {
        // 向前端页面发送消息
        let pg = '微信验证失败 ...'
            + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
        return pg
    }

    // 向前端页面发送消息
    return '微信验证成功 ...'
        + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
}

// 获取微信小程序码(mini program code)
async function getMpc ({data, dependencies}) {
    // data.appid 小程序的应用id
    // data.secret 小程序的应用密钥
    // data.scene 小程序码中可以附加的内容

    return await dependencies.ly0nodejs.WeChat.MPC.getMiniProgramCode({
        appid: data.appid,
        secret: data.secret,
        scene: data.scene
    })
}

export default {
    getAppid,
    getOpenidWithCode,
    getUserinfo,
    getUserinfoWithCode,
    loginWithOpenid,
    loginWithCode,
    bind,
    sendWxUserinfoWithCode,
    getMpc
}