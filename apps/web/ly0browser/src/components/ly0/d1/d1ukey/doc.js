export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "详细"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'text',
                        label: 'USER',
                        fieldName: 'user',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: 'UKEY',
                        fieldName: 'ukey',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'}
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
