function items(branch){
    let result = [
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
            },
        },
        {
            inputType: "input",
            label: "商品编号",
            fieldName: "number"
        },
        {
            inputType: "input",
            label: "商品名称",
            fieldName: "name",
            inputWidth: "400px"
        },
        {
            inputType: "d7group",
            label: "商品分类",
            fieldName: "group",
        },
        {
            inputType: "d7size",
            label: "商品规格",
            fieldName: "size"
        },
        {
            inputType: "d7price",
            label: "商品标价",
            fieldName: "price"
        },
        {
            inputType: "input",
            label: "厂商品牌",
            fieldName: "brand",
            inputWidth: "300px"
        },
        {
            inputType: "switch",
            label: "是否进口",
            fieldName: "import",
            activeText: "是",
            inactiveText: "否",
            activeValue: true,
            inactiveValue: false,
            activeColor: "#ee7405",
        },
        // 国内产地
        {
            inputType: "d3gbt2260",
            label: "产地",
            fieldName: "domestic_code",
            hdlVisible(scopeThis, fieldsValue){
                return fieldsValue.import === false
            }
        },
        // 国际产地
        {
            inputType: "select",
            label: "产地",
            fieldName: "foreign_code",
            item_fieldLabel: "text",
            item_fieldValue: "code",
            hdlGetItems(scopeThis){
                return scopeThis.pageData.data.gbt2659
            },
            hdlVisible(scopeThis, fieldsValue){
                return fieldsValue.import === true
            }
        },
        {
            inputType: "collapse",
            items: []
        }
    ]

    if(branch === "insertOne"){
        result[result.length - 1].items.push(
            {
                title: "缩略图 - 上传",
                items: [
                    {
                        inputType: "upload-avatar",
                        fieldName: "thumb",
                        avatar: {
                            width: "150px",
                            height: "150px"
                        }
                    },
                ]
            },
            {
                title: "商品图示 - 上传",
                items: [
                    {
                        inputType: "upload-picture-wall",
                        fieldName: "illustration",
                        limit: 10
                    }
                ]
            }
        )
    }else if(branch === "updateOne"){
        result[result.length - 1].items.push(
            {
                title: "缩略图 - 原图",
                items: [
                    {
                        inputType: "image",
                        fieldName: "thumb",
                        imageDelete: "thumbDelete",
                        imageWidth: "150px",
                        imageHeight: "150px"
                    }
                ]
            },
            {
                title: "缩略图 - 重新上传",
                items: [
                    {
                        inputType: "upload-avatar",
                        fieldName: "thumbNew",
                        avatar: {
                            width: "150px",
                            height: "150px"
                        }
                    },
                ]
            },
            {
                title: "商品图示 - 原图",
                items: [
                    {
                        inputType: "images",
                        fieldName: "illustration",
                        imageDelete: "illustrationDelete",
                        imageWidth: "150px",
                        imageHeight: "150px"
                    }
                ]
            },
            {
                title: "商品图示 - 补充上传",
                items: [
                    {
                        inputType: "upload-picture-wall",
                        fieldName: "illustrationNew",
                        limit: 20
                    }
                ]
            }
        )
    }

    return result
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
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "input",
                            label: "商品名称",
                            fieldName: "name",
                            inputWidth: "400px"
                        },
                        {
                            inputType: "d7group",
                            label: "商品分类",
                            fieldName: "group"
                        },
                        {
                            inputType: "d7size",
                            label: "商品规格",
                            fieldName: "size"
                        },
                        {
                            inputType: "input",
                            label: "厂商品牌",
                            fieldName: "brand",
                            inputWidth: "300px"
                        },
                        {
                            inputType: "select",
                            label: "是否进口",
                            fieldName: "import",
                            item_fieldLabel: "text",
                            item_fieldValue: "code",
                            items: [
                                {code: null, text: "不查询"},
                                {code: true, text: "是"},
                                {code: false, text: "否"}
                            ],
                        },
                        // 国内产地
                        {
                            inputType: "d3gbt2260",
                            label: "产地",
                            fieldName: "domestic_code",
                            hdlVisible(scopeThis, fieldsValue){
                                return fieldsValue.import === false
                            }
                        },
                        // 国际产地
                        {
                            inputType: "select",
                            label: "产地",
                            fieldName: "foreign_code",
                            item_fieldLabel: "text",
                            item_fieldValue: "code",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.gbt2659
                            },
                            hdlVisible(scopeThis, fieldsValue){
                                return fieldsValue.import === true
                            }
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
            cols: [{items: items("insertOne")}]
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
                            label: "商店",
                            fieldName: "shop_name",
                            hdlVisible(scopeThis){
                                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
                            }
                        },
                        {
                            inputType: "text",
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "text",
                            label: "商品名称",
                            fieldName: "name",
                            inputWidth: "400px"
                        },
                        {
                            inputType: "d7group",
                            label: "商品分类",
                            fieldName: "group",
                            readOnly: true
                        },
                        {
                            inputType: "d7size",
                            label: "商品规格",
                            fieldName: "size",
                            readOnly: true
                        },
                        {
                            inputType: "d7price",
                            label: "商品标价",
                            fieldName: "price",
                            readOnly: true
                        },
                        {
                            inputType: "expression",
                            label: "是否进口",
                            hdlExpression(scopeThis, fieldsValue){
                                return !!fieldsValue.import ? "是" : "否"
                            },
                            inputWidth: "100px"
                        },
                        // 国内产地
                        {
                            inputType: "text",
                            label: "产地",
                            fieldName: "domestic",
                            hdlVisible(scopeThis, fieldsValue){
                                return fieldsValue.import === false
                            }
                        },
                        // 国际产地
                        {
                            inputType: "text",
                            label: "产地",
                            fieldName: "foreign",
                            hdlVisible(scopeThis, fieldsValue){
                                return fieldsValue.import === true
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
                                            imageWidth: "150px",
                                            imageHeight: "150px"
                                        }
                                    ]
                                },
                                {
                                    title: "商品图示",
                                    items: [
                                        {
                                            inputType: "images",
                                            fieldName: "illustration",
                                            imageWidth: "150px",
                                            imageHeight: "150px"
                                        }
                                    ]
                                },
                            ]
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
            cols: [{items: items("updateOne")}]
        }
    }
}

export default{
    getFormProps
}
