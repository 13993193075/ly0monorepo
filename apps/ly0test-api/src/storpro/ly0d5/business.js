import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}

        if (data0._id) { // _id 必须置于首项查询
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 餐馆 _id
        if (data0.id_restaurant) {
            data1.id_restaurant = data0.id_restaurant
        }
        // 订单状态
        if (data0.status_code) {
            data1.status_code = data0.status_code
        }
        // 用餐时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }
        // 客户手机号，模糊匹配
        if (data0.client_cellphone) {
            data1.client_cellphone = {'$regex': `.*${data0.client_cellphone}.*`}
        }
        // 客户名称，模糊匹配
        if (data0.client_name) {
            data1.client_name = {'$regex': `.*${data0.client_name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_restaurant
    // data.query.status_code
    // data.query.time_start
    // data.query.time_end
    // data.query.client_cellphone
    // data.query.client_name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then((query) => { // 查询修正
            // 排序
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
                    tblName: 'ly0d5business',
                    operator: 'find',
                    query,
                    sort: {time: -1},
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d5business',
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
    })
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.id_restaurant) {
        return {code: 1, message: '餐馆：必选项'}
    }
    if (!data.status_code) {
        return {code: 1, message: '订单状态：必选项'}
    }
    if (!data.time) {
        return {code: 1, message: '用餐时间：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_restaurant
    // data.status_code
    // data.time
    // data.peoples
    // data.client_cellphone
    // data.client_name
    // data.booknote
    // data.booktime

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d5restaurant",
            operator: "findOne",
            query: {
                _id: data.id_restaurant
            }
        }).then(result=>{
            let objRestaurant = result.data
            GQuery({
                tblName: 'ly0d5business',
                operator: 'insertOne',
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objRestaurant.id_dataunit,
                    dataunit_name: objRestaurant.dataunit_name,
                    id_restaurant: objRestaurant._id,
                    restaurant_name: objRestaurant.name,
                    status_code: data.status_code,
                    status_text: code.businessStatus.find(i=>{
                        return i.code === data.status_code
                    }).text,
                    time: data.time,
                    peoples: data.peoples ? data.peoples : null,
                    client_cellphone: data.client_cellphone ? data.client_cellphone : null,
                    client_name: data.client_name ? data.client_name : null,
                    booknote: data.booknote ? data.booknote : null,
                    booktime: data.booktime ? data.booktime : null
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

    return new Promise(function (resolve, reject) {
        utils.id_business.id_business({id_business: data._id}).then(result=>{
            resolve({code: result.code, message: result.message,
                business: result.business,
                doc: result.business.objBusiness // 兼容前端习惯
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_restaurant
    // data.status_code
    // data.time
    // data.peoples
    // data.client_cellphone
    // data.client_name
    // data.booknote
    // data.booktime

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d5restaurant",
            operator: "findOne",
            query: {
                _id: data.id_restaurant
            }
        }).then(result=>{
            let objRestaurant = result.data
            GQuery({
                tblName: 'ly0d5business',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    time_update: thisTime,
                    id_dataunit: objRestaurant.id_dataunit,
                    dataunit_name: objRestaurant.dataunit_name,
                    id_restaurant: objRestaurant._id,
                    restaurant_name: objRestaurant.name,
                    status_code: data.status_code,
                    status_text: code.businessStatus.find(i=>{
                        return i.code === data.status_code
                    }).text,
                    time: data.time,
                    peoples: data.peoples ? data.peoples : null,
                    client_cellphone: data.client_cellphone ? data.client_cellphone : null,
                    client_name: data.client_name ? data.client_name : null,
                    booknote: data.booknote ? data.booknote : null,
                    booktime: data.booktime ? data.booktime : null
                }
            }).then(() => {
                // 同步餐位状态
                utils.tableStatus.setTableStatusWithBusiness({id_business: data._id}).then(()=> {
                    resolve({code: 0, message: '修改成功，餐位状态已同步'})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d5b_table',
            operator: 'findOne',
            query: {id_business: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_table'})
            }
            GQuery({
                tblName: 'ly0d5b_goods',
                operator: 'findOne',
                query: {id_business: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_goods'})
                }
                GQuery({
                    tblName: 'ly0d5b_goods0',
                    operator: 'findOne',
                    query: {id_business: _id}
                }).then(result => {
                    if (result.data) {
                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_goods0'})
                    }
                    GQuery({
                        tblName: 'ly0d5b_goods1',
                        operator: 'findOne',
                        query: {id_business: _id}
                    }).then(result => {
                        if (result.data) {
                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_goods1'})
                        }
                        GQuery({
                            tblName: 'ly0d5memo',
                            operator: 'findOne',
                            query: {id_business: _id}
                        }).then(result => {
                            if (result.data) {
                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5memo'})
                            }

                            GQuery({
                                tblName: 'ly0d5business',
                                operator: 'deleteOne',
                                query: {_id}
                            }).then(() => {
                                // 取消所有餐位状态关联
                                GQuery({
                                    tblName: "ly0d5table",
                                    operator: "updateMany",
                                    query: {id_business: data._id},
                                    update: {
                                        id_business: null,
                                        status_code: "1",
                                        status_text: code.tableStatus.find(i=>{
                                            return i.code === "1"
                                        }).text
                                    }
                                }).then(() => {
                                    resolve({code: 0, message: '删除成功，餐位状态已同步'})
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取页面数据
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_restaurant 当前用户信息：餐馆id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_restaurant) {
            q._id = data.id_restaurant
        }

        GQuery({
            tblName: 'ly0d5restaurant',
            operator: 'find',
            query: q
        }).then(result => {
            resolve({code: 0, message: "",
                data: {
                    arrRestaurant: result.data,
                    arrBusinessStatus: code.businessStatus
                }
            })
        })
    })
}

function deal (data) { // 核收
    // data._id
    // data.deal
    // data.dealnote

    return new Promise((resolve, reject) => {
        // 不能提交
        if (!/^[0-9]+$/.test(data.deal)) {
            return resolve({code: 1, message: '校验错误：金额必须大于等于 0'})
        }

        GQuery({
            tblName: 'ly0d5business',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                deal: data.deal,
                dealnote: data.dealnote ? data.dealnote : null
            }
        }).then(() => {
            resolve({code: 0, message: '修改成功'})
        })
    })
}

// 预订
function book (data) {
    // data._id

    return new Promise((resolve, reject) => {
        utils.tableStatus.book({
            id_business: data._id
        }).then(result=>{
            resolve(result)
        })
    })
}

// 用餐
function arrive (data) {
    // data._id

    return new Promise((resolve, reject) => {
        utils.tableStatus.arrive({
            id_business: data._id
        }).then(result=>{
            resolve(result)
        })
    })
}

// 离开
function leave (data) {
    // data._id

    return new Promise((resolve, reject) => {
        utils.tableStatus.leave({
            id_business: data._id
        }).then(result=>{
            resolve(result)
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne,
    getPageData,
    deal,
    book,
    arrive,
    leave
}
