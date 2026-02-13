export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "详细"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'text',
                        label: '应用ID',
                        fieldName: 'appid',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'text',
                        label: '应用密钥',
                        fieldName: 'secret',
                        style: {width: '400px'}
                    },
                    {
                        inputType: 'text',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'expression',
                        label: '用于本站微信登录',
                        hdlExpression({formData}) {
                            return formData.with_thiswebsite_login === true || formData.with_thiswebsite_login === 'true'
                                ? '是' : '否'
                        },
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'expression',
                        label: '用于系统年费',
                        hdlExpression({formData}) {
                            return formData.with_annual === true || formData.with_annual === 'true'
                                ? '是' : '否'
                        },
                        style: {width: '100px'},
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
