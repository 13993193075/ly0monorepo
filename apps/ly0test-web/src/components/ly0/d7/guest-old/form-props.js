function items(branch){
    return [
        {
            inputType: "input",
            label: "用户名称",
            fieldName: "name"
        },
        {
            inputType: "d3gbt2260",
            label: "国内行政区划",
            fieldName: "gbt2260code"
        },
        {
            inputType: "input",
            label: "详细地址",
            fieldName: "address",
            inputWidth: "300px"
        },
        {
            inputType: "input",
            label: "联系电话",
            fieldName: "tel"
        },
        {
            inputType: "d7postal",
            label: "更多邮寄地址",
            fieldName: "postal"
        }
    ]
}

function getFormProps(scopeThis){
    return {
        find: {
            popup: {
                visible: false,
                title: "查询"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "input",
                            label: "用户名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "d3gbt2260",
                            label: "国内行政区划",
                            fieldName: "gbt2260code"
                        },
                        {
                            inputType: "input",
                            label: "详细地址",
                            fieldName: "address",
                            inputWidth: "300px"
                        },
                        {
                            inputType: "input",
                            label: "联系电话",
                            fieldName: "tel"
                        }
                    ]
                }
            ]
        },
        insertOne: {
            popup: {
                visible: false,
                title: "新增"
            },
            cols: [{items: items("insertOne")}]
        },
        doc: {
            popup: {
                visible: false,
                title: "详细"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "text",
                            label: "用户名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "text",
                            label: "国内行政区划",
                            fieldName: "gbt2260text"
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
                            inputType: "d7postal",
                            label: "更多邮寄地址",
                            fieldName: "postal",
                            readOnly: true
                        }
                    ]
                }
            ]
        },
        updateOne: {
            popup: {
                visible: false,
                title: "修改"
            },
            cols: [{items: items("updateOne")}]
        }
    }
}

export default{
    getFormProps
}
