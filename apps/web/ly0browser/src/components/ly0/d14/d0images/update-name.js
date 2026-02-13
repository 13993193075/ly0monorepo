export default {
    formData: {
        _id: null,
        name: '',
    },
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: '修改影像资料名称',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '影像资料名称',
                        fieldName: 'name',
                        style: {width: '300px'},
                    },
                ],
            },
        ],
        submit: {
            switch: true,
            async handle({scopeThis, formData}) {
                await scopeThis.handles.updateName({scopeThis, formData})
            }
        },
    }
}
