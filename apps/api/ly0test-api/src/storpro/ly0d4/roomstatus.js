import {GQuery} from '../../main/GQuery.js'
import {ly0d4 as beanLy0d4} from 'packages/ly0utils'
import utils from "./utils/index.js"
import ly0d4business from './business.js'
import ly0d4b_goods from './b_goods.js'

// 获取页面数据
async function getPgData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    const q = {id_dataunit: data.id_dataunit}
    const q0 = JSON.parse(JSON.stringify(q))
    if (data.id_hotel) {
        q._id = data.id_hotel
        q0.id_hotel = data.id_hotel
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const arrHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4booktype',
        operator: 'find',
        query: q0
    })
    const arrBooktype = result.data
    result = await GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'find',
        query: q0,
        sort: {text: 1}
    })
    const arrRoomplace = result.data
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'find',
        query: q0,
        sort: {roomno: 1}
    })
    const arrRoom = result.data
    return {code: 0, message: "",
        data: {
            arrHotel,
            arrRoomplace,
            arrRoom,
            arrBooktype,
            arrRoomStatus: beanLy0d4.busicode.roomStatus
        }
    }
}

// 入住登记 - 发生新订单
async function newBusiness (data) {
    // data.cellphone
    // data.checkin
    // data.checkout
    // data.peoples
    // data.rooms
    // data.id_booktype
    // data.booktime
    // data.booknote
    // data.client_cellphone
    // data.client_name
    // data.arrRoom 选中的房号数组

    let result = await GQuery({
        tblName: "ly0d4hotel",
        operator: "findOne",
        query: {
            _id: data.arrRoom[0].id_hotel
        }
    })
    const objHotel = result.data
    result = await ly0d4business.insertOne({
        id_hotel: objHotel._id,
        cellphone: data.cellphone ? data.cellphone : "",
        status_code: "1", // 订单状态：入住
        checkin: data.checkin,
        checkout: data.checkout,
        peoples: data.peoples ? data.peoples : "",
        rooms: data.rooms ? data.rooms : "",
        id_booktype: data.id_booktype ? data.id_booktype : null,
        booktime: data.booktime ? data.booktime : null,
        booknote: data.booknote ? data.booknote : "",
        client_cellphone: data.client_cellphone ? data.client_cellphone : "",
        client_name: data.client_name ? data.client_name : ""
    })
    if (result.code !== 0) {
        return result
    }
    const id_business = result.dataNew._id

    result = ly0d4b_goods.insertMany({
        id_business,
        arrRoom: data.arrRoom,
        checkin: data.checkin,
        checkout: data.checkout
    })
    if (result.code !== 0) {
        await ly0d4business.deleteOne({_id: id_business})
        return result
    } else {
        return {code: 0, message: '登记成功',
            id_business
        }
    }
}

// 修改房态
async function setStatus (data) {
    // data.id_room
    // data.status_code

    // 数据约束
    if (!data.status_code) {
        return {code: 1, message: '未选择状态'}
    }
    // 同步房态
    return await utils.roomStatus.setRoomStatus(data)
}

export default {
    getPgData,
    newBusiness,
    setStatus
}