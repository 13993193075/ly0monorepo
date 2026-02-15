import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 库管单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 货品分类 _id
        if (data0.id_goodsgroup) {
            data1.id_goodsgroup = data0.id_goodsgroup
        }
        // 货品 _id
        if (data0.id_goods) {
            data1.id_goods = data0.id_goods
        }
        // 货品名称 模糊匹配
        if (data0.goods_name) {
            data1.goods_name = {'$regex': `.*${data0.goods_name}.*`}
        }
        // 出库时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }
        // 货品去向
        if (data0.id_goodsto) {
            data1.id_goodsto = data0.id_goodsto
        }

        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.id_goodsgroup
    // data.query.id_goods
    // data.query.goods_name
    // data.query.time_start
    // data.query.time_end
    // data.query.id_goodsto
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then(query => { // 查询修正
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
                GQuery({
                    tblName: "ly0d8sale",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d8sale",
                    operator: "countDocuments",
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data,
                    count: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.id_unit) {
        return {code: 1, message: "库管单位：必选项"}
    }
    if (!data.id_goods) {
        return {code: 1, message: "货品：必选项"}
    }
    if (!/^[0-9]+$/.test(data.count)) {
        return {code: 1, message: "数量：必填项，整数，>= 0"}
    }
    if (!/^[0-9]+$/.test(data.price)) {
        return {code: 1, message: "销售单价：必填项，数值，>= 0"}
    }
    if (!data.time) {
        return {code: 1, message: "出库时间：必填项"}
    }
    if (!data.keeper_cellphone) {
        return {code: 1, message: "库管人手机号：必填项"}
    }
    if (!data.keeper_name) {
        return {code: 1, message: "库管人姓名：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_unit
    // data.id_goodsgroup
    // data.id_goods
    // data.count
    // data.price
    // data.time
    // data.id_goodsto
    // data.keeper_cellphone 当前用户信息：用户手机号
    // data.keeper_name 当前用户信息：用户名称
    // data.note

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d8unit",
            operator: "findOne",
            query: {_id: data.id_unit}
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: "ly0d8goodsgroup",
                operator: "findOne",
                query: {_id: data.id_goodsgroup ? data.id_goodsgroup : null}
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: "ly0d8goods",
                    operator: "findOne",
                    query: {_id: data.id_goods}
                }).then(result=>{
                    let objGoods = result.data
                    GQuery({
                        tblName: "ly0d8goodsto",
                        operator: "findOne",
                        query: {_id: data.id_goodsto ? data.id_goodsto : null}
                    }).then(result=>{
                        let objGoodsto = result.data
                        GQuery({
                            tblName: "ly0d8sale",
                            operator: "insertOne",
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objUnit.id_dataunit,
                                dataunit_name: objUnit.dataunit_name,
                                id_unit: objUnit._id,
                                unit_name: objUnit.name,
                                id_goodsgroup: data.id_goodsgroup ? objGoodsgroup._id : null,
                                goodsgroup_text: data.id_goodsgroup ? objGoodsgroup.text : "",
                                id_goods: objGoods._id,
                                goods_name: objGoods.name,
                                count: data.count,
                                price: data.price,
                                time: data.time,
                                id_goodsto: data.id_goodsto ? objGoodsto._id : null,
                                goodsto_text: data.id_goodsto ? objGoodsto.text : "",
                                keeper_cellphone: data.keeper_cellphone,
                                keeper_name: data.keeper_name,
                                note: data.note ? data.note : ""
                            }
                        }).then(result => {
                            resolve({code: 0, message: "新增成功",
                                _id: result.dataNew._id
                            })
                        })
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d8sale",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_unit
    // data.id_goodsgroup
    // data.id_goods
    // data.count
    // data.price
    // data.time
    // data.id_goodsto
    // data.keeper_cellphone 当前用户信息：用户手机号
    // data.keeper_name 当前用户信息：用户名称
    // data.note

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d8unit",
            operator: "findOne",
            query: {_id: data.id_unit}
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: "ly0d8goodsgroup",
                operator: "findOne",
                query: {_id: data.id_goodsgroup ? data.id_goodsgroup : null}
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: "ly0d8goods",
                    operator: "findOne",
                    query: {_id: data.id_goods}
                }).then(result=>{
                    let objGoods = result.data
                    GQuery({
                        tblName: "ly0d8goodsto",
                        operator: "findOne",
                        query: {_id: data.id_goodsto ? data.id_goodsto : null}
                    }).then(result=>{
                        let objGoodsto = result.data
                        GQuery({
                            tblName: "ly0d8sale",
                            operator: "updateOne",
                            query: {_id: data._id},
                            update: {
                                time_update: thisTime,
                                id_dataunit: objUnit.id_dataunit,
                                dataunit_name: objUnit.dataunit_name,
                                id_unit: objUnit._id,
                                unit_name: objUnit.name,
                                id_goodsgroup: data.id_goodsgroup ? objGoodsgroup._id : null,
                                goodsgroup_text: data.id_goodsgroup ? objGoodsgroup.text : "",
                                id_goods: objGoods._id,
                                goods_name: objGoods.name,
                                count: data.count,
                                price: data.price,
                                time: data.time,
                                id_goodsto: data.id_goodsto ? objGoodsto._id : null,
                                goodsto_text: data.id_goodsto ? objGoodsto.text : "",
                                keeper_cellphone: data.keeper_cellphone,
                                keeper_name: data.keeper_name,
                                note: data.note ? data.note : ""
                            }
                        }).then(() => {
                            resolve({code: 0, message: "修改成功"})
                        })
                    })
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d8sale",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除成功"})
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
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
            tblName: "ly0d8unit",
            operator: "find",
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: "ly0d8goodsgroup",
                operator: "find",
                query: q0
            }).then(result => {
                let arrGoodsgroup = result.data
                GQuery({
                    tblName: "ly0d8goods",
                    operator: "find",
                    query: q0
                }).then(result => {
                    let arrGoods = result.data
                    GQuery({
                        tblName: "ly0d8goodsto",
                        operator: "find",
                        query: q0
                    }).then(result => {
                        let arrGoodsto = result.data
                        resolve({code: 0, message: "",
                            data: {
                                arrUnit,
                                arrGoodsgroup,
                                arrGoods,
                                arrGoodsto
                            }
                        })
                    })
                })
            })
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne,
    getPageData
}
