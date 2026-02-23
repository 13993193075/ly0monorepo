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
                        inputType: "input",
                        label: "商店编号",
                        fieldName: "_id",
                    },
                    {
                        inputType: 'input',
                        label: '商店名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: "select",
                        label: "商城代收",
                        fieldName: "mall",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        items: [
                            {code: null, text: "不查询"},
                            {code: true, text: "是"},
                            {code: false, text: "否"}
                        ],
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
