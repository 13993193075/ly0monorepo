import {exec as storproExec} from "../storpro/index.js"
import {unclassified as blindBoxesUnclass} from '@yoooloo42/blindboxes'
import {DB_Bridge} from '@yoooloo42/ihavebacking'
const GQuery = DB_Bridge.MongoDB_GQuery.GQuery

// 内部模块：清除session
function clearSession(ly0session){
    return new Promise(function(resolve, reject){
        if(!ly0session || !ly0session.session || !ly0session.session.id_login){
            return resolve()
        }
        storproExec({
            storproName: "ly0d0login.session.logout",
            data: {
                id_login: ly0session.session.id_login
            }
        }).then(() => {
            resolve()
        })
    })
}

// 安全审计
function audit(request, response){
    return new Promise(function(resolve, reject){
        console.log("[系统跟踪]当前请求的 url：", request.originalUrl)

        if(!!request.body.noSession && (request.body.noSession === true || request.body.noSession === "true")){
            return resolve({
                session: {
                    code: 0,
                    message: "不验证session"
                }
            })
        }

        if (
            !request.body.ly0session ||
            !request.body.ly0session.session ||
            !request.body.ly0session.session._id ||
            !request.body.ly0session.session.id_login
        ){
            return resolve({
                session: {
                    code: 1,
                    message: "未登录"
                }
            })
        }
        GQuery({
            tblName: "ly0d0session",
            operator: "findOne",
            query: {_id: request.body.ly0session.session._id}
        }).then(result => {
            let objSession = result.data,
                thisTime = new Date ()
            if (!objSession){
                clearSession(request.body.ly0session).then(() => {
                    resolve({
                        session: {
                            code: 1,
                            message: "非法登录"
                        }
                    })
                })
                return
            }
            if (thisTime.getTime() > new Date(objSession.expires).getTime()){
                clearSession(request.body.ly0session.user).then(() => {
                    resolve({
                        session: {
                            code: 1,
                            message: "超时"
                        }
                    })
                })
                return
            }

            // session延期1小时
            GQuery({
                tblName: "ly0d0session",
                operator: "updateOne",
                query: {_id: request.body.ly0session.session._id},
                update: {expires: new Date((thisTime - 0) + (1000 * 60 * 60))}
            }).then(result => {
                console.log('session延期1小时', blindBoxesUnclass.dateFormat.dateFormat(thisTime));
                resolve({
                    session: {code: 0, message: "安全审计通过"}
                })
            })
        })
    })
}

export {
    audit
}
export default {
    audit
}
