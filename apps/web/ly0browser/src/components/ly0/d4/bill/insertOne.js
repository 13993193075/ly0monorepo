import { request } from '@yoooloo42/ihavebacking'
import { ly0withTable as withTable } from '@yoooloo42/ly0el'
const ly0session = request.ly0.ly0sessionLoad()

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
                        inputType: 'input',
                        label: '金额',
                        fieldName: 'amount0',
                        style: {width: '100px'},
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}) {
                formData.amount = Math.floor((formData.amount0 * 100))
                await withTable.submitInsertOne({scopeThis, formData})
            }
        }
    },
    formData: {
        _id: null,
        id_business: null,
        amount: 0,
        amount0: 0,
        note: '',
        recorder_name: ly0session.user.name,
        recorder_cellphone: ly0session.user.cellphone,
    }
}
