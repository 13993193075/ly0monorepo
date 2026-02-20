import wxShow from "./wx-show.js"
function get ({scopeThis}){
    return {
        data: {
            id_login: scopeThis.ly0session.session.id_login
        },
        popup: false,
        wxShow
    }
}
export default {
    get
}
