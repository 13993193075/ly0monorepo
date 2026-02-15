import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'
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
                await withTable.submitUpdateOne({scopeThis, formData})
            }
        }
    }
}
