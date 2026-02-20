import {request as ly0request} from '@yoooloo42/ly0browser'
function get({scopeThis}){
    return {
        formData: {
            id_login: scopeThis.ly0session.user.id_login,
            name: scopeThis.ly0session.user.name,
            icon: [ly0request.ly0.domain + scopeThis.ly0session.user.icon]
        },
        formProps: {
            popup: {
                switch: true,
                visible: false,
                title: "业务用户"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "text",
                            label: "登录账号id",
                            fieldName: "id_login",
                            style: {
                                width: '250px'
                            }
                        },
                        {
                            inputType: "text",
                            label: "用户名称",
                            fieldName: "name",
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            inputType: "image",
                            label: "图标",
                            fieldName: "icon",
                            style: {
                                width: '120px',
                                height: '120px'
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
