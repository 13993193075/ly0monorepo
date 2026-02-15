// appid - 微信应用id
// secret - 微信应用密钥
// access_token - 微信接口调用凭据（一些微信接口的调用需要使用）
// 一个微信用户针对一个appid会对应一个唯一且不变的openid
// 用户扫码授权后，微信后台发送临时票据code
// 小程序前端提供appid以及临时票据js_code

import {WeChat} from '@yoooloo42/ly0nodejs'
import {GQuery} from '../../main/GQuery.js'
import ly0d1d0appid from '../ly0d1/d0appid.js'

// 获取用于本站微信登录的appid凭据信息
function getAppid (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        ly0d1d0appid.getAppidWithThiswebsiteLogin().then(result => {
            resolve(result)
        })
    })
}

// 通过appid和code获取access_token和openid
function getOpenidWithCode (data) {
    // data.appid
    // data.code

    return new Promise(function (resolve, reject) {
       ly0d1d0appid.getAppidMore({appid: data.appid}).then(function (result) {
            if (result.code !== 0) {
                return resolve(result)
            }
            let objAppid = result.objAppid
            WeChat.Token.getWebOAuth2Token({
                code: data.code,
                appid: data.appid,
                secret: objAppid.secret
            }).then(result => {
                // result.data.openid
                // result.data.access_token
                resolve(result)
            })
        })
    })
}

// 通过access_token和openid获取微信用户信息
function getUserinfo (data) {
    // data.access_token
    // data.openid

    return new Promise(function (resolve, reject) {
        WeChat.Token.getUserinfo({
            access_token: data.access_token,
            openid: data.openid
        }).then(result => {
            // result.data.openid
            // result.data.nickname
            // result.data.sex
            // result.data.language
            // result.data.city
            // result.data.province
            // result.data.country
            // result.data.headimgurl
            // result.data.privilege
            // result.data.unionid
            resolve(result)
        })
    })
}

// 通过appid和code获取微信用户信息
function getUserinfoWithCode (data) {
    // data.appid
    // data.code

    return new Promise(function (resolve, reject) {
        getOpenidWithCode({
            code: data.code,
            appid: data.appid
        }).then(function (result) {
            if (result.code !== 0) {
                return resolve(result)
            }
            getUserinfo({
                access_token: result.data.access_token,
                openid: result.data.openid
            }).then(result => {
                if (result.code !== 0) {
                    return resolve({code: 1, message: '获取微信用户信息失败'})
                }

                resolve({code: 0, message: '获取微信用户信息成功',
                    data: result.data
                })
            })
        })
    })
}

// 登录 - 使用openid
function loginWithOpenid (data) {
    // data.appid
    // data.openid

    return new Promise(function (resolve, reject) {
        // 获取微信注册信息
        GQuery({
            tblName: 'ly0d0wx',
            operator: 'findOne',
            query: {
                appid: data.appid,
                openid: data.openid
            }
        }).then(result => {
            let objWx = result.data
            if (!objWx) {
                return resolve({code: 1, message: '微信注册信息不存在，登录失败'})
            }
            resolve({code: 0, message: "微信登录成功",
                id_login: objWx.id_login
            })
        })
    })
}

// 登录 - 使用临时票据code
function loginWithCode (data) {
    // data.appid
    // data.code

    return new Promise(function (resolve, reject) {
        // 获取openid
        getOpenidWithCode({
            appid: data.appid,
            code: data.code
        }).then(function (result) {
            if (result.code !== 0) {
                return resolve({code: 1, message: '临时票据code过期或非法'})
            }
            let openid = result.data.openid

            loginWithOpenid({
                appid: data.appid,
                openid
            }).then(result=>{
                resolve(result)
            })
        })
    })
}

// 微信绑定
function bind (data) {
    // data.id_login
    // data.appid
    // data.wxUser.openid
    // data.wxUser.nickname
    // data.wxUser.headimgurl

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d0wx',
            operator: 'deleteMany',
            query: {
                $and: [
                    {appid: data.appid},
                    {openid: data.wxUser.openid}
                ]
            }
        }).then(() => {
            GQuery({
                tblName: 'ly0d0wx',
                operator: 'insertOne',
                update: {
                    id_login: data.id_login,
                    appid: data.appid,
                    openid: data.wxUser.openid,
                    nickname: data.wxUser.nickname,
                    headimgurl: data.wxUser.headimgurl
                }
            }).then(() => {
                resolve({code: 0, message: '绑定微信成功'})
            })
        })
    })
}

// 网页用户扫码后，微信后台向ly0指定的接口路径（"/ly0/test/forward/wx-user"）发送临时票据code，启动登录或绑定流程，
// 这里获取到临时票据code后，向前端页面发送微信用户信息
function sendWxUserinfoWithCode (data) {
    // data.code

    return new Promise(function (resolve, reject) {
        getAppid(null).then(result => {
            if (result.code !== 0) {
                // 向前端页面发送消息
                let pg = '微信验证失败 ...'
                    + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
                return resolve(pg)
            }

            getUserinfoWithCode({
                appid: result.objAppid.appid,
                code: data.code
            }).then(result => {
                if (result.code !== 0) {
                    // 向前端页面发送消息
                    let pg = '微信验证失败 ...'
                        + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
                    return resolve(pg)
                }

                // 向前端页面发送消息
                let pg = '微信验证成功 ...'
                    + '<script>window.parent.postMessage(\'' + JSON.stringify(result) + '\',\'*\')</script>'
                resolve(pg)
            })
        })
    })
}

// 获取微信小程序码(mini program code)
function getMpc (data) {
    // data.appid 小程序的应用id
    // data.secret 小程序的应用密钥
    // data.scene 小程序码中可以附加的内容

    return new Promise(function (resolve, reject) {
        WeChat.MPC.getMiniProgramCode({
            appid: data.appid,
            secret: data.secret,
            scene: data.scene
        }).then(result => {
            resolve(result)
        })
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