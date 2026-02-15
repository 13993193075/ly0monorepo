function items(){
    return [
        {
            inputType: "select",
            label: "商店",
            fieldName: "id_shop",
            item_fieldLabel: "name",
            item_fieldValue: "_id",
            hdlGetItems(scopeThis){
                return scopeThis.pageData.data.arrShop
            },
            hdlVisible(scopeThis){
                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
            }
        },
        {
            inputType: "input",
            label: "解码名称",
            fieldName: "name"
        },
        {
            inputType: "input",
            label: "关键字",
            fieldName: "decode"

        }
    ]
}

function getFormProps(scopeThis){
    return {
        find: {
            popup: {
                visible: false,
                title: "查询"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "select",
                            label: "商店",
                            fieldName: "id_shop",
                            item_fieldLabel: "name",
                            item_fieldValue: "_id",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.arrShop
                            },
                            hdlVisible(scopeThis){
                                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
                            }
                        },
                        {
                            inputType: "input",
                            label: "解码名称",
                            fieldName: "name"
                        }
                    ]
                }
            ]
        },
        insertOne: {
            popup: {
                visible: false,
                title: "新增"
            },
            cols: [{items: items()}]
        },
        doc: {
            popup: {
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
                            hdlVisible(scopeThis){
                                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
                            }
                        },
                        {
                            inputType: "text",
                            label: "解码名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "text",
                            label: "关键字",
                            fieldName: "decode"
                        }
                    ]
                }
            ]
        },
        updateOne: {
            popup: {
                visible: false,
                title: "修改"
            },
            cols: [{items: items()}]
        }
    }
}

export default{
    getFormProps
}
