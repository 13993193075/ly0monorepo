import handles from './handles.js'
export default {
    formProps: {
        popup: {
            visible: false,
            title: '',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '订单手机号',
                        fieldName: 'cellphone',
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
                        inputType: 'input',
                        label: '入住人数',
                        fieldName: 'peoples',
                    },
                    {
                        inputType: 'input',
                        label: '所需客房数',
                        fieldName: 'rooms',
                    },
                    {
                        inputType: 'select',
                        label: '预订类型',
                        fieldName: 'id_booktype',
                        item_fieldLabel: 'text',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.arrBooktype
                        },
                    },
                    {
                        inputType: 'date-picker',
                        label: '预订时间',
                        fieldName: 'booktime',
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
                    {
                        inputType: 'input',
                        label: '预订说明',
                        fieldName: 'booknote',
                        style: {width: '400px'},
                    },
                ],
            },
        ],
        submit: {
            handle: handles.newBusinessSubmit
        }
    },
    formData: {
        _id: null,
        id_hotel: null,
        cellphone: '',
        status_code: '1', // 订单状态：入住
        checkin: null,
        checkout: null,
        peoples: '',
        rooms: '',
        id_booktype: null,
        booktime: '',
        client_cellphone: '',
        client_name: '',
        booknote: '',
    },
}
