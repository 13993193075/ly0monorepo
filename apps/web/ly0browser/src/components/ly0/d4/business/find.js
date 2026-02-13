import { ly0withTable as withTable } from '@yoooloo42/ly0el'
import cascade from './cascade.js'
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
                        label: '订单编号',
                        fieldName: '_id',
                    },
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
                        inputType: 'input',
                        label: '订单手机号',
                        fieldName: 'cellphone',
                    },
                    {
                        inputType: 'select',
                        label: '订单状态',
                        fieldName: 'status_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrBusinessStatus
                        },
                    },
                    {
                        inputType: 'date-picker',
                        label: '入住时间 起',
                        fieldName: 'checkin_start',
                        type: 'datetime',
                    },
                    {
                        inputType: 'date-picker',
                        label: '止',
                        fieldName: 'checkin_end',
                        type: 'datetime',
                    },
                    {
                        inputType: 'date-picker',
                        label: '离开时间 起',
                        fieldName: 'checkout_start',
                        type: 'datetime',
                    },
                    {
                        inputType: 'date-picker',
                        label: '止',
                        fieldName: 'checkout_end',
                        type: 'datetime',
                    },
                    {
                        inputType: 'select',
                        label: '预订类型',
                        fieldName: 'id_booktype',
                        item_fieldLabel: 'text',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrBooktype0
                        },
                    },
                    {
                        inputType: 'input',
                        label: '客户手机号',
                        fieldName: 'client_cellphone',
                    },
                    {
                        inputType: 'input',
                        label: '客户名称',
                        fieldName: 'client_name',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
