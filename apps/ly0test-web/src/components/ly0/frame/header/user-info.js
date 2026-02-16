import {request as ly0request} from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0request.ly0sessionLoad()

export default {
    formData: {
        id_login: ly0session.user.id_login,
        name: ly0session.user.name,
        icon: [ly0request.ly0request.domain + ly0session.user.icon]
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
