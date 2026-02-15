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
                        label: '备注',
                        fieldName: 'note',
                        style: {width: '400px'},
                    },
                    {
                        inputType: 'download',
                        label: '附件下载',
                        fieldName: 'appendix',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
