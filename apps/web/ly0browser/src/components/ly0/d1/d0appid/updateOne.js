import {ly0withTable as withTable} from '@yoooloo42/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '应用ID',
                        fieldName: 'appid',
                        style: 'width: 200px',
                    },
                    {
                        inputType: 'input',
                        label: '应用密钥',
                        fieldName: 'secret',
                        style: 'width: 400px',
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: 'width: 400px',
                    },
                    {
                        inputType: "switch",
                        label: "用于本站微信登录",
                        fieldName: "with_thiswebsite_login",
                        activeText: "是",
                        inactiveText: "否",
                        activeValue: true,
                        inactiveValue: false,
                        activeColor: "#ee7405",
                    },
                    {
                        inputType: "switch",
                        label: "用于系统年费",
                        fieldName: "with_annual",
                        activeText: "是",
                        inactiveText: "否",
                        activeValue: true,
                        inactiveValue: false,
                        activeColor: "#ee7405",
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
