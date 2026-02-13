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
                        label: '备注',
                        fieldName: 'note',
                        style: 'width: 400px',
                    },
                    {
                        inputType: 'select',
                        label: '用于本站微信登录',
                        fieldName: 'with_thiswebsite_login',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        items: [
                            { code: '', text: '不查询' },
                            { code: 'true', text: '是' },
                            { code: 'false', text: '否' },
                        ],
                        style: 'width: 200px',
                    },
                    {
                        inputType: 'select',
                        label: '用于系统年费',
                        fieldName: 'with_annual',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        items: [
                            { code: '', text: '不查询' },
                            { code: 'true', text: '是' },
                            { code: 'false', text: '否' },
                        ],
                        style: 'width: 200px',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
