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
                        label: "商店名称",
                        fieldName: "shop_name",
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrShop.length > 1 // 只有一个商店时不显示
                        },
                        style: {
                            width: "300px",
                        }
                    },
                    {
                        inputType: "text",
                        label: "商品编号",
                        fieldName: "number",
                        style: {
                            width: "200px",
                        }
                    },
                    {
                        inputType: "text",
                        label: "商品名称",
                        fieldName: "name",
                        style: {
                            width: "400px",
                        }
                    },
                    {
                        inputType: "ly0d7group",
                        label: "商品分类",
                        fieldName: "group",
                        readOnly: true
                    },
                    {
                        inputType: "ly0d7size",
                        label: "商品规格",
                        fieldName: "size",
                        readOnly: true
                    },
                    {
                        inputType: "ly0d7price",
                        label: "商品标价",
                        fieldName: "price",
                        readOnly: true
                    },
                    {
                        inputType: "expression",
                        label: "是否进口",
                        hdlExpression({scopeThis, formData}){
                            return !!formData.import ? "是" : "否"
                        },
                        style: {
                            width: "100px",
                        }
                    },
                    // 国内产地
                    {
                        inputType: "text",
                        label: "产地",
                        fieldName: "domestic",
                        hdlVisible({scopeThis, formData}){
                            return formData.import === false
                        },
                        style: {
                            width: "400px",
                        }
                    },
                    // 国际产地
                    {
                        inputType: "text",
                        label: "产地",
                        fieldName: "foreign",
                        hdlVisible({scopeThis, formData}){
                            return formData.import === true
                        },
                        style: {
                            width: "400px",
                        }
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "缩略图",
                                items: [
                                    {
                                        inputType: "image",
                                        fieldName: "thumb",
                                        style: {
                                            width: "160px",
                                            height: "120px"
                                        }
                                    }
                                ]
                            },
                            {
                                title: "商品图示",
                                items: [
                                    {
                                        inputType: "images",
                                        fieldName: "illustration",
                                        style: {
                                            width: "160px",
                                            height: "120px"
                                        }
                                    }
                                ]
                            },
                        ]
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
