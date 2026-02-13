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
                        inputType: 'select',
                        label: '教材分类',
                        fieldName: 'id_class',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrClass
                        },
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '教材名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '文件上传',
                                items: [
                                    {
                                        inputType: 'upload',
                                        fieldName: 'url',
                                    },
                                ],
                            },
                        ],
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
