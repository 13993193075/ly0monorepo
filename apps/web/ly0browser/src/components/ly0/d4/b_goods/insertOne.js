import { ly0withTable as withTable } from 'packages/ly0el'
import cascade from './cascade.js'
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
                        label: '客房分区',
                        fieldName: 'id_roomplace',
                        item_fieldLabel: 'text',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrRoomplace
                        },
                        hdlChange({scopeThis, formData, value}) {
                            cascade.id_roomplaceChanged({scopeThis, formData, value})
                        },
                    },
                    {
                        inputType: 'select',
                        label: '房型',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrGoods
                        },
                        hdlChange({scopeThis, formData, value}) {
                            cascade.id_goodsChanged({scopeThis, formData, value})
                        },
                    },
                    {
                        inputType: 'select',
                        label: '房号',
                        fieldName: 'id_room',
                        item_fieldLabel: 'roomno',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrRoom0
                        },
                        hdlChange({scopeThis, formData, value}) {
                            cascade.id_roomChanged({scopeThis, formData, value})
                        },
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '标价',
                                items: [
                                    {
                                        inputType: 'select',
                                        label: '更多标价',
                                        fieldName: 'id_price',
                                        item_fieldLabel: 'name',
                                        item_fieldValue: '_id',
                                        hdlGetItems({scopeThis}) {
                                            return scopeThis.pgData.data.arrPrice0
                                        },
                                        hdlChange({scopeThis, formData, value}) {
                                            cascade.id_priceChanged({scopeThis, formData, value})
                                        },
                                    },
                                    {
                                        inputType: 'input',
                                        label: '标价名称',
                                        fieldName: 'price_name',
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
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        inputType: 'date-picker',
                        label: '入住时间',
                        fieldName: 'checkin',
                    },
                    {
                        inputType: 'date-picker',
                        label: '离开时间',
                        fieldName: 'checkout',
                    },
                    {
                        inputType: 'select',
                        label: '用房状态',
                        fieldName: 'status_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrStatus
                        },
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}) {
                formData.price = Math.floor((formData.price0 * 100))
                await withTable.submitInsertOne({scopeThis, formData})
            }
        }
    },
    formData: {
        _id: null,
        id_business: null,
        id_roomplace: null,
        id_goods: null,
        id_room: null,
        id_price: null,
        price_name: '',
        method_code: '',
        price: 0,
        price0: 0,
        checkin: null,
        checkout: null,
        status_code: '',
    }
}
