export default {
    popup: {
        switch: true,
        visible: false,
        title: '收银',
        width: '800px'
    },
    cols: [
        {
            items: [
                {
                    inputType: 'input',
                    label: '金额',
                    fieldName: 'amount',
                    style: {width: '100px'},
                },
                {
                    inputType: 'select',
                    label: '系统内置支付流程',
                    fieldName: 'process_code',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    hdlGetItems({scopeThis, formData}) {
                        return scopeThis.pgData.arrProcess
                    },
                    style: {width: '200px'},
                },
                {
                    inputType: 'input',
                    label: '付款码',
                    fieldName: 'wx_micropay_code',
                    hdlVisible({scopeThis, formData}) {
                        return formData.process_code === 'wxzf0'
                    },
                    style: {width: '200px'},
                },
                {
                    inputType: 'select',
                    label: '用户自主支付方式',
                    fieldName: 'method_code',
                    item_fieldLabel: 'text',
                    item_fieldValue: 'code',
                    hdlGetItems({scopeThis, formData}) {
                        return scopeThis.pgData.arrMethod
                    },
                    hdlVisible({scopeThis, formData}) {
                        return formData.process_code === '0'
                    },
                    style: {width: '200px'},
                },
                {
                    inputType: 'input',
                    label: '备注',
                    fieldName: 'note',
                    style: {width: '400px'},
                },
            ],
        },
    ],
    submit: {
        async handle({scopeThis}){
            await scopeThis.handles.submit({scopeThis})
        },
        submitted: false // 提交监听，用于支付记录的刷新
    }
}
