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
                        label: "商品编号",
                        fieldName: "number"
                    },
                    {
                        inputType: 'text',
                        label: '商品名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'text',
                        label: '标价名称',
                        fieldName: 'price_name',
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
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
