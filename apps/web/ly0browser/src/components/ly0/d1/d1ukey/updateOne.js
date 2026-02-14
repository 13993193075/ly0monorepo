import {ly0withTable as withTable} from 'packages/ly0el'
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
                        label: 'USER',
                        fieldName: 'user',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'input',
                        label: 'UKEY',
                        fieldName: 'ukey',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'input',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'}
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
