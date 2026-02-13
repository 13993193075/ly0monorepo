import roomsdays from '../echart0/hdl-roomsdays'

//数据渲染
function dataShow({scopeThis}) {
    let countMax = 0
    scopeThis.data.hotel.forEach(itemHotel => {
        scopeThis.arrDate.forEach((itemDate, indexDate) => {
            let countSale = roomsdays.saleChannelHotel({
                    id_hotel: itemHotel._id,
                    dataBusiness: scopeThis.data.business,
                    dataSalebook: scopeThis.data.salebook,
                    dateFrom: itemDate.dateFrom,
                    dateTo: itemDate.dateTo,
                }),
                countSaleUnknown = roomsdays.saleChannelGoodsUnknownBooktypeUnknown({
                    id_hotel: itemHotel._id,
                    dataBooktype: scopeThis.data.booktype,
                    dataGoods: scopeThis.data.goods,
                    dataBusiness: scopeThis.data.business,
                    dataSalebook: scopeThis.data.salebook,
                    dateFrom: itemDate.dateFrom,
                    dateTo: itemDate.dateTo,
                }),
                countSaleUnknown0 = roomsdays.saleChannelBooktypeUnknown({
                    id_hotel: itemHotel._id,
                    dataBooktype: scopeThis.data.booktype,
                    dataBusiness: scopeThis.data.business,
                    dataSalebook: scopeThis.data.salebook,
                    dateFrom: itemDate.dateFrom,
                    dateTo: itemDate.dateTo,
                })
            countMax = Math.max(countMax, countSale)

            scopeThis.dataShow.push({
                idx: 'hotel-date',
                itemHotel,
                itemDate,
                indexDate,
                countMax,
                countSale,
                countSale_percent: countMax === 0 ? 0 : Math.floor((countSale / countMax) * 100),
                countSaleUnknown,
                countSaleUnknown_percent:
                    countMax === 0 ? 0 : Math.floor((countSaleUnknown / countMax) * 100),
                countSaleUnknown0,
                countSaleUnknown0_percent:
                    countMax === 0 ? 0 : Math.floor((countSaleUnknown0 / countMax) * 100),
            })

            scopeThis.data.booktype.forEach(itemBooktype => {
                let countSale = roomsdays.saleChannelBooktype({
                        id_hotel: itemHotel._id,
                        id_booktype: itemBooktype._id,
                        dataBusiness: scopeThis.data.business,
                        dataSalebook: scopeThis.data.salebook,
                        dateFrom: itemDate.dateFrom,
                        dateTo: itemDate.dateTo,
                    }),
                    countSaleUnknown = roomsdays.saleChannelGoodsUnknownBooktype({
                        id_hotel: itemHotel._id,
                        id_booktype: itemBooktype._id,
                        dataGoods: scopeThis.data.goods,
                        dataBusiness: scopeThis.data.business,
                        dataSalebook: scopeThis.data.salebook,
                        dateFrom: itemDate.dateFrom,
                        dateTo: itemDate.dateTo,
                    })

                scopeThis.dataShow.push({
                    idx: 'hotel-date-booktype',
                    itemHotel,
                    itemDate,
                    indexDate,
                    itemBooktype,
                    countSale,
                    countSale_percent: countMax === 0 ? 0 : Math.floor((countSale / countMax) * 100),
                    countSaleUnknown,
                    countSaleUnknown_percent:
                        countMax === 0 ? 0 : Math.floor((countSaleUnknown / countMax) * 100),
                })

                scopeThis.data.goods.forEach(itemGoods => {
                    let countSale = roomsdays.saleChannelGoodsBooktype({
                        id_hotel: itemHotel._id,
                        id_goods: itemGoods._id,
                        id_booktype: itemBooktype._id,
                        dataBusiness: scopeThis.data.business,
                        dataSalebook: scopeThis.data.salebook,
                        dateFrom: itemDate.dateFrom,
                        dateTo: itemDate.dateTo,
                    })

                    scopeThis.dataShow.push({
                        idx: 'hotel-date-goods-booktype',
                        itemHotel,
                        itemDate,
                        indexDate,
                        itemGoods,
                        itemBooktype,
                        countSale,
                        countSale_percent: countMax === 0 ? 0 : Math.floor((countSale / countMax) * 100),
                    })
                })
            })

            scopeThis.data.goods.forEach(itemGoods => {
                let countSaleUnknown = roomsdays.saleChannelGoodsBooktypeUnknown({
                    id_hotel: itemHotel._id,
                    id_goods: itemGoods._id,
                    dataBooktype: scopeThis.data.booktype,
                    dataBusiness: scopeThis.data.business,
                    dataSalebook: scopeThis.data.salebook,
                    dateFrom: itemDate.dateFrom,
                    dateTo: itemDate.dateTo,
                })

                scopeThis.dataShow.push({
                    idx: 'hotel-date-goods',
                    itemHotel,
                    itemDate,
                    indexDate,
                    itemGoods,
                    countSaleUnknown,
                    countSaleUnknown_percent:
                        countMax === 0 ? 0 : Math.floor((countSaleUnknown / countMax) * 100),
                })
            })
        })
    })
}

// 数据条目
function dataItem(para) {
    let dataShow = para.dataShow,
        idx = para.idx,
        itemHotel = para.itemHotel,
        itemDate = para.itemDate,
        indexDate = para.indexDate,
        itemGoods = para.itemGoods ? para.itemGoods : null,
        itemBooktype = para.itemBooktype ? para.itemBooktype : null

    for (let i = 0; i < dataShow.length; i++) {
        if (
            idx === 'hotel-date' &&
            dataShow[i].idx === idx &&
            dataShow[i].itemHotel._id === itemHotel._id &&
            dataShow[i].indexDate === indexDate
        ) {
            return dataShow[i]
        }

        if (
            idx === 'hotel-date-booktype' &&
            dataShow[i].idx === idx &&
            dataShow[i].itemHotel._id === itemHotel._id &&
            dataShow[i].indexDate === indexDate &&
            dataShow[i].itemBooktype._id === itemBooktype._id
        ) {
            return dataShow[i]
        }

        if (
            idx === 'hotel-date-goods-booktype' &&
            dataShow[i].idx === idx &&
            dataShow[i].itemHotel._id === itemHotel._id &&
            dataShow[i].indexDate === indexDate &&
            dataShow[i].itemGoods._id === itemGoods._id &&
            dataShow[i].itemBooktype._id === itemBooktype._id
        ) {
            return dataShow[i]
        }

        if (
            idx === 'hotel-date-goods' &&
            dataShow[i].idx === idx &&
            dataShow[i].itemHotel._id === itemHotel._id &&
            dataShow[i].indexDate === indexDate &&
            dataShow[i].itemGoods._id === itemGoods._id
        ) {
            return dataShow[i]
        }
    }

    return {
        countMax: 0,
        countSale: 0,
        countSale_percent: 0,
        countSaleUnknown: 0,
        countSaleUnknown_percent: 0,
        countSaleUnknown0: 0,
        countSaleUnknown0_percent: 0,
    }
}

export default {
    dataShow,
    dataItem,
}
