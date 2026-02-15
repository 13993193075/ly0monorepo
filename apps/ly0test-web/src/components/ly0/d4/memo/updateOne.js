import {withTable} from '@yoooloo42/ly0el'
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
                        label: '备忘',
                        fieldName: 'memo',
                        style: {width: '600px'},
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
