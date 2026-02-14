import { ly0withTable as withTable } from 'packages/ly0el'
import {ElMessage} from 'element-plus'
export default {
    formProps_checkin: {
        popup: {
            switch: true,
            visible: false,
            title: '批量修改：入住时间',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'expression',
                        label: '选中房数',
                        hdlExpression({scopeThis}) {
                            return scopeThis.arrMultipleSelection.length
                        },
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '入住时间',
                        fieldName: 'checkin',
                    },
                ],
            },
        ],
        submit: {
            async handle({scopeThis}) {
                await request.ly0.storpro({
                    storproName: scopeThis.storpro.updateManyCheckin,
                    data: {
                        id_business: scopeThis.props_myProps.id_business,
                        arrUpdate: scopeThis.arrMultipleSelection,
                        checkin: scopeThis.formData.checkin,
                    },
                })
                scopeThis.formProps.popup.visible = false
                ElMessage('批量修改入住时间已完成')
                withTable.reload({scopeThis})
            }
        },
    },
    formProps_checkout: {
        popup: {
            switch: true,
            visible: false,
            title: '批量修改：离开时间',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'expression',
                        label: '选中房数',
                        hdlExpression({scopeThis}) {
                            return scopeThis.arrMultipleSelection.length
                        },
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'date-picker',
                        label: '离开时间',
                        fieldName: 'checkout',
                    },
                ],
            },
        ],
        submit: {
            async handle({scopeThis}) {
                await request.ly0.storpro({
                    storproName: scopeThis.storpro.updateManyCheckout,
                    data: {
                        id_business: scopeThis.props_myProps.id_business,
                        arrUpdate: scopeThis.arrMultipleSelection,
                        checkout: scopeThis.formData.checkout,
                    },
                })
                scopeThis.formProps.popup.visible = false
                ElMessage('批量修改离开时间已完成')
                withTable.reload({scopeThis})
            }
        },
    },
    formProps_status: {
        popup: {
            switch: true,
            visible: false,
            title: '批量修改：用房状态',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'expression',
                        label: '选中房数',
                        hdlExpression({scopeThis}) {
                            return scopeThis.arrMultipleSelection.length
                        },
                        style: {width: '100px'},
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
                ],
            },
        ],
        submit: {
            async handle({scopeThis}) {
                await request.ly0.storpro({
                    storproName: scopeThis.storpro.updateManyStatus,
                    data: {
                        id_business: scopeThis.props_myProps.id_business,
                        arrUpdate: scopeThis.arrMultipleSelection,
                        status_code: scopeThis.formData.status_code,
                    },
                })
                scopeThis.formProps.popup.visible = false
                ElMessage('批量修改用房状态已完成')
                withTable.reload({scopeThis})
            }
        },
    },
    formProps_price: {
        popup: {
            switch: true,
            visible: false,
            title: '批量修改：单价',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'expression',
                        label: '选中房数',
                        hdlExpression({scopeThis}) {
                            return scopeThis.arrMultipleSelection.length
                        },
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'input',
                        label: '单价',
                        fieldName: 'price',
                    },
                ],
            },
        ],
        submit: {
            async handle({scopeThis}) {
                await request.ly0.storpro({
                    storproName: scopeThis.storpro.updateManyCheckin,
                    data: {
                        id_business: scopeThis.props_myProps.id_business,
                        arrUpdate: scopeThis.arrMultipleSelection,
                        price: Math.floor(scopeThis.formData.price * 100),
                    },
                })
                scopeThis.formProps.popup.visible = false
                ElMessage('批量修改单价已完成')
                withTable.reload({scopeThis})
            }
        },
    },
    formData: {
        checkin: null,
        checkout: null,
        status_code: '',
        price: 0
    },
}
