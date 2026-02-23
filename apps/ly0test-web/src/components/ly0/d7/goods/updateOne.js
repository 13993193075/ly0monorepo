import {withTable} from '@yoooloo42/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
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
                        fieldName: "group",
                    },
                    {
                        inputType: "ly0d7size",
                        label: "商品规格",
                        fieldName: "size"
                    },
                    {
                        inputType: "ly0d7price",
                        label: "商品标价",
                        fieldName: "price"
                    },
                    {
                        inputType: "input",
                        label: "厂商品牌",
                        fieldName: "brand",
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
                    },
                    {
                        inputType: "collapse",
                        items: [
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
                        ]
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
