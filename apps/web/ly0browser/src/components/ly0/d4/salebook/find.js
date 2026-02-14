import {ly0withTable as withTable} from 'packages/ly0el'
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
                        label: '房型',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis, formData}) {
                            return scopeThis.pgData.data.arrGoods
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
