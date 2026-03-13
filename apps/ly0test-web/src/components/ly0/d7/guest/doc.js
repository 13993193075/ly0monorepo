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
                        label: '用户名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: "ly0gbt2260",
                        label: "国内行政区划",
                        fieldName: "gbt2260code",
                        readOnly: true,
                    },
                    {
                        inputType: "text",
                        label: "详细地址",
                        fieldName: "address"
                    },
                    {
                        inputType: "text",
                        label: "联系电话",
                        fieldName: "tel"
                    },
                    {
                        inputType: "ly0d7postal",
                        label: "更多邮寄地址",
                        fieldName: "postal",
                        readOnly: true
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
