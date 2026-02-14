import {blindboxes} from 'packages/ly0utils'
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
                        label: '备忘',
                        fieldName: 'memo',
                        style: {width: '600px'},
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '记录',
                                items: [
                                    {
                                        inputType: 'expression',
                                        label: '记录时间',
                                        hdlExpression({scopeThis, formData}) {
                                            return blindboxes.dateFormat.dateFormat(formData.time)
                                        },
                                        style: {width: '200px'},
                                    },
                                    {
                                        inputType: 'text',
                                        label: '记录员',
                                        fieldName: 'recorder_name',
                                        style: {width: '200px'},
                                    },
                                    {
                                        inputType: 'text',
                                        label: '手机号',
                                        fieldName: 'recorder_cellphone',
                                        style: {width: '200px'},
                                    },
                                ],
                            },
                        ],
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
