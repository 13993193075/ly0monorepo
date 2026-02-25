import dataRequest from "../../../../utils/data-request.js"
function getFieldsValue(scopeThis){
    return {
        _id: scopeThis.business.objBusiness._id,
        deal: scopeThis.business.objBusiness.deal,
        deal0: Math.floor(scopeThis.business.objBusiness.deal) / 100,
        dealnote: scopeThis.business.objBusiness.dealnote,
    }
}

export default {
    formProps: {
        popup: {
            visible: false,
            title: "修改"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "expression",
                        label: "计费",
                        hdlExpression(scopeThis){
                            return Math.floor(scopeThis.business.objBusiness.amount) / 100
                        },
                        inputWidth: "150px"
                    },
                    {
                        inputType: "input",
                        label: "核收",
                        fieldName: "deal0",
                        inputWidth: "150px"
                    },
                    {
                        inputType: "input",
                        label: "备注",
                        fieldName: "dealnote",
                        inputWidth: "250px"
                    },
                ]
            }
        ]
    },
    dataBox: {
        fieldsValue: null,
        hdlSubmit(scopeThis){
            scopeThis.deal.dataBox.fieldsValue.deal = Math.floor(scopeThis.deal.dataBox.fieldsValue.deal0 * 100)
            dataRequest.storpro({
                scopeThis,
                storproName: "ly0d7.business.deal",
                data: scopeThis.deal.dataBox.fieldsValue
            }).then(()=>{
                scopeThis.$message("已修改")
                scopeThis.init().then(()=>{
                    scopeThis.forceRefresh.amount++ // 强制重载子组件
                    // 关闭 deal 窗口
                    scopeThis.deal.formProps.popup.visible = false
                })
            })
        }
    },
    getFieldsValue
}
