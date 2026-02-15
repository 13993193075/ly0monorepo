// 级联 商品
function id_goodsClear(scopeThis, branch){
    // 置空商品
    scopeThis.formDataBox[branch].fieldsValue.number = ""
    scopeThis.formDataBox[branch].fieldsValue.name = ""
    // 置空标价数组
    scopeThis.pageData.data.arrPrice = []
    // 置空标价
    scopeThis.formDataBox[branch].fieldsValue.price_name = ""
    scopeThis.formDataBox[branch].fieldsValue.price_yuan = 0
}
function id_goodsChanged(scopeThis, value, branch){
    let objGoods = scopeThis.pageData.data.arrGoods.find(i=>{
        return i._id === value
    })
    if(objGoods){
        // 重置商品
        scopeThis.formDataBox[branch].fieldsValue.number = objGoods.number
        scopeThis.formDataBox[branch].fieldsValue.name = objGoods.name
        // 重置标价数组
        scopeThis.pageData.data.arrPrice = objGoods.price ? objGoods.price : []
        // 重置标价
        scopeThis.formDataBox[branch].fieldsValue.price_name = scopeThis.pageData.data.arrPrice.length > 0 ? scopeThis.pageData.data.arrPrice[0].name : ""
        scopeThis.formDataBox[branch].fieldsValue.price_yuan  = scopeThis.pageData.data.arrPrice.length > 0 ? Math.floor(scopeThis.pageData.data.arrPrice[0].price) / 100 : 0
    }
}

// 级联：标价
function priceClear(scopeThis, branch){
    // 置空标价
    scopeThis.formDataBox[branch].fieldsValue.price_name = ""
    scopeThis.formDataBox[branch].fieldsValue.price_yuan = 0
}
function priceChanged(scopeThis, value, branch){
    let objPrice = scopeThis.pageData.data.arrPrice.find(i=>{
        return i.name === value
    })
    if(objPrice){
        // 重置标价
        scopeThis.formDataBox[branch].fieldsValue.price_name = objPrice.name ? objPrice.name : ""
        scopeThis.formDataBox[branch].fieldsValue.price_yuan = objPrice.price && objPrice.price > 0 ? Math.floor(objPrice.price) / 100 : 0
    }
}

export default{
    id_goodsClear,
    id_goodsChanged,
    priceClear,
    priceChanged
}
