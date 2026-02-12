import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 工作单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 工种
        if (data0.id_group) {
            data1.id_group = data0.id_group
        }
        // 工员
        if (data0.id_worker) {
            data1.id_worker = data0.id_worker
        }
        // 客户手机号
        if (data0.client_cellphone) {
            data1.client_cellphone = data0.client_cellphone
        }
        // 客户名称，模糊匹配
        if (data0.client_name) {
            data1.client_name = {'$regex': `.*${data0.client_name}.*`}
        }
        // 下单时间
        if (data0.time_start) {
            data1.time = {'$gte': `${data0.time_start}`}
        }
        if (data0.time_end) {
            data1.time = {'$lte': `${data0.time_end}`}
        }
        // 工单状态
        if (data0.status_code) {
            data1.status_code = data0.status_code
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.id_group
    // data.query.id_worker
    // data.query.client_cellphone
    // data.query.client_name
    // data.query.time_start
    // data.query.time_end
    // data.query.status_code
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
                    tblName: 'ly0d10business',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d10business',
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
    if (!data.id_worker) {
        return {code: 1, message: '工员：必选项'}
    }
    if (!data.client_cellphone) {
        return {code: 1, message: '客户手机号：必填项'}
    }
    if (!data.client_name) {
        return {code: 1, message: '客户名称：必填项'}
    }
    if (!data.order) {
        return {code: 1, message: '下单内容：必填项'}
    }
    if (!data.time) {
        return {code: 1, message: '下单时间：必填项'}
    }
    if (!data.status_code) {
        return {code: 1, message: '工单状态：必选项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_worker
    // data.client_cellphone
    // data.client_name
    // data.order
    // data.time
    // data.deal
    // data.dealnote
    // data.status_code

    return new Promise((resolve, reject) => {
        // 不能提交
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d10worker",
            operator: "findOne",
            query: {
                _id: data.id_worker
            }
        }).then(result=>{
            let objWorker = result.data
            GQuery({
                tblName: 'ly0d10business',
                operator: 'insertOne',
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objWorker.id_dataunit,
                    dataunit_name: objWorker.dataunit_name,
                    id_unit: objWorker.id_unit,
                    unit_name: objWorker.unit_name,
                    id_group: objWorker.id_group,
                    group_name: objWorker.group_name,
                    id_worker: objWorker._id,
                    worker_cellphone: objWorker.cellphone,
                    worker_idno: objWorker.idno,
                    worker_name: objWorker.name,
                    client_cellphone: data.client_cellphone,
                    client_name: data.client_name,
                    order: data.order,
                    time: data.time,
                    deal: data.deal ? data.deal : 0,
                    dealnote: data.dealnote ? data.dealnote : "",
                    status_code: data.status_code,
                    status_text: code.businessStatus.find(i=>{
                        return i.code === data.status_code
                    }).text
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
    // data.id_worker
    // data.client_cellphone
    // data.client_name
    // data.order
    // data.time
    // data.deal
    // data.dealnote
    // data.status_code

    return new Promise((resolve, reject) => {
        // 不能提交
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d10worker",
            operator: "findOne",
            query: {
                _id: data.id_worker
            }
        }).then(result=>{
            let objWorker = result.data
            GQuery({
                tblName: 'ly0d10business',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    time_update: thisTime,
                    id_dataunit: objWorker.id_dataunit,
                    dataunit_name: objWorker.dataunit_name,
                    id_unit: objWorker.id_unit,
                    unit_name: objWorker.unit_name,
                    id_group: objWorker.id_group,
                    group_name: objWorker.group_name,
                    id_worker: objWorker._id,
                    worker_cellphone: objWorker.cellphone,
                    worker_idno: objWorker.idno,
                    worker_name: objWorker.name,
                    client_cellphone: data.client_cellphone,
                    client_name: data.client_name,
                    order: data.order,
                    time: data.time,
                    deal: data.deal ? data.deal : 0,
                    dealnote: data.dealnote ? data.dealnote : "",
                    status_code: data.status_code,
                    status_text: code.businessStatus.find(i=>{
                        return i.code === data.status_code
                    }).text
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
            tblName: 'ly0d10memo',
            operator: 'findOne',
            query: {id_business: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d10memo'})
            }

            GQuery({
                tblName: 'ly0d10business',
                operator: 'deleteOne',
                query: {_id}
            }).then(() => {
                resolve({code: 0, message: '删除成功'})
            })
        })
    })
}

// 获取页面初始化数据
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：工作单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        }

        GQuery({
            tblName: 'ly0d10unit',
            operator: 'find',
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: 'ly0d10group',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrGroup = result.data
                GQuery({
                    tblName: 'ly0d10worker',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrWorker = result.data
                    resolve({code: 0, message: "",
                        data: {
                            arrUnit,
                            arrGroup,
                            arrWorker,
                            arrBusinessStatus: code.businessStatus
                        }
                    })
                })
            })
        })
    })
}

// 核收
function deal (data) {
    // data._id
    // data.deal
    // data.dealnote

    return new Promise((resolve, reject) => {
        // 不能提交
        if (!/^[0-9]+$/.test(data.deal)) {
            return resolve({code: 1, message: '校验错误：金额必须 >= 0'})
        }

        GQuery({
            tblName: 'ly0d10business',
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

// 下单
function status0 (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d10business',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                status_code: '0',
                status_text: code.businessStatus.find(i=>{
                    return i.code === "0"
                }).text
            }
        }).then(() => {
            resolve({code: 0, message: '已下单'})
        })
    })
}

// 完工
function status1 (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d10business',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                status_code: '1',
                status_text: code.businessStatus.find(i=>{
                    return i.code === "1"
                }).text
            }
        }).then(() => {
            resolve({code: 0, message: '已完工'})
        })
    })
}

// 取消
function status2 (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d10business',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                status_code: '2',
                status_text: code.businessStatus.find(i=>{
                    return i.code === "2"
                }).text
            }
        }).then(() => {
            resolve({code: 0, message: '已取消'})
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
    status0,
    status1,
    status2
}
