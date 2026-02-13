import dataRequest from "../../../../utils/data-request.js"

// 获取购物车信息
function getCart(scopeThis){
    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7.mall.cart.getCart",
        data: {id_guest: scopeThis.ly0session.user._id}
    }).then(result=>{
        if(result.code !== 0){
            return
        }

        scopeThis.business = result.business
        // 微信支付二维码初始参数
        scopeThis.qrcode.amount = Math.floor(scopeThis.business.objBusiness.amount) / 100
        scopeThis.qrcode.id_business = scopeThis.business.objBusiness._id
        scopeThis.qrcode.appid = result.wx_appid // 应用id
        scopeThis.qrcode.mchid = result.wx_mchid // 商户号id
    })
}

// 删除一条记录
function deleteOne(scopeThis, data){
    // data.id_bGoods

    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7mall.cart.deleteOne",
        data
    }).then(result=>{
        getCart(scopeThis)
        scopeThis.$message(result.message)
    })
}

// 修改数量
function setCount(scopeThis, data) {
    // data.id_bGoods
    // data.count

    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7mall.cart.setCount",
        data
    }).then(result=>{
        getCart(scopeThis)
        scopeThis.$message(result.message)
    })
}

export default {
    getCart,
    deleteOne,
    setCount
}
