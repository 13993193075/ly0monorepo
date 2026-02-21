import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"

// 计费
async function id_business({id_business}) {
    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: objBusiness.id_shop}
    })
    const objShop = result.data
    result = await GQuery({
        tblName: "ly0d7decode",
        operator: "find",
        query: {id_shop: objBusiness.id_shop}
    })
    const arrDecode = result.data
    result = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "find",
        query: {id_business}
    })
    const arrBGoods = result.data
    result = await GQuery({
        tblName: "ly0d7memo",
        operator: "find",
        query: {id_business}
    })
    const arrMemo = result.data

    // 交易合计
    let count = 0,
        count_b_goods = 0,
        amount = 0,
        amount_b_goods = 0
    if (arrBGoods.length > 0) {
        count_b_goods = count_b_goods + [0].concat(arrBGoods).reduce(function (total, i) {
            return total + Number(i.count)
        })
        amount_b_goods = amount_b_goods + [0].concat(arrBGoods).reduce(function (total, i) {
            return total + (Number(i.price) * Number(i.count))
        })
    }
    count = count_b_goods
    amount = amount_b_goods

    result = await GQuery({
        tblName: "ly0d7business",
        operator: 'updateOne',
        query: {_id: id_business},
        update: {
            count,
            amount,
            deal: objBusiness.deal > 0 ? objBusiness.deal : amount
        }
    })
    const objBusinessNew = result.dataNew [0]
    return {code: 0, message: "已计费",
        business: {
            objBusiness: objBusinessNew,
            objShop,
            arrDecode,
            arrBGoods,
            arrMemo
        }
    }
}

// 交易中
async function trading({id_business}) {
    await GQuery({ // 订单状态重置：入住
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: id_business},
        update: {
            status_code: "1",
            status_text: code.businessStatus.find(i=>{
                return i.code === "1"
            }).text
        }
    })
    return {code: 0, message: "订单状态：交易中"}
}

// 交易完成
async function traded({id_business}) {
    const result = await GQuery({ // 查询支付状态
        tblName: "ly0d2payment",
        operator: "findOne",
        query: {
            id_business: id_business,
            status_code: "1"
        }
    })
    if (result.data) {
        return {code: 1, message: "未完成支付，不能完成交易"}
    }

    await GQuery({ // 订单状态重置：离店
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: id_business},
        update: {
            status_code: "2",
            status_text: code.businessStatus.find(i=>{
                return i.code === "2"
            }).text
        }
    })
    return {code: 0, message: "订单状态：交易完成"}
}

export default {
    id_business,
    trading,
    traded
}
