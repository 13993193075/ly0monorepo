import {GQuery} from '../../main/GQuery.js'
import code from "../code.js"

// 计费
function id_business(data) {
    let id_business = data.id_business

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d7business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d7shop",
                operator: "findOne",
                query: {_id: objBusiness.id_shop}
            }).then(result => {
                let objShop = result.data
                GQuery({
                    tblName: "ly0d7decode",
                    operator: "find",
                    query: {id_shop: objBusiness.id_shop}
                }).then(result => {
                    let arrDecode = result.data
                    GQuery({
                        tblName: "ly0d7b_goods",
                        operator: "find",
                        query: {id_business}
                    }).then(result => {
                        let arrBGoods = result.data
                        GQuery({
                            tblName: "ly0d7memo",
                            operator: "find",
                            query: {id_business}
                        }).then(result => {
                            let arrMemo = result.data

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

                            GQuery({
                                tblName: "ly0d7business",
                                operator: 'updateOne',
                                query: {_id: id_business},
                                update: {
                                    count,
                                    amount,
                                    deal: objBusiness.deal > 0 ? objBusiness.deal : amount
                                }
                            }).then(result => {
                                let objBusinessNew = result.dataNew [0]
                                resolve({code: 0, message: "已计费",
                                    business: {
                                        objBusiness: objBusinessNew,
                                        objShop,
                                        arrDecode,
                                        arrBGoods,
                                        arrMemo
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 交易中
function trading(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({ // 订单状态重置：入住
            tblName: "ly0d7business",
            operator: "updateOne",
            query: {_id: data.id_business},
            update: {
                status_code: "1",
                status_text: code.businessStatus.find(i=>{
                    return i.code === "1"
                }).text
            }
        }).then(() => {
            resolve({code: 0, message: "订单状态：交易中"})
        })
    })
}

// 交易完成
function traded(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({ // 查询支付状态
            tblName: "ly0d2payment",
            operator: "findOne",
            query: {
                id_business: data.id_business,
                status_code: "1"
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "未完成支付，不能完成交易"})
            }

            GQuery({ // 订单状态重置：离店
                tblName: "ly0d7business",
                operator: "updateOne",
                query: {_id: data.id_business},
                update: {
                    status_code: "2",
                    status_text: code.businessStatus.find(i=>{
                        return i.code === "2"
                    }).text
                }
            }).then(() => {
                resolve({code: 0, message: "订单状态：交易完成"})
            })
        })
    })
}

export default {
    id_business,
    trading,
    traded
}
