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
                        label: "商店编号",
                        fieldName: "_id",
                    },
                    {
                        inputType: 'text',
                        label: '商店名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: "text",
                        label: "小票机型号",
                        fieldName: "smallticket",
                    },
                    {
                        inputType: "expression",
                        label: "商城代收",
                        hdlExpression({scopeThis, formData}){
                            return "mall" in formData && (formData.mall === true || formData.mall ==="true") ? "是" : "否"
                        },
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '微信支付',
                                items: [
                                    {
                                        inputType: 'text',
                                        label: 'APPID',
                                        fieldName: 'wx_appid',
                                    },
                                    {
                                        inputType: 'text',
                                        label: 'MCHID',
                                        fieldName: 'wx_mchid',
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
