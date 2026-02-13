import {ly0withTable as withTable} from '@yoooloo42/ly0el'

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
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        _id: null,
        user: '',
        ukey: '',
        note: '',
    }
}
