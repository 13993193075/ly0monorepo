import { withTable } from '@yoooloo42/joker'

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
                        label: '序号',
                        fieldName: 'number',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis}){
                await withTable.submitInsertOne({scopeThis})
            }
        }
    },
    formData: {
        _id: null,
        number: '',
        name: '',
    }
}
