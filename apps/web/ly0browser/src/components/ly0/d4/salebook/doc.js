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
                        label: '房型',
                        fieldName: 'goods_name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'text',
                        label: '数量',
                        fieldName: 'count',
                        style: {width: '100px'},
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
