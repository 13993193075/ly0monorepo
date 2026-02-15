import {request} from 'packages/ly0libs/src/index.js'
import {ElMessage} from 'element-plus'
export default {
    popup: {
        switch: true,
        visible: false,
        title: "审定核收金额"
    },
    cols: [
        {
            items: [
                {
                    inputType: 'input',
                    label: '核收金额',
                    fieldName: 'deal0',
                    style: 'width: 100px',
                },
                {
                    inputType: 'input',
                    label: '备注',
                    fieldName: 'dealnote',
                    style: 'width: 400px',
                },
            ]
        }
    ],
    submit: {
        async handle({scopeThis, formData}){
            scopeThis.formData.deal = Math.floor(scopeThis.formData.deal0 * 100)
            const result = await request.ly0.storpro({
                storproName: 'ly0d4.id_business.setDeal',
                data: scopeThis.formData
            })
            ElMessage(result.message)
            scopeThis.formProps.popup.visible = false
            scopeThis.handles.init({scopeThis})
            scopeThis.panel.open.amount = ['0']
        }
    }
}
