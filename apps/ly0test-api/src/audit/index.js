import {exec as storproExec} from "../storpro/index.js"
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {GQuery} from '../main/GQuery.js'

// 内部模块：清除session
async function clearSession(ly0session){
    if(!ly0session || !ly0session.session || !ly0session.session.id_login){
        return
    }
    await storproExec({
        storproName: "ly0d0login.session.logout",
        data: {
            id_login: ly0session.session.id_login
        }
    })
}

// 安全审计
async function audit(request, response){
    console.log("[系统跟踪]当前请求的 url：", request.originalUrl)

    if(!!request.body.noSession &&
        (request.body.noSession === true || request.body.noSession === "true")
    ){
        return {session: {code: 0, message: "不验证session"}}
    }

    if (!request.body.ly0session ||
        !request.body.ly0session.session ||
        !request.body.ly0session.session._id ||
        !request.body.ly0session.session.id_login
    ){
        return {session: {code: 1, message: "未登录"}}
    }

    // 获取session
    const result = await GQuery({
        tblName: "ly0d0session",
        operator: "findOne",
        query: {_id: request.body.ly0session.session._id}
    })
    const objSession = result.data,
        thisTime = new Date ()

    if (!objSession){
        await clearSession(request.body.ly0session)
        return {session: {code: 1, message: "非法登录"}}
    }

    if (thisTime.getTime() > new Date(objSession.expires).getTime()){
        await clearSession(request.body.ly0session)
        return {session: {code: 1, message: "超时"}}
    }

    // session延期1小时
    await GQuery({
        tblName: "ly0d0session",
        operator: "updateOne",
        query: {_id: request.body.ly0session.session._id},
        update: {expires: new Date((thisTime - 0) + (1000 * 60 * 60))}
    })
    console.log('session延期1小时', ly0utils.dateFormat.dateFormat(thisTime));

    return {session: {code: 0, message: "安全审计通过"}}
}

export {
    audit
}
export default {
    audit
}
