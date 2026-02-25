import {utils as ly0utils} from '@yoooloo42/ly0utils'
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
                        label: '订单id',
                        fieldName: '_id',
                    },
                    {
                        inputType: "text",
                        label: "商店",
                        fieldName: "shop_name",
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrShop.length > 1 // 只有一个商店时不显示
                        },
                    },
                    {
                        inputType: "text",
                        label: "订单状态",
                        fieldName: "status_text",
                    },
                    {
                        inputType: 'expression',
                        label: '交易时间',
                        hdlExpression({scopeThis, formData}) {
                            return ly0utils.dateFormat.dateFormat(formData.time);
                        },
                    },
                    {
                        inputType: 'text',
                        label: '客户手机号',
                        fieldName: 'client_cellphone',
                    },
                    {
                        inputType: 'text',
                        label: '客户名称',
                        fieldName: 'client_name',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
