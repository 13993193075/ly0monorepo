import {ly0withTable as withTable} from 'packages/ly0el'
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
                        label: '商户号',
                        fieldName: 'mchid',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: 'V2接口密钥',
                        fieldName: 'v2apikey',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'input',
                        label: 'V3接口密钥',
                        fieldName: 'v3apikey',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'input',
                        label: '证书序列号',
                        fieldName: 'serial_no',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '证书私钥 - 文件上传',
                                items: [
                                    {
                                        inputType: 'upload',
                                        fieldName: 'private_key_url',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'select',
                        label: '用于系统年费',
                        fieldName: 'with_annual',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        items: [
                            { code: true, text: '是' },
                            { code: false, text: '否' },
                        ],
                        style: {width: '200px'},
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
