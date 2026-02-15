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
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'upload',
                        label: '上传附件',
                        fieldName: 'appendix',
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
        note: '',
        appendix: [],
    }
}
