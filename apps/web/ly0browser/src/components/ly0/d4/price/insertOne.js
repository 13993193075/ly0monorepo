import { request } from '@yoooloo42/ihavebacking'
import cascade from './cascade.js'
import {ly0withTable as withTable} from '@yoooloo42/ly0el'
const ly0session = request.ly0.ly0sessionLoad()
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
                await withTable.submitInsertOne({scopeThis, formData})
            }
        }
    },
    formData: {
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        id_goods: null,
        name: '',
        method_code: '',
        price: 0,
        price0: 0,
    }
}
