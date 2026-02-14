import { ly0withTable as withTable } from 'packages/ly0el'
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
                        label: '房号',
                        fieldName: 'roomno',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
