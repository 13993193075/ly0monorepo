import {GQuery} from '../../main/GQuery.js'
import {ly0d4 as beanLy0d4} from '@yoooloo42/blindboxes'
import utils from "./utils/index.js";

async function id_business(data){
    // data.id_business

    let result = await GQuery({
        tblName: "ly0d4business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d4hotel",
        operator: "findOne",
        query: {_id: objBusiness.id_hotel}
    })
    const objHotel = result.data
    result = await GQuery({
        tblName: "ly0d4salebook",
        operator: "find",
        query: {id_business: objBusiness._id}
    })
    const arrSalebook = result.data
    result = await GQuery({
        tblName: "ly0d4b_goods",
        operator: "find",
        query: {id_business: objBusiness._id},
        sort: {roomno: 1}
    })
    const arrBGoods = result.data
    result = await GQuery({
        tblName: "ly0d4b_goods0",
        operator: "find",
        query: {id_business: objBusiness._id}
    })
    const arrBGoods0 = result.data
    result = await GQuery({
        tblName: "ly0d4b_goods1",
        operator: "find",
        query: {id_business: objBusiness._id}
    })
    const arrBGoods1 = result.data
    result = await GQuery({
        tblName: "ly0d4bill",
        operator: "find",
        query: {id_business: objBusiness._id},
        sort: {_id: -1} // 挂账倒序
    })
    const arrBill = result.data
    result = await GQuery({
        tblName: "ly0d4guest",
        operator: "find",
        query: {id_business: objBusiness._id}
    })
    const arrGuest = result.data
    result = await GQuery({
        tblName: "ly0d4memo",
        operator: "find",
        query: {id_business: objBusiness._id},
        sort: {_id: -1} // 备忘倒序
    })
    const arrMemo = result.data

    let amount = 0,
        amount_b_goods = 0,
        amount_b_goods0 = 0,
        amount_b_goods1 = 0,
        amount_bill = 0

    // 房租
    arrBGoods.forEach(i => {
        amount_b_goods = amount_b_goods + beanLy0d4.calculator.calculator({
            price: i.price,
            checkin: new Date(i.checkin),
            checkout: new Date(i.checkout),
            method_code: i.method_code,
            timepoint_hours: objHotel.checkout_hours || 14,
            timepoint_minutes: objHotel.checkout_minutes || 0,
            timepoint0_hours: objHotel.checkout0_hours || 18,
            timepoint0_minutes: objHotel.checkout0_minutes || 0
        })
    })

    // 配售
    if (arrBGoods0.length > 0){
        amount_b_goods0 = amount_b_goods0 + [0].concat(arrBGoods0).reduce(function(total, i){
            return total + (Number(i.price) * Number(i.count))
        })
    }

    // 损赔
    if (arrBGoods1.length > 0){
        amount_b_goods1 = amount_b_goods1 + [0].concat(arrBGoods1).reduce(function(total, i){
            return total + (Number(i.price) * Number(i.count))
        })
    }

    // 挂账
    if (arrBill.length > 0){
        amount_bill = amount_bill + [0].concat(arrBill).reduce(function(total, i){
            return total + (Number(i.amount ? i.amount : 0));
        })
    }

    // 计费合计
    amount = amount_b_goods + amount_b_goods0 + amount_b_goods1 + amount_bill
    result = await GQuery({
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: objBusiness._id},
        update: {
            amount,
            amount_b_goods,
            amount_b_goods0,
            amount_b_goods1,
            amount_bill,
            deal: objBusiness.deal > 0 ? objBusiness.deal : amount,
            dealnote : objBusiness.dealnote ? objBusiness.dealnote : ""
        },
        upsert: true
    })
    const objBusinessNew = result.dataNew

    // 附加旅客姓名
    arrBGoods.forEach(i=>{
        arrGuest.forEach(j=>{
            if(j.id_b_goods === i._id){
                i.guest_name = j.name
            }
        })
    })

    result = await GQuery({
        tblName: "ly0d4booktype",
        operator: "find",
        query: {id_hotel: objHotel._id},
    })
    const arrBooktype = result.data
    return {code: 0, message: "已计费",
        business: {
            objBusiness: objBusinessNew,
            objHotel,
            arrBGoods,
            arrBGoods0,
            arrBGoods1,
            arrBill,
            arrMemo,
            arrGuest,
            arrSalebook
        },
        pgData: {
            arrBooktype
        }
    }
}

// 修改订单基本信息
async function setBaseInfo(data) {
    // data._id
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

    // 提交
    const thisTime = new Date()
    // 预订类型
    let id_booktype = null,
        booktype_text= ''
    if(data.id_booktype){
        id_booktype = data.id_booktype
        let result = await GQuery({
            tblName: 'ly0d4booktype',
            operator: 'findOne',
            query: {_id: id_booktype}
        })
        booktype_text = result.data.text
    }
    await GQuery({
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            cellphone: data.cellphone || '',
            checkin: data.checkin || null,
            checkout: data.checkout || null,
            peoples: data.peoples || '',
            rooms: data.rooms || '',
            id_booktype,
            booktype_text,
            booktime: data.booktime || null,
            client_cellphone: data.client_cellphone || '',
            client_name: data.client_name || '',
            booknote: data.booknote || '',
        }
    })
    return {code: 0, message: "修改订单基本信息成功"}
}

// 修改核收金额
async function setDeal(data) {
    // data._id
    // data.deal
    // data.dealnote

    // 提交
    const thisTime = new Date()
    await GQuery({
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            deal: data.deal || 0,
            dealnote: data.dealnote || '',
        }
    })
    return {code: 0, message: "修改核收金额成功"}
}

export default {
    id_business,
    setBaseInfo,
    setDeal,
    book: utils.roomStatus.book,
    arrive: utils.roomStatus.arrive,
    leave: utils.roomStatus.leave,
}