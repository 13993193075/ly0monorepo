import {ly0withTable as withTable} from '@yoooloo42/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
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
                        style: "width: 200px;"
                    },
                    {
                        inputType: "date-picker",
                        label: "起始日期",
                        fieldName: "from",
                        type: "date",
                        style: "width: 200px;"
                    },
                    {
                        inputType: "date-picker",
                        label: "截止日期",
                        fieldName: "to",
                        type: "date",
                        style: "width: 200px;"
                    },
                    {
                        inputType: "input",
                        label: "年费金额",
                        fieldName: "fee0",
                        style: "width: 100px;"
                    },
                    {
                        inputType: "select",
                        label: "支付状态",
                        fieldName: "status_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrPaymentStatus
                        },
                        style: "width: 200px;"
                    }
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}){
                formData.fee = Math.floor(formData.fee0 * 100)
                await withTable.submitUpdateOne({scopeThis})
            }
        }
    }
}
