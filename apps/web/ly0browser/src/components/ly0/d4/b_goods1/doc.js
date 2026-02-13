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
                        label: '物品名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'expression',
                        label: '单价',
                        hdlExpression({scopeThis, formData}) {
                            return Math.floor(formData.price) / 100
                        },
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'text',
                        label: '数量',
                        fieldName: 'count',
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'text',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
