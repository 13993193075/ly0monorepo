import {withTable as withTable} from 'packages/ly0el/src/index.js'
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
                        inputType: 'input',
                        label: '姓名',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'input',
                        label: '证件号码',
                        fieldName: 'docno',
                    },
                    {
                        inputType: 'input',
                        label: '手机号',
                        fieldName: 'cellphone',
                    },
                    {
                        inputType: 'select',
                        label: '房号',
                        fieldName: 'id_b_goods',
                        item_fieldLabel: 'roomno',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrBGoods
                        },
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
