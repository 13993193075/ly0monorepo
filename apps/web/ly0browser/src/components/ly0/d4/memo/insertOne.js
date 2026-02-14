import {ly0withTable as withTable} from 'packages/ly0el'
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
                        label: '备忘',
                        fieldName: 'memo',
                        style: {width: '600px'},
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
        id_business: null,
        memo: '',
    }
}
