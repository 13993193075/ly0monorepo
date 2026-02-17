import {request as ly0request} from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0.ly0sessionLoad()
let objWx = null
if(ly0session.session.type === "wx"){
    objWx = ly0session.login.arrWx.find(i=>{
        return i.appid === ly0session.session.wx_appid && i.openid === ly0session.session.wx_openid
    })
}

export default {
    formData: {
        id_login: ly0session.session.id_login,
        number: ly0session.session.number,
        cellphone: ly0session.session.cellphone,
        email: ly0session.session.email,
        wx_nickname: objWx ? objWx.nickname : "",
        wx_headimgurl: objWx ? objWx.headimgurl : "",
        type: ly0session.session.type,
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
