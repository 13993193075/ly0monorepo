// 电子图表
import {GQuery} from '../../main/GQuery.js'

// 时段应收统计
async function echart (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    const id_dataunit = data.id_dataunit,
        id_hotel = data.id_hotel ? data.id_hotel : null

    const q = {id_dataunit}
    const q0 = JSON.parse(JSON.stringify(q))
    if (id_hotel) {
        q._id = id_hotel
        q0.id_hotel = id_hotel
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const resData = {
        hotel: result.data
    }
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'find',
        query: q0,
        showFields: [
            'id_hotel',
            'checkin',
            'amount',
            'amount_b_goods',
            'amount_b_goods0',
            'amount_b_goods1',
            'amount_bill',
            'deal',
        ]
    })
    resData.business = result.data
    return {code: 0, message: "",
        data: resData // 数据：hotel, business
    }
}

// 资源销售比对分析
// 销售态势分析
async function echart0 (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    const id_dataunit = data.id_dataunit,
        id_hotel = data.id_hotel ? data.id_hotel : null
    const q = {id_dataunit}
    const qHotel = JSON.parse(JSON.stringify(q))
    if (id_hotel) {
        q.id_hotel = id_hotel
        qHotel._id = id_hotel
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: qHotel
    })
    const resData = {
        hotel: result.data
    }
    result = await GQuery({
        tblName: 'ly0d4booktype',
        operator: 'find',
        query: q
    })
    resData.booktype = result.data
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: q
    })
    resData.goods = result.data
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'find',
        query: q,
        showFields: [
            '_id',
            'id_hotel',
            'id_booktype',
            'checkin',
            'checkout'
        ]
    })
    resData.business = result.data
    result = await GQuery({
        tblName: 'ly0d4salebook',
        operator: 'find',
        query: q,
        showFields: [
            'id_hotel',
            'id_business',
            'id_goods',
            'count'
        ]
    })
    resData.salebook = result.data
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'find',
        query: q,
        showFields: [
            'id_hotel',
            'id_goods'
        ]
    })
    resData.room = result.data

    return {code: 0, message: "",
        data: resData // 数据：hotel, booktype, goods, business, salebook, room
    }
}

export default {
    echart,
    echart0
}
