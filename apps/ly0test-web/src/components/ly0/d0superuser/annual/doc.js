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
                        inputType: "text",
                        label: "数据单元",
                        fieldName: "dataunit_name",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "expression",
                        label: "起始日期",
                        hdlExpression({formData}){
                            return ly0utils.dateFormat.dateFormat(formData.from, "yyyy/MM/dd")
                        },
                        style: {width: '200px'}
                    },
                    {
                        inputType: "expression",
                        label: "截止日期",
                        hdlExpression({formData}){
                            return ly0utils.dateFormat.dateFormat(formData.to, "yyyy/MM/dd")
                        },
                        style: {width: '200px'}
                    },
                    {
                        inputType: "expression",
                        label: "年费金额",
                        hdlExpression({formData}){
                            return Math.floor(formData.fee) / 100
                        },
                        style: {width: '100px'}
                    },
                    {
                        inputType: "text",
                        label: "支付状态",
                        fieldName: "status_text",
                        style: {width: '200px'}
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
