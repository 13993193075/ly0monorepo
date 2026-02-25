import { request as ly0request } from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0.ly0sessionLoad()
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
                        label: '商店',
                        fieldName: 'id_shop',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrShop
                        },
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrShop.length > 1 // 只有一个商店时不显示
                        },
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
                        label: '交易时间',
                        fieldName: 'time',
                        type: 'datetime',
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
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        id_dataunit: ly0session.dataunit._id,
        id_shop: ly0session.user.id_shop ? ly0session.user.id_shop : null,
        status_code: '',
        time: null,
        client_cellphone: '',
        client_name: '',
    }
}
