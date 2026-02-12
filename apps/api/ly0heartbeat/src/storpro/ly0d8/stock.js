import {GQuery} from '../../main/GQuery.js'

function stock (para) {
    let id_goods = para.id_goods,
        arrPurchase = para.arrPurchase,
        arrGoodsin = para.arrGoodsin,
        arrGoodsout = para.arrGoodsout,
        arrSale = para.arrSale,
        arrLoss = para.arrLoss,
        time_start = para.time_start ? new Date(para.time_start) : new Date(null),
        time_end = para.time_end ? new Date(para.time_end) : new Date()

    let count0 = 0,
        count0purchase = 0,
        count0goodsin = 0,
        count1 = 0,
        count1goodsout = 0,
        count1sale = 0,
        count1loss = 0,
        stock_start = 0,
        stock_end = 0

    for (let i = 0; i < arrPurchase.length; i++) {
        if (("" + id_goods === "" + arrPurchase[i].id_goods) && new Date(new Date(time_end).toDateString()) >= new Date(new Date(arrPurchase [i].time).toDateString())) {
            count0 = count0 + arrPurchase[i].count
            count0purchase = count0purchase + arrPurchase [i].count
            stock_end = stock_end + arrPurchase [i].count
            if (new Date(new Date(time_start).toDateString()) >= new Date(new Date(arrPurchase [i].time).toDateString())) {
                stock_start = stock_start + arrPurchase [i].count
            }
        }
    }
    for (let i = 0; i < arrGoodsin.length; i++) {
        if (("" + id_goods === "" + arrGoodsin[i].id_goods) && new Date(new Date(time_end).toDateString()) >= new Date(new Date(arrGoodsin [i].time).toDateString())) {
            count0 = count0 + arrGoodsin [i].count
            count0goodsin = count0goodsin + arrGoodsin [i].count
            stock_end = stock_end + arrGoodsin [i].count
            if (new Date(new Date(time_start).toDateString()) >= new Date(new Date(arrGoodsin [i].time).toDateString())) {
                stock_start = stock_start + arrGoodsin [i].count
            }
        }
    }
    for (let i = 0; i < arrGoodsout.length; i++) {
        if (("" + id_goods === "" + arrGoodsout[i].id_goods) && new Date(new Date(time_end).toDateString()) >= new Date(new Date(arrGoodsout [i].time).toDateString())) {
            count1 = count1 + arrGoodsout [i].count
            count1goodsout = count1goodsout + arrGoodsout [i].count
            stock_end = stock_end - arrGoodsout [i].count
            if (new Date(new Date(time_start).toDateString()) >= new Date(new Date(arrGoodsout [i].time).toDateString())) {
                stock_start = stock_start - arrGoodsout [i].count
            }
        }
    }
    for (let i = 0; i < arrSale.length; i++) {
        if (("" + id_goods === "" + arrSale[i].id_goods) && new Date(new Date(time_end).toDateString()) >= new Date(new Date(arrSale [i].time).toDateString())) {
            count1 = count1 + arrSale [i].count
            count1sale = count1sale + arrSale [i].count
            stock_end = stock_end - arrSale [i].count
            if (new Date(new Date(time_start).toDateString()) >= new Date(new Date(arrSale [i].time).toDateString())) {
                stock_start = stock_start - arrSale [i].count
            }
        }
    }
    for (let i = 0; i < arrLoss.length; i++) {
        if (("" + id_goods === "" + arrLoss[i].id_goods) && new Date(new Date(time_end).toDateString()) >= new Date(new Date(arrLoss [i].time).toDateString())) {
            count1 = count1 + arrLoss [i].count
            count1loss = count1loss + arrLoss [i].count
            stock_end = stock_end - arrLoss [i].count
            if (new Date(new Date(time_start).toDateString()) >= new Date(new Date(arrLoss [i].time).toDateString())) {
                stock_start = stock_start - arrLoss [i].count
            }
        }
    }

    return {
        count0,
        count0purchase,
        count0goodsin,
        count1,
        count1goodsout,
        count1sale,
        count1loss,
        stock_start,
        stock_end
    }
}

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let q = data.query ? data.query : {},
            q0 = {}, // 货品名录
            q1 = {}, // 入库
            q2 = {} // 出库

        q0.id_dataunit = q.id_dataunit
        q1.id_dataunit = q.id_dataunit
        q2.id_dataunit = q.id_dataunit

        // 库管单位 _id
        if (q.id_unit) {
            q0.id_unit = q.id_unit
            q1.id_unit = q.id_unit
            q2.id_unit = q.id_unit
        } else if (q.id_unit) {
            q0.id_unit = q.id_unit
            q1.id_unit = q.id_unit
            q2.id_unit = q.id_unit
        }

        if (q.id_goodsgroup) { // 货品分类 _id
            q0.id_goodsgroup = q.id_goodsgroup
            q1.id_goodsgroup = q.id_goodsgroup
            q2.id_goodsgroup = q.id_goodsgroup
        }

        if (q._id) { // 货品 _id
            q0._id = q._id
            q1.id_goods = q._id
            q2.id_goods = q._id
        }

        if (q.name) { // 货品名称 模糊匹配
            q0.name = {'$regex': `.*${q.name}.*`}
            q1.name = {'$regex': `.*${q.name}.*`}
            q2.name = {'$regex': `.*${q.name}.*`}
        }

        // 入库/出库时间
        if (q.time_start) {
            q.time_start = new Date(q.time_start)
        } else {
            q.time_start = new Date(null)
        }
        if (q.time_end) {
            q.time_end = new Date(q.time_end)
        } else {
            q.time_end = new Date()
        }
        q1.time = {
            '$gte': `${q.time_start}`,
            '$lte': `${q.time_end}`
        }
        q2.time = {
            '$gte': `${q.time_start}`,
            '$lte': `${q.time_end}`
        }

        if (q.id_goodsfrom) { // 货品来源
            q1.id_goodsfrom = q.id_goodsfrom
        }

        if (q.id_goodsto) { // 货品去向
            q2.id_goodsto = q.id_goodsto
        }

        resolve({q0, q1, q2})
    })
}

function find (data) {
    // data.query
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.id_goodsgroup
    // data.query._id
    // data.query.name
    // data.query.time_start
    // data.query.time_end
    // data.query.id_goodsfrom
    // data.query.id_goodsto
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data).then(result => { // 查询修正
            let q0 = result.q0,
                q1 = result.q1,
                q2 = result.q2

            //  排序
            let sort
            if (data.sort && data.sort.label && data.sort.order) {
                sort = {}
                if (data.sort.order === 'ascending') {
                    sort[data.sort.label] = 1
                } else if (data.sort.order === 'descending') {
                    sort[data.sort.label] = -1
                } else {
                    sort[data.sort.label] = 1
                }
            } else {
                sort = {_id: -1}
            }

            Promise.all([
                // 货品名录
                GQuery({
                    tblName: 'ly0d8goods',
                    operator: 'find',
                    query: q0,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d8goods',
                    operator: 'countDocuments',
                    query: q0
                }),

                // 入库
                GQuery({
                    tblName: 'ly0d8purchase',
                    operator: 'find',
                    query: q1
                }),
                GQuery({
                    tblName: 'ly0d8goodsin',
                    operator: 'find',
                    query: q1
                }),

                // 出库
                GQuery({
                    tblName: 'ly0d8goodsout',
                    operator: 'find',
                    query: q2
                }),
                GQuery({
                    tblName: 'ly0d8sale',
                    operator: 'find',
                    query: q2
                }),
                GQuery({
                    tblName: 'ly0d8loss',
                    operator: 'find',
                    query: q2
                })
            ]).then(function (result) {
                let result0 = {
                    data: JSON.parse(JSON.stringify(result[0].data)),
                    count: result[1].count,
                    arrPurchase: result[2].data,
                    arrGoodsin: result[3].data,
                    arrGoodsout: result[4].data,
                    arrSale: result[5].data,
                    arrLoss: result[6].data
                }

                result0.data.forEach(i => {
                    let objStock = stock({
                        id_goods: i._id,
                        arrPurchase: result0.arrPurchase,
                        arrGoodsin: result0.arrGoodsin,
                        arrGoodsout: result0.arrGoodsout,
                        arrSale: result0.arrSale,
                        arrLoss: result0.arrLoss,
                        time_start: data.query.time_start ? new Date(data.query.time_start) : new Date(null),
                        time_end: data.query.time_end ? new Date(data.query.time_end) : new Date()
                    })

                    i.stock_start = objStock.stock_start
                    i.stock_end = objStock.stock_end
                    i.count0purchase = objStock.count0purchase
                    i.count0goodsin = objStock.count0goodsin
                    i.count1goodsout = objStock.count1goodsout
                    i.count1sale = objStock.count1sale
                    i.count1loss = objStock.count1loss
                })
                resolve({
                    data: result0.data,
                    count: result0.count
                })
            })
        })
    })
}

function findOne (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d8goods',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：库管单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        }

        GQuery({
            tblName: 'ly0d8unit',
            operator: 'find',
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: 'ly0d8goodsgroup',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d8goods',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrGoods = result.data
                    GQuery({
                        tblName: 'ly0d8goodsfrom',
                        operator: 'find',
                        query: q0
                    }).then(result => {
                        let arrGoodsfrom = result.data
                        GQuery({
                            tblName: 'ly0d8goodsto',
                            operator: 'find',
                            query: q0
                        }).then(result => {
                            let arrGoodsto = result.data
                            resolve({code: 0, message: "",
                                data: {
                                    arrUnit,
                                    arrGoodsgroup,
                                    arrGoods,
                                    arrGoodsfrom,
                                    arrGoodsto
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

export default {
    find,
    findOne,
    getPageData
}
