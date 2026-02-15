// 深拷贝
import deepcopy from "../../../../utils/deepcopy.js"

function getFormProps(scopeThis){
    let items = [
        {
            inputType: "input",
            label: "商品分类名称",
            fieldName: "name"
        }
    ]

    return {
        find: {
            popup: {
                visible: false,
                title: "查询"
            },
            cols: [{items: deepcopy.deepcopy(items)}]
        },
        insertOne: {
            popup: {
                visible: false,
                title: "新增"
            },
            cols: [{items: deepcopy.deepcopy(items)}]
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
                            label: "商品分类名称",
                            fieldName: "name"
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
            cols: [{items: deepcopy.deepcopy(items)}]
        }
    }
}

export default{
    getFormProps
}
