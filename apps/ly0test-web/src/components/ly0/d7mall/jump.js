// 返回商城首页
function goHome({scopeThis}){
    let route_branch = "*"
    if(scopeThis.ly0session && scopeThis.ly0session.mall){
        route_branch = scopeThis.ly0session.mall.branch.switch
    }
    window.open(scopeThis.routerInstance.resolve({path: "/mall/" + route_branch}).href)
}

// 打开商品详细信息
function toGoods({scopeThis, id_goods}){
    window.open(scopeThis.routerInstance.resolve({path: '/mall-goods/'}).href + id_goods)
}

// 打开购物车
function toCart ({scopeThis}) {
    if(
        !scopeThis.ly0session ||
        !scopeThis.ly0session.session ||
        !scopeThis.ly0session.session.id_user ||
        !scopeThis.ly0session.session.usertbl ||
        scopeThis.ly0session.session.usertbl !== "ly0d7guest"
        || !scopeThis.ly0session.user
    ){
        scopeThis.ElMessage("未登录，不能使用购物车")
        return
    }
    window.open(scopeThis.routerInstance.resolve({path: '/mall-cart'}).href)
}

// 打开订单记录
function toRecord ({scopeThis}) {
    if(
        !scopeThis.ly0session ||
        !scopeThis.ly0session.session ||
        !scopeThis.ly0session.session.id_user ||
        !scopeThis.ly0session.session.usertbl ||
        scopeThis.ly0session.session.usertbl !== "ly0d7guest"
        || !scopeThis.ly0session.user
    ){
        scopeThis.ElMessage("未登录，不能打开订单记录")
        return
    }
    window.open(scopeThis.routerInstance.resolve({path: '/mall-record'}).href)
}

// 加入购物车
async function cartAddOne ({scopeThis, id_goods}) {
    if(
        !scopeThis.ly0session ||
        !scopeThis.ly0session.session ||
        !scopeThis.ly0session.session.id_user ||
        !scopeThis.ly0session.session.usertbl ||
        scopeThis.ly0session.session.usertbl !== "ly0d7guest" ||
        !scopeThis.ly0session.user
    ){
        scopeThis.ElMessage("未登录，不能使用购物车")
        return
    }
    await scopeThis.ly0request.ly0.storpro({
        storproName: "ly0d7mall.cart.addOne",
        data: {
            id_goods,
            id_guest: scopeThis.ly0session.user._id
        }
    })
    scopeThis.ElMessage("1件商品已加入购物车")
}

export default {
    goHome,
    toGoods,
    toCart,
    toRecord,
    cartAddOne
}