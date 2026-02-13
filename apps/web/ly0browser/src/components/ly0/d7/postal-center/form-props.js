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
                            label: "商品编号",
                            fieldName: "number"
                        },
                        {
                            inputType: "input",
                            label: "商品名称",
                            fieldName: "name"
                        },
                        {
                            inputType: "input",
                            label: "订单id",
                            fieldName: "id_business"
                        },
                        {
                            inputType: "select",
                            label: "邮寄状态",
                            fieldName: "postal_status_code",
                            item_fieldLabel: "text",
                            item_fieldValue: "code",
                            hdlGetItems(scopeThis){
                                return scopeThis.pageData.data.codePostalStatus
                            }
                        },
                        {
                            inputType: "date-picker",
                            label: "邮寄开始时间 起",
                            fieldName: "postal_time_start"
                        },
                        {
                            inputType: "date-picker",
                            label: "止",
                            fieldName: "postal_time_end"
                        },
                        {
                            inputType: "date-picker",
                            label: "分拣完成时间 起",
                            fieldName: "postal_sorted_time_start"
                        },
                        {
                            inputType: "date-picker",
                            label: "止",
                            fieldName: "postal_sorted_time_end"
                        },
                        {
                            inputType: "date-picker",
                            label: "收货时间 起",
                            fieldName: "postal_received_time_start"
                        },
                        {
                            inputType: "date-picker",
                            label: "止",
                            fieldName: "postal_received_time_end"
                        },
                        {
                            inputType: "d3gbt2260",
                            label: "邮寄地址行政区划",
                            fieldName: "postal_gbt2260code"
                        },
                        {
                            inputType: "input",
                            label: "收货联系电话",
                            fieldName: "postal_tel"
                        },
                        {
                            inputType: "input",
                            label: "收货联系人",
                            fieldName: "postal_name"
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
