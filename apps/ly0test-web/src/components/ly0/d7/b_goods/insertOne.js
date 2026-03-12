import {withTable} from '@yoooloo42/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "新增"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "可以选择已上架商品",
                                items: [
                                    {
                                        inputType: "select",
                                        label: "[点击获取更多已上架商品] 选择商品",
                                        labelBox: {style: {color: 'blue'}},
                                        fieldName: "id_goods",
                                        item_fieldLabel: "name",
                                        item_fieldValue: "_id",
                                        hdlGetItems({scopeThis, formData}){
                                            return scopeThis.pgData.data.arrGoods
                                        },
                                        hdlChange({scopeThis, formData, value}){
                                            scopeThis.cascade.id_goodsClear({scopeThis, formData})
                                            scopeThis.cascade.id_goodsChanged({scopeThis, formData, value})
                                        },
                                        hdlLabelClick({formData, formProps, scopeThis}){
                                            scopeThis.withArrGoods.formProps.popup.visible = true
                                        },
                                        placeholder: "下拉或直接输入匹配",
                                        style: {width: '300px'},
                                    },
                                    {
                                        inputType: "select",
                                        label: "选择标价",
                                        fieldName: "price_name",
                                        item_fieldLabel: "name",
                                        item_fieldValue: "name",
                                        hdlGetItems({scopeThis, formData}){
                                            return scopeThis.pgData.data.arrPrice
                                        },
                                        hdlChange({scopeThis, formData, value}){
                                            scopeThis.cascade.priceClear({scopeThis, formData})
                                            scopeThis.cascade.priceChanged({scopeThis, formData, value})
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
                                        style: {width: '100px'},
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        inputType: 'input',
                        label: '数量',
                        fieldName: 'count',
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}) {
                formData.price = Math.floor((formData.price_yuan * 100))
                await withTable.submitInsertOne({scopeThis, formData})
            }
        }
    },
    formData: {
        _id: null,
        id_business: null,
        id_goods: null,
        number: "",
        name: '',
        price_name: "",
        price: 0,
        price_yuan: 0,
        count: 1,
        note: '',
    }
}
