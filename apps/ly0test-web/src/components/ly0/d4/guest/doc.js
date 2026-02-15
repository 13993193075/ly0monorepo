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
                        inputType: 'text',
                        label: '姓名',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'text',
                        label: '性别',
                        fieldName: 'sex_text',
                    },
                    {
                        inputType: 'text',
                        label: '证件号码',
                        fieldName: 'docno',
                    },
                    {
                        inputType: 'text',
                        label: '手机号',
                        fieldName: 'cellphone',
                    },
                    {
                        inputType: 'text',
                        label: '房号',
                        fieldName: 'roomno',
                    },
                    {
                        inputType: 'expression',
                        label: '入住时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkin)
                        },
                    },
                    {
                        inputType: 'expression',
                        label: '离开时间',
                        hdlExpression({scopeThis, formData}) {
                            return blindboxes.dateFormat.dateFormat(formData.checkout)
                        },
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
