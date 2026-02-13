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
                        label: "旅店",
                        fieldName: "hotel_name",
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                    },
                    {
                        inputType: "text",
                        label: "房型名称",
                        fieldName: "goods_name",
                    },
                    {
                        inputType: "text",
                        label: "标价名称",
                        fieldName: "name",
                    },
                    {
                        inputType: "text",
                        label: "计价方法",
                        fieldName: "method_text",
                    },
                    {
                        inputType: "expression",
                        label: "单价",
                        hdlExpression({scopeThis, formData}) {
                            return Math.floor(formData.price) / 100
                        },
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
