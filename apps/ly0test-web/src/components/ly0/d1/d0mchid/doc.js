export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "详细",
            width: '1000px'
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'text',
                        label: '商户号',
                        fieldName: 'mchid',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'text',
                        label: 'V2接口密钥',
                        fieldName: 'v2apikey',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'text',
                        label: 'V3接口密钥',
                        fieldName: 'v3apikey',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'text',
                        label: '证书序列号',
                        fieldName: 'serial_no',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'text',
                        label: '证书私钥',
                        fieldName: 'private_key',
                        style: {width: '600px'},
                    },
                    {
                        label: '备注',
                        inputType: 'text',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                    {
                        label: '用于系统年费',
                        inputType: 'expression',
                        hdlExpression({formData, scopeThis}) {
                            return formData.with_annual === true || formData.with_annual === 'true' ? '是' : '否'
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
