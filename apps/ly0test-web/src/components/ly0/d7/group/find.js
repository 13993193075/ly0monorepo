import {withTable} from '@yoooloo42/ly0el'
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
                        label: '商品分类名称',
                        fieldName: 'name',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
