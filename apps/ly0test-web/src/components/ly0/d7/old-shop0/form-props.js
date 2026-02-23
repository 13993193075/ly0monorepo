function getFormProps(scopeThis){
    return {
        updateOne: {
            popup: {
                visible: false,
                title: "修改"
            },
            cols: [
                {
                    items: [
                        {
                            inputType: "input",
                            label: "商店名称",
                            fieldName: "name"
                        }
                    ]
                }
            ]
        }
    }
}

export default{
    getFormProps
}
