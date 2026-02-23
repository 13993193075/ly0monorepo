import {withTable} from '@yoooloo42/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "查询"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'select',
                        label: '商店',
                        fieldName: 'id_shop',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrShop
                        },
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrShop.length > 1 // 只有一个商店时不显示
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
                    },
                    {
                        inputType: "ly0d7group",
                        label: "商品分类",
                        fieldName: "group"
                    },
                    {
                        inputType: "ly0d7size",
                        label: "商品规格",
                        fieldName: "size"
                    },
                    {
                        inputType: "input",
                        label: "厂商品牌",
                        fieldName: "brand",
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
                        inputType: "ly0gbt2260",
                        label: "产地",
                        fieldName: "domestic_code",
                        hdlVisible({scopeThis, formData}){
                            return formData.import === false
                        }
                    },
                    // 国际产地
                    {
                        inputType: "select",
                        label: "产地",
                        fieldName: "foreign_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.gbt2659
                        },
                        hdlVisible({scopeThis, formData}){
                            return formData.import === true
                        }
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
