import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "查询"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "select",
                        label: "数据单元",
                        fieldName: "id_dataunit",
                        item_fieldLabel: "name",
                        item_fieldValue: "_id",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrDataunit
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "input",
                        label: "订单id",
                        fieldName: "id_business",
                        style: {width: "300px"}
                    },
                    {
                        inputType: "select",
                        label: "订单类型",
                        fieldName: "businesstype_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrBusinessType
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "select",
                        label: "系统内置支付流程",
                        fieldName: "process_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrProcess
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "select",
                        label: "用户自主支付方式",
                        fieldName: "method_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrMethod
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "select",
                        label: "支付状态",
                        fieldName: "status_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrStatus
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "date-picker",
                        label: "支付发起时间 起",
                        fieldName: "time_start",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "date-picker",
                        label: "止",
                        fieldName: "time_end",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "input",
                        label: "备注",
                        fieldName: "note",
                        style: {width: "400px"}
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
