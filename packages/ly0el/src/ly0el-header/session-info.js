function get({scopeThis}){
    let objWx = null
    if(scopeThis.ly0session.session.type === "wx"){
        objWx = scopeThis.ly0session.login.arrWx.find(i=>{
            return i.appid === scopeThis.ly0session.session.wx_appid && i.openid === scopeThis.ly0session.session.wx_openid
        })
    }
    return {
        formData: {
            id_login: scopeThis.ly0session.session.id_login,
            number: scopeThis.ly0session.session.number,
            cellphone: scopeThis.ly0session.session.cellphone,
            email: scopeThis.ly0session.session.email,
            wx_nickname: objWx ? objWx.nickname : "",
            wx_headimgurl: objWx ? objWx.headimgurl : "",
            type: scopeThis.ly0session.session.type,
        },
        formProps: {
            popup: {
                switch: true,
                visible: false,
                title: "当前登录"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "text",
                            label: "账号id",
                            fieldName: "id_login",
                            style: {
                                width: "300px"
                            }
                        },
                        {
                            inputType: "text",
                            label: "工号",
                            fieldName: "number",
                            hdlVisible({formData}){
                                return !!formData.number
                            },
                            style: {
                                width: "200px"
                            }
                        },
                        {
                            inputType: "text",
                            label: "手机号",
                            fieldName: "cellphone",
                            hdlVisible({formData}){
                                return !!formData.cellphone
                            },
                            style: {
                                width: "200px"
                            }
                        },
                        {
                            inputType: "text",
                            label: "email",
                            fieldName: "email",
                            hdlVisible({formData}){
                                return !!formData.email
                            },
                            style: {
                                width: "300px"
                            }
                        },
                        {
                            inputType: "text",
                            label: "微信昵称",
                            fieldName: "wx_nickname",
                            hdlVisible({formData}){
                                return !!formData.wx_nickname
                            },
                            style: {
                                width: "200px"
                            }
                        },
                        {
                            inputType: "image",
                            label: "微信头像",
                            fieldName: "wx_headimgurl",
                            hdlVisible({formData}){
                                return !!formData.wx_headimgurl
                            },
                            style: {
                                width: "120px",
                                height: "120px",
                            }
                        }
                    ]
                }
            ],
            submit: {
                switch: false
            }
        }
    }
}
export default {
    get
}
