import handles from './handles.js'
export default {
    formData: {
        _id: null,
        url: '',
        accountname: '',
        password: '',
    },
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: '修改',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '接口请求地址',
                        fieldName: 'url',
                    },
                    {
                        inputType: 'input',
                        label: '账号',
                        fieldName: 'accountname',
                    },
                    {
                        inputType: 'input',
                        label: '账号密码',
                        fieldName: 'password',
                    },
                ],
            },
        ],
        submit: {
            handle: handles.updateOneSubmit
        }
    },
}
