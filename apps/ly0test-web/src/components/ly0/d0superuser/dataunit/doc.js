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
                        label: "数据单元_id",
                        fieldName: "_id",
                        style: {
                            width: '300px'
                        }
                    },
                    {
                        inputType: "text",
                        label: "数据单元名称",
                        fieldName: "name",
                        style: {
                            width: '200px'
                        }
                    },
                    {
                        inputType: "expression",
                        label: "系统关闭",
                        hdlExpression({formData, scopeThis}){
                            return formData.systemoff ? "是" : "否"
                        },
                        style: {
                            width: '100px'
                        }
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
