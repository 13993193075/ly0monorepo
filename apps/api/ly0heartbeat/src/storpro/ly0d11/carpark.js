import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    // 停车场名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
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
                tblName: "ly0d11carpark",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d11carpark",
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
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: "名称：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.data.capacity
    // data.wx_appid
    // data.wx_mchid

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {
                _id: data.id_dataunit
            }
        }).then(result=>{
            let objDataunit = result.data
            GQuery({
                tblName: "ly0d11carpark",
                operator: "insertOne",
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    name: data.name,
                    capacity: data.capacity,
                    wx_appid: data.wx_appid ? data.wx_appid : null,
                    wx_mchid: data.wx_mchid ? data.wx_mchid : null
                }
            }).then(result => {
                resolve({code: 0, message: "新增成功",
                    _id: result.dataNew._id
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
            tblName: "ly0d11carpark",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            let doc = JSON.parse(JSON.stringify(result.data))
            // 修改时，需要增加临时车默认计费项目和长期车默认自助缴费项目
            GQuery({
                tblName: 'ly0d11pricing',
                operator: 'find',
                query: {id_carpark: data._id}
            }).then(result => {
                doc.arrPricing = result.data
                GQuery({
                    tblName: 'ly0d11self',
                    operator: 'find',
                    query: {id_carpark: data._id}
                }).then(result => {
                    doc.arrSelf = result.data
                    resolve({code: 0, message: "",
                        doc
                    })
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.data.capacity
    // data.wx_appid
    // data.wx_mchid
    // data.id_pricing
    // data.id_self

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        // 提交
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {_id: data.id_dataunit}
        }).then(result=>{
            let objDataunit = result.data
            GQuery({
                tblName: "ly0d11pricing",
                operator: "findOne",
                query: {_id: data.id_pricing ? data.id_pricing : null}
            }).then(result=>{
                let objPricing = result.data
                GQuery({
                    tblName: "ly0d11self",
                    operator: "findOne",
                    query: {_id: data.id_self ? data.id_self : null}
                }).then(result=>{
                    let objSelf = result.data
                    GQuery({
                        tblName: "ly0d11carpark",
                        operator: "updateOne",
                        query: {_id: data._id},
                        update: {
                            id_dataunit: objDataunit._id,
                            dataunit_name: objDataunit.name,
                            name: data.name,
                            capacity: data.capacity,
                            wx_appid: data.wx_appid ? data.wx_appid : null,
                            wx_mchid: data.wx_mchid ? data.wx_mchid : null,
                            id_pricing: objPricing ? objPricing._id : null,
                            pricing_name: objPricing ? objPricing.name : "",
                            id_self: objSelf ? objSelf._id : null,
                            self_name: objSelf ? objSelf.name : ""
                        }
                    }).then(() => {
                        resolve({code: 0, message: "修改成功"})
                    })
                })
            })
        })
    })
}

function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d11warden",
            operator: "findOne",
            query: {id_carpark: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11warden"})
            }
            GQuery({
                tblName: "ly0d11pricing",
                operator: "findOne",
                query: {id_carpark: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11pricing"})
                }
                GQuery({
                    tblName: "ly0d11self",
                    operator: "findOne",
                    query: {id_carpark: _id}
                }).then(result => {
                    if (result.data) {
                        return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11self"})
                    }
                    GQuery({
                        tblName: "ly0d11carwithin",
                        operator: "findOne",
                        query: {id_carpark: _id}
                    }).then(result => {
                        if (result.data) {
                            return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11carwithin"})
                        }
                        GQuery({
                            tblName: "ly0d11carwithin_rec",
                            operator: "findOne",
                            query: {id_carpark: _id}
                        }).then(result => {
                            if (result.data) {
                                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11carwithin_rec"})
                            }
                            GQuery({
                                tblName: "ly0d11carpassin",
                                operator: "findOne",
                                query: {id_carpark: _id}
                            }).then(result => {
                                if (result.data) {
                                    return resolve({code: 1, message: "不能删除，存在关联信息：ly0d11carpassin"})
                                }

                                GQuery({
                                    tblName: "ly0d11carpark",
                                    operator: "deleteOne",
                                    query: {_id}
                                }).then(() => {
                                    resolve({code: 0, message: "删除成功"})
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
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne
}
