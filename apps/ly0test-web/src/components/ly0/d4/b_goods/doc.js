import {blindboxes} from 'packages/ly0utils/src/index.js'
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
                        inputType: 'text0',
                        label: '客房分区',
                        fieldName: 'roomplace_text',
                    },
                    {
                        inputType: 'text0',
                        label: '房型',
                        fieldName: 'goods_name',
                    },
                    {
                        inputType: 'text0',
                        label: '房号',
                        fieldName: 'roomno',
                    },
                    {
                        inputType: 'text0',
                        label: '计价方法',
                        fieldName: 'method_text',
                    },
                    {
                        inputType: 'text0',
                        label: '计价名称',
                        fieldName: 'price_name',
                    },
                    {
                        inputType: 'expression0',
                        label: '单价',
                        hdlExpression({scopeThis, formData}) {
                            return Math.floor(formData.price) / 100
                        },
                    },
                    {
                        inputType: 'expression0',
                        label: '入住时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkin)
                        },
                    },
                    {
                        inputType: 'expression0',
                        label: '离开时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkout)
                        },
                    },
                    {
                        inputType: 'text0',
                        label: '用房状态',
                        fieldName: 'status_text',
                    },
                    {
                        inputType: 'text0',
                        label: '客房状态',
                        fieldName: 'room_status_text',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
