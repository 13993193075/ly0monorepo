function hotelChange({scopeThis}){
    // 级联 - 客房分区
    scopeThis.pgData.data.arrRoomplace0.splice(0, scopeThis.pgData.data.arrRoomplace0.length,
        ...scopeThis.pgData.data.arrRoomplace.filter(i => {
            return i.id_hotel === scopeThis.formData.id_hotel
        })
    )
    // 级联 - 房型
    scopeThis.pgData.data.arrGoods0.splice(0, scopeThis.pgData.data.arrGoods0.length,
        ...scopeThis.pgData.data.arrGoods.filter(i => {
            return i.id_hotel === scopeThis.formData.id_hotel
        })
    )
}

function hotelChange0({scopeThis}){
    hotelChange({scopeThis})
    scopeThis.formData.id_roomplace = null
    scopeThis.formData.id_goods = null
}
export default {
    hotelChange,
    hotelChange0
}
