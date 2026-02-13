// 深拷贝
import deepcopy from "../../../../utils/deepcopy.js"

function getFormProps(scopeThis){
    let items = [
        {
            inputType: "select",
            label: "商店",
            fieldName: "id_shop",
            item_fieldLabel: "name",
            item_fieldValue: "_id",
            hdlGetItems(scopeThis){
                return scopeThis.pageData.data.arrShop
            },
            hdlVisible(scopeThis){
                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
            }
        },
        {
            inputType: "select",
            label: "订单状态",
            fieldName: "status_code",
            item_fieldLabel: "text",
            item_fieldValue: "code",
            hdlGetItems(scopeThis){
                return scopeThis.pageData.data.arrBusinessStatus
            }
        },
        {
            inputType: "date-picker",
            label: "交易时间",
            fieldName: "time",
            type: "datetime"
        },
        {
            inputType: "input",
            label: "客户手机号",
            fieldName: "client_cellphone"
        },
        {
            inputType: "input",
            label: "客户名称",
            fieldName: "client_name"
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
                            label: "订单编号",
                            fieldName: "_id"
                        },
                        {
                            inputType: "select",
                            label: "商店",
                            fieldName: "id_shop",
                            item_fieldLabel: "name",
                            item_fieldValue: "_id",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.arrShop
                            },
                            hdlVisible(scopeThis){
                                return scopeThis.pageData.data.arrShop.length > 1 // 只有一个商店时不显示
                            }
                        },
                        {
                            inputType: "select",
                            label: "订单状态",
                            fieldName: "status_code",
                            item_fieldLabel: "text",
                            item_fieldValue: "code",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.arrBusinessStatus
                            }
                        },
                        {
                            inputType: "date-picker",
                            label: "交易时间 起",
                            fieldName: "time_start",
                            type: "datetime"
                        },
                        {
                            inputType: "date-picker",
                            label: "止",
                            fieldName: "time_end",
                            type: "datetime"
                        },
                        {
                            inputType: "input",
                            label: "客户手机号",
                            fieldName: "client_cellphone"
                        },
                        {
                            inputType: "input",
                            label: "客户名称",
                            fieldName: "client_name"
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
            cols: [{items}]
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
