const fieldsValue_init = {
    number: "",
    name: "",
    group: [],
    size: [],

    // 分页查询
    pagination_limit: 100,
    pagination_page: 1,
    pagination_count: 0
}

export default{
    formProps: {
        popup: {
            visible: false,
            title: "获取更多已上架商品"
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
                        inputType: "collapse",
                        items: [
                            {
                                title: "分页查询",
                                items: [
                                    {
                                        inputType: "input-number",
                                        label: "分页大小",
                                        fieldName: "pagination_limit",
                                        min: 10,
                                        max: 1000,
                                        size: "small"
                                    },
                                    {
                                        inputType: "input-number",
                                        label: "当前页号",
                                        fieldName: "pagination_page",
                                        min: 1,
                                        max: 100,
                                        size: "small"
                                    },
                                    {
                                        inputType: "text",
                                        label: "全部记录数",
                                        fieldName: "pagination_count",
                                        inputWidth: "150px"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    dataBox: {
        fieldsValue_init,
        fieldsValue: JSON.parse(JSON.stringify(fieldsValue_init)),
        hdlSubmit(scopeThis){
            // 取整
            scopeThis.withArrGoods.dataBox.fieldsValue.pagination_limit = Math.floor(scopeThis.withArrGoods.dataBox.fieldsValue.pagination_limit)
            scopeThis.withArrGoods.dataBox.fieldsValue.pagination_page = Math.floor(scopeThis.withArrGoods.dataBox.fieldsValue.pagination_page)

            // 获取更多已上架商品
            scopeThis.storpro.storpro({
                scopeThis,
                storproName: "ly0d7.goods.find",
                data: {
                    query: {
                        id_dataunit: scopeThis.pageData.data.objBusiness.id_dataunit,
                        id_shop: scopeThis.pageData.data.objShop._id,
                        number: scopeThis.withArrGoods.dataBox.fieldsValue.number,
                        name: scopeThis.withArrGoods.dataBox.fieldsValue.name,
                        group: scopeThis.withArrGoods.dataBox.fieldsValue.group,
                        size: scopeThis.withArrGoods.dataBox.fieldsValue.size
                    },
                    sort: {
                        label: "number",
                        order: 1
                    },
                    limit: scopeThis.withArrGoods.dataBox.fieldsValue.pagination_limit,
                    page: scopeThis.withArrGoods.dataBox.fieldsValue.pagination_page
                }
            }).then(result=>{
                scopeThis.pageData.data.arrGoods = result.data
                scopeThis.withArrGoods.dataBox.fieldsValue.pagination_count = result.count

                // 如果是表单操作，而不是仅用于获取数据
                if(!!scopeThis.withArrGoods.branch){
                    let branch = scopeThis.withArrGoods.branch
                    scopeThis.formDataBox[branch].fieldsValue = scopeThis.fieldsValue_init[branch]
                    scopeThis.withArrGoods.formProps.popup.visible = false
                }
            })
        }
    }
}
