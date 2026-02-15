import {utils as ly0utils} from '@yoooloo42/ly0utils'
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
                        label: "数据单元id",
                        fieldName: "id_dataunit",
                        style: {width: "300px"}
                    },
                    {
                        inputType: "text",
                        label: "数据单元名称",
                        fieldName: "dataunit_name",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "text",
                        label: "订单id",
                        fieldName: "id_business",
                        style: {width: "300px"}
                    },
                    {
                        inputType: "text",
                        label: "订单类型",
                        fieldName: "businesstype_text",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "expression",
                        label: "金额",
                        hdlExpression({scopeThis, formData}){
                            return Math.floor(formData.amount) / 100
                        },
                        style: {width: "100px"}
                    },
                    {
                        inputType: "text",
                        label: "系统内置支付流程",
                        fieldName: "process_text",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "text",
                        label: "用户自主支付方式",
                        fieldName: "method_text",
                        style: {width: "200px"}
                    },
                    {
                        inputType: 'text',
                        label: '支付状态',
                        fieldName: "status_text",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "expression",
                        label: "支付发起时间",
                        hdlExpression({scopeThis, formData}){
                            return ly0utils.dateFormat.dateFormat(formData.time)
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "expression",
                        label: "支付结束时间",
                        hdlExpression({scopeThis, formData}){
                            return ly0utils.dateFormat.dateFormat(formData.end)
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "text",
                        label: "备注",
                        fieldName: "note",
                        style: {width: "400px"}
                    },
                    {
                        inputType: "text",
                        label: "记录",
                        fieldName: "rec",
                        style: {width: "200px"}
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "微信支付",
                                items: [
                                    {
                                        inputType: "text",
                                        label: "应用ID(appid)",
                                        fieldName: "wxzf_appid",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "商户号(mchid)",
                                        fieldName: "wxzf_mchid",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "code_url",
                                        fieldName: "wxzf_code_url",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "商品描述",
                                        fieldName: "wxzf_description",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "商户系统内部订单号",
                                        fieldName: "wxzf_out_trade_no",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "交易结束时间/订单失效时间",
                                        fieldName: "wxzf_time_expire",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "附加数据",
                                        fieldName: "wxzf_attach",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "通知地址",
                                        fieldName: "wxzf_notify_url",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "支付者openid",
                                        fieldName: "wxzf_payer_openid",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "金额",
                                        fieldName: "wxzf_amount_total",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "场景信息-设备号",
                                        fieldName: "wxzf_scene_info_device_id",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "预支付交易会话标识",
                                        fieldName: "wxzf_prepay_id",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "微信支付订单号",
                                        fieldName: "wxzf_transaction_id",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "交易类型",
                                        fieldName: "wxzf_trade_type",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "交易状态",
                                        fieldName: "wxzf_trade_state",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "交易状态描述",
                                        fieldName: "wxzf_trade_state_desc",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "付款银行",
                                        fieldName: "wxzf_bank_type",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "支付完成时间",
                                        fieldName: "wxzf_success_time",
                                        style: {width: "200px"}
                                    },
                                    {
                                        inputType: "text",
                                        label: "查询金额",
                                        fieldName: "wxzf_amount_payer_total",
                                        style: {width: "200px"}
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
