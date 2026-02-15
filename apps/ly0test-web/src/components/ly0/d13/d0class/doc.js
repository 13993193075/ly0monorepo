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
                        label: '序号',
                        fieldName: 'number',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'text',
                        label: '名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
