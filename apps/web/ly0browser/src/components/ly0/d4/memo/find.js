import {ly0withTable as withTable} from '@yoooloo42/ly0el'
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
                        label: '备忘',
                        fieldName: 'memo',
                        style: {width: '600px'},
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
