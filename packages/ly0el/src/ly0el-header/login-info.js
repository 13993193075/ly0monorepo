function get({scopeThis}){
    return {
        id_login: scopeThis.ly0session.session.id_login,
        readonly: false,
        destroy: false,
        popup: {
            switch: true,
            visible: false
        },
    }
}
export default {
    get
}
