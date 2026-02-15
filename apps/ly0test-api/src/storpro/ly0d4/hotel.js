import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    if (data0.name) { // 名称，模糊匹配
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

        // 排序
        let sort
        if(data.sort && data.sort.label && data.sort.order){
            sort = {}
            if(data.sort.order === "ascending"){
                sort[data.sort.label] = 1
            }else if(data.sort.order === "descending"){
                sort[data.sort.label] = -1
            }else{
                sort[data.sort.label] = 1
            }
        }else{
            sort = {_id: -1}
        }

        Promise.all([
            GQuery({
                tblName: 'ly0d4hotel',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d4hotel',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data,
                total: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: '名称：必填项'}
    }
    if (!(/^[0-9]*$/.test(data.checkout_hours) && data.checkout_hours >= 0 && data.checkout_hours <= 23)) {
        return {code: 1, message: '结算时间：时：必填项，数值，0-23'}
    }
    if (!(/^[0-9]*$/.test(data.checkout_minutes) && data.checkout_minutes >= 0 && data.checkout_minutes <= 59)) {
        return {code: 1, message: '结算时间：分：必填项，数值，0-59'}
    }
    if (data.checkout0_hours && !(/^[0-9]*$/.test(data.checkout0_hours) && data.checkout0_hours >= 0 && data.checkout0_hours <= 23)) {
        return {code: 1, message: '半日计价：时：数值，0-23'}
    }
    if (data.checkout0_minutes && !(/^[0-9]*$/.test(data.checkout0_minutes) && data.checkout0_minutes >= 0 && data.checkout0_minutes <= 59)) {
        return {code: 1, message: '半日计价：分：数值，0-59'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.checkout_hours
    // data.checkout_minutes
    // data.checkout0_hours
    // data.checkout0_minutes
    // data.wx_appid
    // data.wx_mchid
    // data.doorlock_sys

    return new Promise((resolve, reject) => {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d4hotel',
                operator: 'insertOne',
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    name: data.name,
                    checkout_hours: data.checkout_hours ? data.checkout_hours : 0,
                    checkout_minutes: data.checkout_minutes ? data.checkout_minutes : 0,
                    checkout0_hours: data.checkout0_hours ? data.checkout0_hours : null,
                    checkout0_minutes: data.checkout0_minutes ? data.checkout0_minutes : null,
                    wx_appid: data.wx_appid ? data.wx_appid : '',
                    wx_mchid: data.wx_mchid ? data.wx_mchid : '',
                    doorlock_sys: data.doorlock_sys ? data.doorlock_sys : ''
                }
            }).then(result => {
                resolve({code: 0, message: '插入一条记录成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.checkout_hours
    // data.checkout_minutes
    // data.checkout0_hours
    // data.checkout0_minutes
    // data.wx_appid
    // data.wx_mchid
    // data.doorlock_sys

    return new Promise((resolve, reject) => {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d4hotel',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    name: data.name,
                    checkout_hours: data.checkout_hours ? data.checkout_hours : 0,
                    checkout_minutes: data.checkout_minutes ? data.checkout_minutes : 0,
                    checkout0_hours: data.checkout0_hours ? data.checkout0_hours : null,
                    checkout0_minutes: data.checkout0_minutes ? data.checkout0_minutes : null,
                    wx_appid: data.wx_appid ? data.wx_appid : '',
                    wx_mchid: data.wx_mchid ? data.wx_mchid : '',
                    doorlock_sys: data.doorlock_sys ? data.doorlock_sys : ''
                }
            }).then(() => {
                resolve({code: 0, message: '修改一条记录成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d4roomplace',
            operator: 'findOne',
            query: {id_hotel: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4roomplace'})
            }
            GQuery({
                tblName: 'ly0d4booktype',
                operator: 'findOne',
                query: {id_hotel: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4booktype'})
                }
                GQuery({
                    tblName: 'ly0d4goods',
                    operator: 'findOne',
                    query: {id_hotel: _id}
                }).then(result => {
                    if (result.data) {
                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4goods'})
                    }
                    GQuery({
                        tblName: 'ly0d4price',
                        operator: 'findOne',
                        query: {id_hotel: _id}
                    }).then(result => {
                        if (result.data) {
                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4price'})
                        }
                        GQuery({
                            tblName: 'ly0d4goods0',
                            operator: 'findOne',
                            query: {id_hotel: _id}
                        }).then(result => {
                            if (result.data) {
                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4goods0'})
                            }
                            GQuery({
                                tblName: 'ly0d4goods1',
                                operator: 'findOne',
                                query: {id_hotel: _id}
                            }).then(result => {
                                if (result.data) {
                                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4goods1'})
                                }
                                GQuery({
                                    tblName: 'ly0d4room',
                                    operator: 'findOne',
                                    query: {id_hotel: _id}
                                }).then(result => {
                                    if (result.data) {
                                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4room'})
                                    }
                                    GQuery({
                                        tblName: 'ly0d4business',
                                        operator: 'findOne',
                                        query: {id_hotel: _id}
                                    }).then(result => {
                                        if (result.data) {
                                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4business'})
                                        }
                                        GQuery({
                                            tblName: 'ly0d4salebook',
                                            operator: 'findOne',
                                            query: {id_hotel: _id}
                                        }).then(result => {
                                            if (result.data) {
                                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4salebook'})
                                            }
                                            GQuery({
                                                tblName: 'ly0d4b_goods',
                                                operator: 'findOne',
                                                query: {id_hotel: _id}
                                            }).then(result => {
                                                if (result.data) {
                                                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4b_goods'})
                                                }
                                                GQuery({
                                                    tblName: 'ly0d4b_goods0',
                                                    operator: 'findOne',
                                                    query: {id_hotel: _id}
                                                }).then(result => {
                                                    if (result.data) {
                                                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4b_goods0'})
                                                    }
                                                    GQuery({
                                                        tblName: 'ly0d4b_goods1',
                                                        operator: 'findOne',
                                                        query: {id_hotel: _id}
                                                    }).then(result => {
                                                        if (result.data) {
                                                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4b_goods1'})
                                                        }
                                                        GQuery({
                                                            tblName: 'ly0d4bill',
                                                            operator: 'findOne',
                                                            query: {id_hotel: _id}
                                                        }).then(result => {
                                                            if (result.data) {
                                                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4bill'})
                                                            }
                                                            GQuery({
                                                                tblName: 'ly0d4memo',
                                                                operator: 'findOne',
                                                                query: {id_hotel: _id}
                                                            }).then(result => {
                                                                if (result.data) {
                                                                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4memo'})
                                                                }
                                                                GQuery({
                                                                    tblName: 'ly0d4guest',
                                                                    operator: 'findOne',
                                                                    query: {id_hotel: _id}
                                                                }).then(result => {
                                                                    if (result.data) {
                                                                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4guest'})
                                                                    }
                                                                    GQuery({
                                                                        tblName: 'ly0d4attendant',
                                                                        operator: 'findOne',
                                                                        query: {id_hotel: _id}
                                                                    }).then(result => {
                                                                        if (result.data) {
                                                                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4attendant'})
                                                                        }

                                                                        GQuery({
                                                                            tblName: 'ly0d4htlock_hotel',
                                                                            operator: 'deleteMany',
                                                                            query: {id_hotel: _id}
                                                                        }).then(() => {
                                                                            GQuery({
                                                                                tblName: 'ly0d4htlock_room',
                                                                                operator: 'deleteMany',
                                                                                query: {id_hotel: _id}
                                                                            }).then(() => {
                                                                                GQuery({
                                                                                    tblName: 'ly0d4hotel',
                                                                                    operator: 'deleteOne',
                                                                                    query: {_id}
                                                                                }).then(() => {
                                                                                    resolve({code: 0, message: '删除一条记录成功'})
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
    updateOne,
    deleteOne
}
