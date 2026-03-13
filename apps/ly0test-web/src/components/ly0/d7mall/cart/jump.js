import dataRequest from "../../../../utils/data-request.js"

// 加入购物车
function cartAddOne (scopeThis, id_goods) {
    if(
        !scopeThis.ly0session ||
        !scopeThis.ly0session.session ||
        !scopeThis.ly0session.session.id_user ||
        !scopeThis.ly0session.session.usertbl ||
        scopeThis.ly0session.session.usertbl !== "ly0d7guest" ||
        !scopeThis.ly0session.user
    ){
        scopeThis.$message("未登录，不能使用购物车")
        return
    }
    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7mall.cart.addOne",
        data: {
            id_goods,
            id_guest: scopeThis.ly0session.user._id
        }
    }).then(()=>{
        scopeThis.$message("1件商品已加入购物车")
    })
}

export default {
    cartAddOne
}