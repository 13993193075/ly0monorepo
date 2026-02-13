import {ly0withTable as withTable} from '@yoooloo42/ly0el'
import cascade from './cascade.js'
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
                        label: '旅店',
                        fieldName: 'id_hotel',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel
                        },
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                        hdlChange({scopeThis, formData}) {
                            cascade.hotelChange0({scopeThis})
                        }
                    },
                    {
                        inputType: 'select',
                        label: '房型名称',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrGoods0
                        },
                    },
                    {
                        inputType: 'input',
                        label: '标价名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'select',
                        label: '计价方法',
                        fieldName: 'method_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrMethod
                        },
                    },
                    {
                        inputType: 'input',
                        label: '单价',
                        fieldName: 'price0',
                        style: {width: '100px'},
                    }
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}) {
                formData.price = Math.floor(formData.price0 * 100)
                await withTable.submitUpdateOne({scopeThis, formData})
            }
        }
    }
}
