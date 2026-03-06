export default {
    // 支付状态
    paymentStatus: [
        {code: "0", text: "未支付"},
        {code: "1", text: "支付中"},
        {code: "2", text: "支付成功"},
        {code: "3", text: "支付失败"},
        {code: "4", text: "已退款"}
    ],
    // 用户自主支付方式
    paymentMethod: [
        {code: "0", text: "现金"},
        {code: "wxzf", text: "微信"},
        {code: "zfb", text: "支付宝"}
    ],
    // 系统内置支付流程
    paymentProcess: [
        {code: "0", text: "系统外流转"},
        {code: "wxzf0", text: "微信支付.客户付款码付款"},
        {code: "wxzf1", text: "微信支付.客户微信号付款"},
        {code: "wxzf2", text: "微信支付.商户二维码收款"}
    ],
    // 订单类型
    businessType: [
        {code: "ly0d0annual", text: "系统年费"},
        {code: "ly0d4business", text: "旅店客房收入"},
        {code: "ly0d5business", text: "餐馆收入"},
        {code: "ly0d7business", text: "商店收入"},
        {code: "ly0d9business", text: "物业服务收入及资源性代收"},
        {code: "ly0d10business", text: "工单收入"},
        {code: "ly0d11carpassin", text: "停车场收入.临时停车"},
        {code: "ly0d11carwithin_rec", text: "停车场收入.长期停车"}
    ]
}








