import {withTable} from '@yoooloo42/joker'
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
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({formData, scopeThis}){
                await withTable.submitFind({scopeThis})
            }
        },
    }
}
