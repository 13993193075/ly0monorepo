import { request as ly0request } from '@yoooloo42/ly0browser'
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
        async handle({scopeThis, formData}){
            const result = await ly0request.ly0.storpro({
                storproName: 'ly0d7.id_business.setBaseInfo',
                data: formData
            })
            ElMessage(result.message)
            scopeThis.formProps.popup.visible = false
            scopeThis.handles.init({scopeThis})
            scopeThis.panel.open.baseInfo = ['0']
        }
    }
}
