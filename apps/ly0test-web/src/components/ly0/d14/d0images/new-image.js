export default {
    formData: {
        name: '',
        image: [],
    },
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: '影像资料 - 新增',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'upload-avatar',
                        label: '上传图片',
                        fieldName: 'image',
                        avatar: {
                            width: '200px',
                            height: '200px',
                        },
                    },
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
                await scopeThis.handles.newImage({scopeThis, formData})
            }
        },
    }
}
