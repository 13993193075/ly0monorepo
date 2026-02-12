import {GQuery} from '../../main/GQuery.js'

// 获取页面数据
async function getPgData (data) {
    // data.id_dataunit
    // data.id_hotel

    const q = {id_dataunit: data.id_dataunit}
    const q0 = JSON.parse(JSON.stringify(q)),
        q1 = JSON.parse(JSON.stringify(q)),
        q2 = JSON.parse(JSON.stringify(q))
    if (data.id_hotel) {
        q._id = data.id_hotel
        q0.id_hotel = data.id_hotel
        q1.id_hotel = data.id_hotel
        q2.id_hotel = data.id_hotel
    }
    q1.status_code = '0'

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const arrHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'find',
        query: q1
    })
    const arrBusiness = result.data,
        arrBusinessId = []
    arrBusiness.forEach(i => {
        arrBusinessId.push(i._id)
    })
    q2.id_business = {$in: arrBusinessId}
    result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'find',
        query: q2,
        populate: ['id_hotel', 'id_business', 'id_room'] // mongoose
    })
    const arrBGoods = result.data
    result = await GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'find',
        query: q0,
        sort: {text: 1}
    })
    const arrRoomplace = result.data
    return {code: 0, message: "",
        data: {
            arrHotel,
            arrBGoods,
            arrRoomplace
        }
    }
}

export default {
    getPgData
}
