// 统计：房*天数资源
// 统计：房*天数销售

import {utils as ly0utils} from '@yoooloo42/ly0utils'
const dateFormat = ly0utils.dateFormat

// 房*天数资源 统计口径：旅店
function roomChannelHotel (para) {
    let id_hotel = para.id_hotel,
        dataRoom = para.dataRoom,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataRoom.forEach(i => {
        if (i.id_hotel === id_hotel) {
            roomsdays++
        }
    })
    roomsdays = roomsdays * dateFormat.days(dateFrom, dateTo)

    return roomsdays ? roomsdays : 0
}

// 房*天数资源 统计口径：房型
function roomChannelGoods (para) {
    let id_hotel = para.id_hotel,
        id_goods = para.id_goods,
        dataRoom = para.dataRoom,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataRoom.forEach(i => {
        if (i.id_hotel === id_hotel && i.id_goods === id_goods) {
            roomsdays++
        }
    })
    roomsdays = roomsdays * dateFormat.days(dateFrom, dateTo)

    return roomsdays ? roomsdays : 0
}

// 房*天数资源 统计口径：未明确的房型
function roomChannelGoodsUnknown (para) {
    let id_hotel = para.id_hotel,
        dataGoods = para.dataGoods,
        dataRoom = para.dataRoom,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataRoom.forEach((iRoom) => {
        if (iRoom.id_hotel === id_hotel) {
            let goodsExist = false
            for (let i = 0; i < dataGoods.length; i++) {
                if (iRoom.id_goods === dataGoods [i]._id) {
                    goodsExist = true
                    break
                }
            }
            if (!goodsExist) {
                roomsdays++
            }
        }
    })
    roomsdays = roomsdays * dateFormat.days(dateFrom, dateTo)

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：旅店
function saleChannelHotel (para) {
    let id_hotel = para.id_hotel,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let dateFrom0 = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                dateTo0 = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach(iSalebook => {
                if (iSalebook.id_business === iBusiness._id) {
                    roomsdays = roomsdays + iSalebook.count * dateFormat.days(dateFrom0, dateTo0)
                }
            })
        }
    })
    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：房型
function saleChannelGoods (para) {
    let id_hotel = para.id_hotel,
        id_goods = para.id_goods,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let dateFrom0 = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                dateTo0 = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach(iSalebook => {
                if (iSalebook.id_business === iBusiness._id && iSalebook.id_goods === id_goods) {
                    roomsdays = roomsdays + iSalebook.count * dateFormat.days(dateFrom0, dateTo0)
                }

            })
        }

    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：预订类型
function saleChannelBooktype (para) {
    let id_hotel = para.id_hotel,
        id_booktype = para.id_booktype,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel && iBusiness.id_booktype === id_booktype) {
            let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom
                ,
                dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach((iSalebook) => {
                if (iSalebook.id_business === iBusiness._id) {
                    roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                }
            })
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：房型，预订类型
function saleChannelGoodsBooktype (para) {
    let id_hotel = para.id_hotel,
        id_booktype = para.id_booktype,
        id_goods = para.id_goods,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel && iBusiness.id_booktype === id_booktype) {
            let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom
                ,
                dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach(iSalebook => {
                if (iSalebook.id_business === iBusiness._id && iSalebook.id_goods === id_goods) {
                    roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                }
            })
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：未明确的房型
function saleChannelGoodsUnknown (para) {
    let id_hotel = para.id_hotel,
        dataGoods = para.dataGoods,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach((iSalebook) => {
                if (iSalebook.id_business === iBusiness._id) {
                    let goodsExist = false
                    for (let i = 0; i < dataGoods.length; i++) {
                        if (iSalebook.id_goods === dataGoods [i]._id) {
                            goodsExist = true
                            break
                        }
                    }
                    if (!goodsExist) {
                        roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                    }
                }
            })
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：未明确的预订类型
function saleChannelBooktypeUnknown (para) {
    let id_hotel = para.id_hotel,
        dataBooktype = para.dataBooktype,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let booktypeExist = false
            for (let i = 0; i < dataBooktype.length; i++) {
                if (iBusiness.id_booktype === dataBooktype [i]._id) {
                    booktypeExist = true
                    break
                }
            }
            if (!booktypeExist) {
                let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom
                    ,
                    dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
                dataSalebook.forEach(iSalebook => {
                    if (iSalebook.id_business === iBusiness._id) {
                        roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                    }
                })
            }
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：房型，未明确的预订类型
function saleChannelGoodsBooktypeUnknown (para) {
    let id_hotel = para.id_hotel,
        id_goods = para.id_goods,
        dataBooktype = para.dataBooktype,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let booktypeExist = false
            for (let i = 0; i < dataBooktype.length; i++) {
                if (iBusiness.id_booktype === dataBooktype [i]._id) {
                    booktypeExist = true
                    break
                }
            }
            if (!booktypeExist) {
                let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                    dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
                dataSalebook.forEach((iSalebook) => {
                    if (iSalebook.id_business === iBusiness._id && iSalebook.id_goods === id_goods) {
                        roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                    }
                })
            }
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：未明确的房型，预订类型
function saleChannelGoodsUnknownBooktype (para) {
    let id_hotel = para.id_hotel,
        id_booktype = para.id_booktype,
        dataGoods = para.dataGoods,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel && iBusiness.id_booktype === id_booktype) {
            let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
            dataSalebook.forEach(iSalebook => {
                if (iSalebook.id_business === iBusiness._id) {
                    let goodsExist = false
                    for (let i = 0; i < dataGoods.length; i++) {
                        if (iSalebook.id_goods === dataGoods [i]._id) {
                            goodsExist = true
                            break
                        }
                    }
                    if (!goodsExist) {
                        roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                    }
                }
            })
        }
    })

    return roomsdays ? roomsdays : 0
}

// 房*天数销售 统计口径：未明确的房型，未明确的预订类型
function saleChannelGoodsUnknownBooktypeUnknown (para) {
    let id_hotel = para.id_hotel,
        dataBooktype = para.dataBooktype,
        dataGoods = para.dataGoods,
        dataBusiness = para.dataBusiness,
        dataSalebook = para.dataSalebook,
        dateFrom = para.dateFrom,
        dateTo = para.dateTo
    let roomsdays = 0

    dataBusiness.forEach(iBusiness => {
        if (iBusiness.id_hotel === id_hotel) {
            let booktypeExist = false
            for (let i = 0; i < dataBooktype.length; i++) {
                if (iBusiness.id_booktype === dataBooktype [i]._id) {
                    booktypeExist = true
                    break
                }

            }

            if (!booktypeExist) {
                let dFrom = iBusiness.checkin && new Date(iBusiness.checkin) > new Date(dateFrom) ? iBusiness.checkin : dateFrom,
                    dTo = iBusiness.checkout && new Date(iBusiness.checkout) < new Date(dateTo) ? iBusiness.checkout : dateTo
                dataSalebook.forEach(iSalebook => {
                    if (iSalebook.id_business === iBusiness._id) {
                        let goodsExist = false
                        for (let i = 0; i < dataGoods.length; i++) {
                            if (iSalebook.id_goods === dataGoods [i]._id) {
                                goodsExist = true
                                break
                            }
                        }
                        if (!goodsExist) {
                            roomsdays = roomsdays + iSalebook.count * dateFormat.days(dFrom, dTo)
                        }
                    }
                })
            }
        }
    })

    return roomsdays ? roomsdays : 0
}

export default {
    // 房*天数资源
    roomChannelHotel,
    roomChannelGoods,
    roomChannelGoodsUnknown,

    // 房*天数销售
    saleChannelHotel,
    saleChannelGoods,
    saleChannelBooktype,
    saleChannelGoodsBooktype,
    saleChannelGoodsUnknown,
    saleChannelBooktypeUnknown,
    saleChannelGoodsBooktypeUnknown,
    saleChannelGoodsUnknownBooktype,
    saleChannelGoodsUnknownBooktypeUnknown
}
