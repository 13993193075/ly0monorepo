function hotelChange({scopeThis}){
    // 级联 - 预订类型
    scopeThis.pgData.data.arrBooktype0.splice(0, scopeThis.pgData.data.arrBooktype0.length,
        ...scopeThis.pgData.data.arrBooktype.filter(i => {
            return i.id_hotel === scopeThis.formData.id_hotel
        })
    )
}

function hotelChange0({scopeThis}){
    hotelChange({scopeThis})
    scopeThis.formData.id_booktype = null
}
export default {
    hotelChange,
    hotelChange0
}
