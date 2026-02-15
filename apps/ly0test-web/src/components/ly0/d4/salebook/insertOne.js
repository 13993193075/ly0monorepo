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
                        inputType: 'select',
                        label: '房型',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis, formData}) {
                            return scopeThis.pgData.data.arrGoods
                        },
                    },
                    {
                        inputType: 'input',
                        label: '数量',
                        fieldName: 'count',
                        style: {width: '100px'},
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        _id: null,
        id_business: null,
        id_goods: null,
        goods_name: '',
        count: 1,
    }
}
