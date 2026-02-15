import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "查询"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "input",
                        label: "登录账号id",
                        fieldName: "id_login",
                        style: 'width: 300px;'
                    },
                    {
                        inputType: "input",
                        label: "工号",
                        fieldName: "number",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "手机号",
                        fieldName: "cellphone",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "email",
                        fieldName: "email",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "微信appid",
                        fieldName: "wx_appid",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "微信openid",
                        fieldName: "wx_openid",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "登录类型",
                        fieldName: "type",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "input",
                        label: "数据单元id",
                        fieldName: "id_dataunit",
                        style: 'width: 300px;',
                    },
                    {
                        inputType: "input",
                        label: "用户组id",
                        fieldName: "id_group",
                        style: 'width: 300px;',
                    },
                    {
                        inputType: "input",
                        label: "用户id",
                        fieldName: "id_user",
                        style: 'width: 300px;',
                    },
                    {
                        inputType: "input",
                        label: "用户表名",
                        fieldName: "user_tbl",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "date-picker",
                        label: "时间 起",
                        fieldName: "time_start",
                        style: 'width: 200px;'
                    },
                    {
                        inputType: "date-picker",
                        label: "止",
                        fieldName: "time_end",
                        style: 'width: 200px;'
                    },
                    {
                        label: "备忘",
                        inputType: "input",
                        fieldName: "memo",
                        style: 'width: 400px;'
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
