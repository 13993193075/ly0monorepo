import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    if (data0.name) { // 物业单位名称 模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
function find (data) {
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
                tblName: 'ly0d9unit',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d9unit',
                operator: 'countDocuments',
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
function dataRule (data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: '物业单位名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.smallticket
    // data.wx_appid
    // data.wx_mchid

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {
                _id: data.id_dataunit
            }
        }).then(result=>{
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d9unit',
                operator: 'insertOne',
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    name: data.name,
                    smallticket: data.smallticket ? data.smallticket : "",
                    wx_appid: data.wx_appid ? data.wx_appid : "",
                    wx_mchid: data.wx_mchid ? data.wx_mchid : ""
                }
            }).then(result => {
                resolve({code: 0, message: '新增成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 查询一条记录
function findOne (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9unit',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.smallticket
    // data.wx_appid
    // data.wx_mchid

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {
                _id: data.id_dataunit
            }
        }).then(result=>{
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d9unit',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    name: data.name,
                    smallticket: data.smallticket ? data.smallticket : null,
                    wx_appid: data.wx_appid ? data.wx_appid : null,
                    wx_mchid: data.wx_mchid ? data.wx_mchid : null
                }
            }).then(() => {
                resolve({code: 0, message: '修改成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d9reader',
            operator: 'findOne',
            query: {id_unit: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9reader'})
            }
            GQuery({
                tblName: 'ly0d9position',
                operator: 'findOne',
                query: {id_unit: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9position'})
                }
                GQuery({
                    tblName: 'ly0d9sizetype',
                    operator: 'findOne',
                    query: {id_unit: _id}
                }).then(result => {
                    if (result.data) {
                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9sizetype'})
                    }
                    GQuery({
                        tblName: 'ly0d9property',
                        operator: 'findOne',
                        query: {id_unit: _id}
                    }).then(result => {
                        if (result.data) {
                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9property'})
                        }
                        GQuery({
                            tblName: 'ly0d9metername',
                            operator: 'findOne',
                            query: {id_unit: _id}
                        }).then(result => {
                            if (result.data) {
                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9metername'})
                            }
                            GQuery({
                                tblName: 'ly0d9goods',
                                operator: 'findOne',
                                query: {id_unit: _id}
                            }).then(result => {
                                if (result.data) {
                                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9goods'})
                                }
                                GQuery({
                                    tblName: 'ly0d9goods0',
                                    operator: 'findOne',
                                    query: {id_unit: _id}
                                }).then(result => {
                                    if (result.data) {
                                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9goods0'})
                                    }
                                    GQuery({
                                        tblName: 'ly0d9business',
                                        operator: 'findOne',
                                        query: {id_unit: _id}
                                    }).then(result => {
                                        if (result.data) {
                                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9business'})
                                        }
                                        GQuery({
                                            tblName: 'ly0d9meterrecord',
                                            operator: 'findOne',
                                            query: {id_unit: _id}
                                        }).then(result => {
                                            if (result.data) {
                                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9meterrecord'})
                                            }
                                            GQuery({
                                                tblName: 'ly0d9b_goods',
                                                operator: 'findOne',
                                                query: {id_unit: _id}
                                            }).then(result => {
                                                if (result.data) {
                                                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9b_goods'})
                                                }
                                                GQuery({
                                                    tblName: 'ly0d9b_goods0',
                                                    operator: 'findOne',
                                                    query: {id_unit: _id}
                                                }).then(result => {
                                                    if (result.data) {
                                                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9b_goods0'})
                                                    }
                                                    GQuery({
                                                        tblName: 'ly0d9memo',
                                                        operator: 'findOne',
                                                        query: {id_unit: _id}
                                                    }).then(result => {
                                                        if (result.data) {
                                                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9memo'})
                                                        }

                                                        GQuery({
                                                            tblName: 'ly0d9unit',
                                                            operator: 'deleteOne',
                                                            query: {_id}
                                                        }).then(() => {
                                                            resolve({code: 0, message: '删除成功'})
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
