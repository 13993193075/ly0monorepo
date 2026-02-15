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
                await withTable.submitUpdateOne({scopeThis})
            }
        }
    }
}
