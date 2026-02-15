import {withTable} from '@yoooloo42/ly0el'
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
                        inputType: 'input',
                        label: '姓名',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'select',
                        label: '性别',
                        fieldName: 'sex_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrSex
                        },
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
                        hdlChange({scopeThis, formData, value}) {
                            // 级联
                            let objBGoods = scopeThis.pgData.data.arrBGoods.find(i => {
                                return i._id === value
                            })
                            if (!!objBGoods) {
                                formData.checkin = objBGoods.checkin
                                formData.checkout = objBGoods.checkout
                            } else {
                                formData.checkin = null
                                formData.checkout = null
                            }
                        },
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
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
