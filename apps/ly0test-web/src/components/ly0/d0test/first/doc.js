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
                        label: "名称",
                        fieldName: "name",
                        style: {
                            width: '300px'
                        }
                    },
                    {
                        inputType: "expression",
                        label: "路由类型",
                        hdlExpression({formData, scopeThis}) {
                            if(formData.route_type === '0'){
                                return 'URL'
                            }else if(formData.route_type === '1'){
                                return 'VUE路由'
                            }else{
                                return '其它'
                            }
                        },
                        style: {
                            width: '200px'
                        }
                    },
                    {
                        inputType: "text",
                        label: "路由",
                        fieldName: "route",
                        style: {
                            width: '400px'
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
