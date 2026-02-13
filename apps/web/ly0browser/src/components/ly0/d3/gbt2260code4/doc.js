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
                        inputType: "text",
                        label: "省级编码",
                        fieldName: "code2",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "text",
                        label: "省级区划名称",
                        fieldName: "text2",
                        style: {width: '400px'}
                    },
                    {
                        inputType: "text",
                        label: "市级编码",
                        fieldName: "code4",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "text",
                        label: "市级区划名称",
                        fieldName: "text4",
                        style: {width: '400px'}
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
