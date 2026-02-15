function setArrRoom0({scopeThis, formData}) {
    scopeThis.pgData.data.arrRoom0 = scopeThis.pgData.data.arrRoom.filter(i=>{
        if(!!formData.id_roomplace && !!formData.id_goods){
            return i.id_roomplace === formData.id_roomplace && i.id_goods === formData.id_goods
        }else if(!!formData.id_roomplace){
            return i.id_roomplace === formData.id_roomplace
        }else if(!!formData.id_goods){
            return i.id_goods === formData.id_goods
        }else{
            return true
        }
    })
}

function setArrPrice0({scopeThis, formData}) {
    scopeThis.pgData.data.arrPrice0 = scopeThis.pgData.data.arrPrice.filter(i=>{
        if(!!formData.id_goods){
            return i.id_goods === formData.id_goods
        }else{
            return true
        }
    })
}

function id_roomplaceChanged({scopeThis, formData, value}) {
    setArrRoom0({scopeThis, formData})
    formData.id_room = null
}

function id_goodsChanged({scopeThis, formData, value}) {
    setArrRoom0({scopeThis, formData})
    setArrPrice0({scopeThis, formData})
    formData.id_room = null
    if(scopeThis.pgData.data.arrPrice0.length > 0){
        formData.id_price = scopeThis.pgData.data.arrPrice0[0]._id
        formData.price_name = scopeThis.pgData.data.arrPrice0[0].name
        formData.method_code = scopeThis.pgData.data.arrPrice0[0].method_code
        formData.price0 = Math.floor(scopeThis.pgData.data.arrPrice0[0].price) / 100
    }else{
        formData.id_price = null
        formData.price_name = ''
        formData.method_code = ''
        formData.price0 = 0
    }
}

function id_roomChanged({scopeThis, formData, value}) {
    const objRoom = scopeThis.pgData.data.arrRoom0.find(i=>{
        return i._id === value
    })
    formData.id_roomplace = objRoom && objRoom.id_roomplace ? objRoom.id_roomplace : null
    formData.id_goods = objRoom && objRoom.id_goods ? objRoom.id_goods : null
    setArrRoom0({scopeThis, formData})
    setArrPrice0({scopeThis, formData})
    if(scopeThis.pgData.data.arrPrice0.length > 0){
        formData.id_price = scopeThis.pgData.data.arrPrice0[0]._id
        formData.price_name = scopeThis.pgData.data.arrPrice0[0].name
        formData.method_code = scopeThis.pgData.data.arrPrice0[0].method_code
        formData.price0 = Math.floor(scopeThis.pgData.data.arrPrice0[0].price) / 100
    }else{
        formData.id_price = null
        formData.price_name = ''
        formData.method_code = ''
        formData.price0 = 0
    }
}

function id_priceChanged({scopeThis, formData, value}) {
    const objPrice = scopeThis.pgData.data.arrPrice0.find(i=>{
        return i._id === value
    })
    if(!!objPrice){
        formData.price_name = objPrice.name
        formData.method_code = objPrice.method_code
        formData.price0 = Math.floor(objPrice.price) / 100
    }else{
        formData.price_name = ''
        formData.method_code = ''
        formData.price0 = 0
    }
}

export default {
    setArrRoom0,
    setArrPrice0,
    id_roomplaceChanged,
    id_goodsChanged,
    id_roomChanged,
    id_priceChanged
}
