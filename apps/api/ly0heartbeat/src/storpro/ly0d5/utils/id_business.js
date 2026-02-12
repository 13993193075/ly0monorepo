import {GQuery} from '../../../main/GQuery.js'

// 订单信息
function id_business(data){
    // data.id_business

    return new Promise(function(resolve, reject){
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result=>{
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5restaurant",
                operator: "findOne",
                query: {_id: objBusiness.id_restaurant}
            }).then(result=>{
                let objRestaurant = result.data
                GQuery({
                    tblName: "ly0d5b_table",
                    operator: "find",
                    query: {id_business: objBusiness._id}
                }).then(result=>{
                    let arrBTable = result.data
                    GQuery({
                        tblName: "ly0d5b_goods",
                        operator: "find",
                        query: {id_business: objBusiness._id},
                        sort: {roomno: 1}
                    }).then(result=>{
                        let arrBGoods = result.data;
                        GQuery({
                            tblName: "ly0d5b_goods0",
                            operator: "find",
                            query: {id_business: objBusiness._id}
                        }).then(result=>{
                            let arrBGoods0 = result.data
                            GQuery({
                                tblName: "ly0d5b_goods1",
                                operator: "find",
                                query: {id_business: objBusiness._id}
                            }).then(result=>{
                                let arrBGoods1 = result.data
                                GQuery({
                                    tblName: "ly0d5memo",
                                    operator: "find",
                                    query: {id_business: objBusiness._id},
                                    sort: {_id: -1} //备忘倒序
                                }).then(result=>{
                                    let arrMemo = result.data

                                    let amount = 0,
                                        amount_b_goods = 0,
                                        amount_b_goods0 = 0,
                                        amount_b_goods1 = 0

                                    // 菜金
                                    if (arrBGoods0.length > 0){
                                        amount_b_goods = amount_b_goods + [0].concat(arrBGoods).reduce(function(total, i){
                                            return total + (Number(i.price) * Number(i.count))
                                        })
                                    }

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

                                    // 计费合计
                                    amount = amount_b_goods + amount_b_goods0 + amount_b_goods1
                                    GQuery({
                                        tblName: "ly0d5business",
                                        operator: "updateOne",
                                        query: {_id: objBusiness._id},
                                        update: {
                                            amount,
                                            amount_b_goods,
                                            amount_b_goods0,
                                            amount_b_goods1,
                                            deal: objBusiness.deal > 0 ? objBusiness.deal : amount,
                                            dealnote : objBusiness.dealnote ? objBusiness.dealnote : ""
                                        },
                                        upsert: true
                                    }).then(result=>{
                                        let objBusinessNew = result.dataNew
                                        resolve({code: 0, message: "已计费",
                                            business: {
                                                objBusiness: objBusinessNew,
                                                objRestaurant,
                                                arrBTable,
                                                arrBGoods,
                                                arrBGoods0,
                                                arrBGoods1,
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
        })
    })
}

export default {
    id_business
}