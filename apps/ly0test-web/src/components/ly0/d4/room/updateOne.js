import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
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
                        label: '客房分区',
                        fieldName: 'id_roomplace',
                        item_fieldLabel: 'text',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrRoomplace0
                        },
                    },
                    {
                        inputType: 'input',
                        label: '房号',
                        fieldName: 'roomno',
                    },
                    {
                        inputType: 'select',
                        label: '房型',
                        fieldName: 'id_goods',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrGoods0
                        },
                    },
                    {
                        inputType: 'select',
                        label: '客房状态',
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
            handle: withTable.submitUpdateOne
        }
    }
}
