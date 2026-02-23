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
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
