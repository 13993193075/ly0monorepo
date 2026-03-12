// 级联 商品
function id_goodsClear({scopeThis, formData}){
    // 置空商品
    formData.number = ""
    formData.name = ""
    // 置空标价数组
    scopeThis.pgData.data.arrPrice = []
    // 置空标价
    formData.price_name = ""
    formData.price_yuan = 0
}
function id_goodsChanged({scopeThis, formData, value}){
    let objGoods = scopeThis.pgData.data.arrGoods.find(i=>{
        return i._id === value
    })
    if(objGoods){
        // 重置商品
        formData.number = objGoods.number
        formData.name = objGoods.name
        // 重置标价数组
        scopeThis.pgData.data.arrPrice = objGoods.price ? objGoods.price : []
        // 重置标价
        formData.price_name = scopeThis.pgData.data.arrPrice.length > 0 ? scopeThis.pgData.data.arrPrice[0].name : ""
        formData.price_yuan = scopeThis.pgData.data.arrPrice.length > 0 ? Math.floor(scopeThis.pgData.data.arrPrice[0].price) / 100 : 0
    }
}

// 级联：标价
function priceClear({scopeThis, formData}){
    // 置空标价
    formData.price_name = ""
    formData.price_yuan = 0
}
function priceChanged({scopeThis, formData, value}){
    let objPrice = scopeThis.pgData.data.arrPrice.find(i=>{
        return i.name === value
    })
    if(objPrice){
        // 重置标价
        formData.price_name = objPrice.name || ""
        formData.price_yuan = objPrice.price && objPrice.price > 0 ? Math.floor(objPrice.price) / 100 : 0
    }
}

export default{
    id_goodsClear,
    id_goodsChanged,
    priceClear,
    priceChanged
}
