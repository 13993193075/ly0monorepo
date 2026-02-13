import {blindboxes} from '@yoooloo42/blindboxes'
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
                        label: "旅店",
                        fieldName: "hotel_name",
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                    },
                    {
                        inputType: 'text',
                        label: '订单手机号',
                        fieldName: 'cellphone',
                    },
                    {
                        inputType: "text",
                        label: "订单状态",
                        fieldName: "status_text",
                    },
                    {
                        inputType: 'expression',
                        label: '入住时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkin);
                        },
                    },
                    {
                        inputType: 'expression',
                        label: '离开时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkout);
                        },
                    },
                    {
                        inputType: 'text',
                        label: '所需客房数',
                        fieldName: 'rooms',
                    },
                    {
                        inputType: 'text',
                        label: '预订类型',
                        fieldName: 'booktype_text',
                    },
                    {
                        inputType: 'expression',
                        label: '预订时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.booktime);
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
                    {
                        inputType: 'text',
                        label: '预订说明',
                        fieldName: 'booknote',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
