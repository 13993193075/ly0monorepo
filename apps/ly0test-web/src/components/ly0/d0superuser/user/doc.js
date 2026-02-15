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
                        label: "数据单元",
                        fieldName: "dataunit_name",
                        style: {width: '200px'},
                    },
                    {
                        inputType: "text",
                        label: "用户组",
                        fieldName: "group_name",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "expression",
                        label: "应用路由类型",
                        hdlExpression({formData, scopeThis}){
                            return formData.route_type === "1" ? "VUE 路由" : "URL"
                        },
                        style: {width: '200px'},
                    },
                    {
                        inputType: "text",
                        label: "用户名称",
                        fieldName: "name",
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "图标",
                                items: [
                                    {
                                        inputType: "image",
                                        fieldName: "icon",
                                        style: "width: 90px; height: 90px;",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
