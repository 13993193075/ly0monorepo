// 深拷贝
import deepcopy from "../../../../utils/deepcopy.js"

function getFormProps(scopeThis){
    let items = [
        {
            inputType: "input",
            label: "商店名称",
            fieldName: "name"
        },
        {
            inputType: "input",
            label: "小票机型号",
            fieldName: "smallticket"
        },
        {
            inputType: "switch",
            label: "商城代收",
            fieldName: "mall",
            activeText: "是",
            inactiveText: "否",
            activeValue: true,
            inactiveValue: false,
            activeColor: "#ee7405",
            disabled: true // 排他性处理
        },
        {
            inputType: "collapse",
            items: [
                {
                    title: "微信支付",
                    items: [
                        {
                            inputType: "input",
                            label: "APPID",
                            fieldName: "wx_appid",
                            inputWidth: "250px"
                        },
                        {
                            inputType: "input",
                            label: "MCHID",
                            fieldName: "wx_mchid",
                            inputWidth: "250px"
                        }
                    ]
                }
            ]
        }
    ]

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
                            label: "商店编号",
                            fieldName: "_id",
                        },
                        {
                            inputType: "input",
                            label: "商店名称",
                            fieldName: "name",
                        },
                        {
                            inputType: "select",
                            label: "商城代收",
                            fieldName: "mall",
                            item_fieldLabel: "text",
                            item_fieldValue: "code",
                            items: [
                                {code: null, text: "不查询"},
                                {code: true, text: "是"},
                                {code: false, text: "否"}
                            ]
                        },
                    ]
                }
            ]
        },
        insertOne: {
            popup: {
                visible: false,
                title: "新增"
            },
            cols: [{items}]
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
                            label: "商店编号",
                            fieldName: "_id"
                        },
                        {
                            inputType: "text",
                            label: "商店名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "text",
                            label: "小票机型号",
                            fieldName: "smallticket"
                        },
                        {
                            inputType: "expression",
                            label: "商城代收",
                            hdlExpression(ly0externalShell, fieldsValue){
                                return "mall" in fieldsValue && (fieldsValue.mall === true || fieldsValue.mall ==="true") ? "是" : "否"
                            },
                            inputWidth: "150px"
                        },
                        {
                            inputType: "collapse",
                            items: [
                                {
                                    title: "微信支付",
                                    items: [
                                        {
                                            inputType: "text",
                                            label: "APPID",
                                            fieldName: "wx_appid",
                                            inputWidth: "250px"
                                        },
                                        {
                                            inputType: "text",
                                            label: "MCHID",
                                            fieldName: "wx_mchid",
                                            inputWidth: "250px"
                                        }
                                    ]
                                }
                            ]
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
