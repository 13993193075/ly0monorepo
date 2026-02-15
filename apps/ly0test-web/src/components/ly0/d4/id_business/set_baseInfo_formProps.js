import {request} from 'packages/ly0libs/src/index.js'
import {ElMessage} from 'element-plus'
export default {
    popup: {
        switch: true,
        visible: false,
        title: "修改订单基本信息"
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
                    type: 'datetime',
                },
                {
                    inputType: 'date-picker',
                    label: '离开时间',
                    fieldName: 'checkout',
                    type: 'datetime',
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
                {
                    inputType: 'input',
                    label: '预订说明',
                    fieldName: 'booknote',
                    inputWidth: '350px',
                },
            ]
        }
    ],
    submit: {
        async handle({scopeThis, formData}){
            const result = await request.ly0.storpro({
                storproName: 'ly0d4.id_business.setBaseInfo',
                data: formData
            })
            ElMessage(result.message)
            scopeThis.formProps.popup.visible = false
            scopeThis.handles.init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }
    }
}
