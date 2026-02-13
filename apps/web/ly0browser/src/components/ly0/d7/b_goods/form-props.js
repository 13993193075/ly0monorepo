function items(scopeThis, branch){
    return [
        {
            inputType: "collapse",
            items: [
                {
                    title: "可以选择已上架商品",
                    items: [
                        {
                            inputType: "select",
                            label: "[点击获取更多已上架商品] 选择商品",
                            labelBox: {style: "color: blue;"},
                            fieldName: "id_goods",
                            item_fieldLabel: "name",
                            item_fieldValue: "_id",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.arrGoods
                            },
                            hdlChange(scopeThis, value){
                                scopeThis.hdlsCascade.id_goodsClear(scopeThis, branch)
                                scopeThis.hdlsCascade.id_goodsChanged(scopeThis, value, branch)
                            },
                            hdlLabelClick(scopeThis){
                                scopeThis.withArrGoods.branch = branch
                                scopeThis.withArrGoods.formProps.popup.visible = true
                            },
                            placeholder: "下拉或直接输入匹配",
                            inputWidth: "300px"
                        },
                        {
                            inputType: "select",
                            label: "选择标价",
                            fieldName: "price_name",
                            item_fieldLabel: "name",
                            item_fieldValue: "name",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.arrPrice
                            },
                            hdlChange(scopeThis, value){
                                scopeThis.hdlsCascade.priceClear(scopeThis, branch)
                                scopeThis.hdlsCascade.priceChanged(scopeThis, value, branch)
                            },
                            placeholder: "下拉或直接输入匹配"
                        }
                    ]
                },
                {
                    title: "也可以直接输入未上架商品",
                    items: [
                        {
                            inputType: "input",
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "input",
                            label: "商品名称",
                            fieldName: "name",
                            inputWidth: "300px"
                        },
                        {
                            inputType: "input",
                            label: "标价名称",
                            fieldName: "price_name"
                        },
                        {
                            inputType: "input",
                            label: "单价",
                            fieldName: "price_yuan",
                            inputWidth: "150px",
                        }
                    ]
                }
            ]
        },
        {
            inputType: "input",
            label: "数量",
            fieldName: "count",
            inputWidth: "150px",
        },
        {
            inputType: "input",
            label: "备注",
            fieldName: "note"
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
                            inputType: "input",
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "input",
                            label: "商品名称",
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
            cols: [{items: items(scopeThis, "insertOne")}]
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
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "text",
                            label: "商品名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "text",
                            label: "标价名称",
                            fieldName: "price_name"
                        },
                        {
                            inputType: "expression",
                            label: "单价",
                            hdlExpression(scopeThis){
                                return Math.floor(scopeThis.formDataBox.doc.fieldsValue.price) / 100
                            },
                            inputWidth: "150px"
                        },
                        {
                            inputType: "text",
                            label: "数量",
                            fieldName: "count",
                            inputWidth: "150px"
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
            cols: [{items: items(scopeThis, "updateOne")}]
        }
    }
}

export default{
    getFormProps
}
