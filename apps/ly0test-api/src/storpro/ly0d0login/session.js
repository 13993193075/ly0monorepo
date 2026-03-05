// 发生新session
async function newSession({data, dependencies, storproRun}) {
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

    if(!data.id_login){
        return {code: 1, message: "没有账号id"}
    }
    const type = data.type || "number",
        number = data.number || "",
        cellphone = data.cellphone || "",
        email = data.email || "",
        wx_appid = data.wx_appid || "",
        wx_openid = data.wx_openid || "",
        app = data.app || "ly0",
        usertbl = data.usertbl || "ly0d0user",
        id_user = data.id_user || null

    // 微信
    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0wx",
        operator: "findOne",
        query: {
            appid: wx_appid,
            openid: wx_openid
        }
    })
    const objWx = result.data
    // 用户信息
    result = await dependencies.GQuery.GQuery({
        tblName: usertbl,
        operator: "findOne",
        query: {
            id_login: data.id_login,
            _id: id_user
        }
    })
    const objUser = result.data
    if (!!id_user && !objUser) {
        return {code: 1, message: "用户丢失"}
    }

    // 数据单元
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {_id: objUser && objUser.id_dataunit ? objUser.id_dataunit : null}
    })
    const objDataunit = result.data
    // 用户组
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0group",
        operator: "findOne",
        query: {_id: objUser && objUser.id_group ? objUser.id_group : null}
    })
    const objGroup = result.data

    // 清空旧session
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0session",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    const thisTime = new Date()
    const expires = new Date(thisTime.getTime() + (1000 * 60 * 60))
    // 发生新session
    result = await dependencies.GQuery.GQuery({
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
    })
    const objSession = result.dataNew
    // 注入系统日志
    await dependencies.GQuery.GQuery({
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
    })
    result = await storproRun({
        storproName: 'ly0d0login.destroy.id_login',
        data: {id_login: data.id_login}
    })
    const objIdLogin = result.data
    return {code: 0, message: "发生新session成功",
        ly0session: {
            session: objSession,
            login: objIdLogin,
            dataunit: objDataunit,
            group: objGroup,
            user: objUser
        }
    }
}

// 退出登录
async function logout({data, dependencies}) {
    // data.id_login

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0session",
        operator: "findOne",
        query: {id_login: data.id_login}
    })
    const objSession = result.data
    if (!objSession) {
        return {code: 0, message: "已退出"}
    }

    // 删除session
    await dependencies.GQuery.GQuery({
        tblName: "ly0d0session",
        operator: "deleteMany",
        query: {id_login: data.id_login}
    })
    // 注入系统日志
    await dependencies.GQuery.GQuery({
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
    })
    return {code: 0, message: "退出登录"}
}

export default {
    newSession,
    logout
}