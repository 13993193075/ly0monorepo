import { withTable } from '@yoooloo42/joker'

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
                await withTable.submitUpdateOne({scopeThis})
            }
        }
    }
}
