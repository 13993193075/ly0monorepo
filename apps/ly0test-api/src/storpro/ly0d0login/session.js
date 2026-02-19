import {GQuery} from '../../main/GQuery.js'
import destroy from './destroy.js'

// 发生新session
function newSession(data) {
    // data.id_login
    // data.type
    // data.number
    // data.cellphone
    // data.email
    // data.wx_appid
    // data.wx_openid
    // data.app
    // data.usertbl
    // data.id_user

    return new Promise(function (resolve, reject) {
        if(!data.id_login){
            return resolve({code: 1, message: "没有账号id"})
        }
        let type = data.type || "number",
            number = data.number || "",
            cellphone = data.cellphone || "",
            email = data.email || "",
            wx_appid = data.wx_appid || "",
            wx_openid = data.wx_openid || "",
            app = data.app || "ly0",
            usertbl = data.usertbl || "ly0d0user",
            id_user = data.id_user || null

        // 微信
        GQuery({
            tblName: "ly0d0wx",
            operator: "findOne",
            query: {
                appid: wx_appid,
                openid: wx_openid
            }
        }).then(result=>{
            let objWx = result.data
            // 用户信息
            GQuery({
                tblName: usertbl,
                operator: "findOne",
                query: {
                    id_login: data.id_login,
                    _id: id_user
                }
            }).then(result => {
                let objUser = result.data
                if (!!id_user && !objUser) {
                    return resolve({code: 1, message: "用户丢失"})
                }

                // 数据单元
                GQuery({
                    tblName: "ly0d0dataunit",
                    operator: "findOne",
                    query: {_id: objUser && objUser.id_dataunit ? objUser.id_dataunit : null}
                }).then(result => {
                    let objDataunit = result.data
                    // 用户组
                    GQuery({
                        tblName: "ly0d0group",
                        operator: "findOne",
                        query: {_id: objUser && objUser.id_group ? objUser.id_group : null}
                    }).then(result => {
                        let objGroup = result.data

                        // 清空旧session
                        GQuery({
                            tblName: "ly0d0session",
                            operator: "deleteMany",
                            query: {id_login: data.id_login}
                        }).then(() => {
                            let thisTime = new Date()
                            let expires = new Date(thisTime.getTime() + (1000 * 60 * 60))
                            // 发生新session
                            GQuery({
                                tblName: "ly0d0session",
                                operator: "insertOne",
                                update: {
                                    id_login: data.id_login,
                                    type,
                                    number,
                                    cellphone,
                                    email,
                                    wx_appid,
                                    wx_openid,
                                    wx_nickname: objWx ? objWx.nickname : "",
                                    wx_headimgurl: objWx ? objWx.headimgurl : "",
                                    expires,
                                    app,
                                    id_dataunit: objUser && objUser.id_dataunit ? objUser.id_dataunit : null,
                                    id_group: objUser && objUser.id_group ? objUser.id_group : null,
                                    usertbl,
                                    id_user,
                                }
                            }).then(result => {
                                let objSession = result.dataNew
                                // 注入系统日志
                                GQuery({
                                    tblName: "ly0d0syslog",
                                    operator: "insertOne",
                                    update: {
                                        id_login: data.id_login,
                                        type,
                                        number,
                                        cellphone,
                                        email,
                                        wx_appid,
                                        wx_openid,
                                        wx_nickname: objWx ? objWx.nickname : "",
                                        wx_headimgurl: objWx ? objWx.headimgurl : "",
                                        time: new Date(),
                                        memo: "发生新session成功",
                                        app,
                                        id_dataunit: objSession.id_dataunit,
                                        id_group: objSession.id_group,
                                        usertbl,
                                        id_user,
                                    }
                                }).then(result => {
                                    destroy.id_login({id_login: data.id_login}).then(result=>{
                                        let objIdLogin = result.data
                                        resolve({code: 0, message: "发生新session成功",
                                            ly0session: {
                                                session: objSession,
                                                login: objIdLogin,
                                                dataunit: objDataunit,
                                                group: objGroup,
                                                user: objUser
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 退出登录
function logout(data) {
    // data.id_login

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d0session",
            operator: "findOne",
            query: {id_login: data.id_login}
        }).then(result => {
            let objSession = result.data
            if (!objSession) {
                return resolve({code: 0, message: "已退出"})
            }

            // 删除session
            GQuery({
                tblName: "ly0d0session",
                operator: "deleteMany",
                query: {id_login: data.id_login}
            }).then(() => {
                // 注入系统日志
                GQuery({
                    tblName: "ly0d0syslog",
                    operator: "insertOne",
                    update: {
                        id_login: objSession.id_login,
                        type: objSession.type,
                        number: objSession.number,
                        cellphone: objSession.cellphone,
                        email: objSession.email,
                        wx_appid: objSession.wx_appid,
                        wx_openid: objSession.wx_openid,
                        time: new Date(),
                        memo: "退出登录",
                        app: objSession.app,
                        id_dataunit: objSession.id_dataunit,
                        id_group: objSession.id_group,
                        usertbl: objSession.usertbl,
                        id_user: objSession.id_user
                    }
                }).then(() => {
                    resolve({code: 0, message: "退出登录"})
                })
            })
        })
    })
}

export default {
    newSession,
    logout
}