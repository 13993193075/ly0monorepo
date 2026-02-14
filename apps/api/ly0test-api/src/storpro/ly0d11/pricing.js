import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"

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

        // 停车场 _id
        if (data0.id_carpark) {
            data1.id_carpark = data0.id_carpark
        }
        // 项目名称 模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_carpark
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise(function (resolve, reject) {
        queryRevise(data.query).then(query => { // 查询修正
            //   排序
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
                    tblName: 'ly0d11pricing',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d11pricing',
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
    return new Promise(function (resolve, reject) {
        if (!data.id_carpark) {
            return resolve({code: 1, message: '停车场：必选项'})
        }
        if (!data.name) {
            return resolve({code: 1, message: '项目名称：必填项'})
        }
        if (!data.type || (data.type !== "0" && data.type !== "1" && data.type !== "2")) {
            return resolve({code: 1, message: "计价类型不存在"})
        }
        resolve({code: 0, message: '可以提交'})
    })
}

// 插入一条记录
function insertOne (data) {
    // data.id_carpark
    // data.name
    // data.type
    // ...

    return new Promise(function (resolve, reject) {
        dataRule(data).then(result => { // 提交约束
            if (result.code !== 0) {
                return resolve(result)
            }

            // 提交
            GQuery({
                tblName: "ly0d11carpark",
                operator: "findOne",
                query: {_id: data.id_carpark}
            }).then(result=>{
                let objCarpark = result.data
                GQuery({
                    tblName: 'ly0d11pricing',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objCarpark.id_dataunit,
                        dataunit_name: objCarpark.dataunit_name,
                        id_carpark: objCarpark._id,
                        carpark_name: objCarpark.name,
                        name: data.name,
                        type: data.type,
                        type_text: code.pricingType.find(i=>{
                            return i.code === data.type
                        }).text,
    
                        fee1hour: data.fee1hour  ? data.fee1hour : 0,
                        fee1minimum: data.fee1minimum  ? data.fee1minimum : 0,
                        fee1maximum: data.fee1maximum  ? data.fee1maximum : 0,
                        fee1free: data.fee1free  ? data.fee1free : 0,
    
                        fee2first: data.fee2first  ? data.fee2first : 0,
                        fee2hour: data.fee2hour  ? data.fee2hour : 0,
                        fee2term: data.fee2term  ? data.fee2term : 0,
                        fee2again: data.fee2again  ? data.fee2again : 0,
                        fee2free_minutes: data.fee2free_minutes  ? data.fee2free_minutes : 0,
                        fee2free_slot_start_hours: data.fee2free_slot_start_hours  ? data.fee2free_slot_start_hours : 0,
                        fee2free_slot_start_minutes: data.fee2free_slot_start_minutes  ? data.fee2free_slot_start_minutes : 0,
                        fee2free_slot_end_hours: data.fee2free_slot_end_hours  ? data.fee2free_slot_end_hours : 0,
                        fee2free_slot_end_minutes: data.fee2free_slot_end_minutes  ? data.fee2free_slot_end_minutes : 0
                    }
                }).then(result => {
                    resolve({code: 0, message: '新增成功',
                        _id: result.dataNew._id
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne (data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d11pricing',
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
    // data.id_carpark
    // data.name
    // data.type
    // ...

    return new Promise(function (resolve, reject) {
        dataRule(data).then(result => { // 提交约束
            if (result.code !== 0) {
                return resolve(result)
            }

            // 提交
            GQuery({
                tblName: "ly0d11carpark",
                operator: "findOne",
                query: {_id: data.id_carpark}
            }).then(result=>{
                let objCarpark = result.data
                GQuery({
                    tblName: 'ly0d11pricing',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objCarpark.id_dataunit,
                        dataunit_name: objCarpark.dataunit_name,
                        id_carpark: objCarpark._id,
                        carpark_name: objCarpark.name,
                        name: data.name,
                        type: data.type,
                        type_text: code.pricingType.find(i=>{
                            return i.code === data.type
                        }).text,
    
                        fee1hour: data.fee1hour  ? data.fee1hour : 0,
                        fee1minimum: data.fee1minimum  ? data.fee1minimum : 0,
                        fee1maximum: data.fee1maximum  ? data.fee1maximum : 0,
                        fee1free: data.fee1free  ? data.fee1free : 0,
    
                        fee2first: data.fee2first  ? data.fee2first : 0,
                        fee2hour: data.fee2hour  ? data.fee2hour : 0,
                        fee2term: data.fee2term  ? data.fee2term : 0,
                        fee2again: data.fee2again  ? data.fee2again : 0,
                        fee2free_minutes: data.fee2free_minutes  ? data.fee2free_minutes : 0,
                        fee2free_slot_start_hours: data.fee2free_slot_start_hours  ? data.fee2free_slot_start_hours : 0,
                        fee2free_slot_start_minutes: data.fee2free_slot_start_minutes  ? data.fee2free_slot_start_minutes : 0,
                        fee2free_slot_end_hours: data.fee2free_slot_end_hours  ? data.fee2free_slot_end_hours : 0,
                        fee2free_slot_end_minutes: data.fee2free_slot_end_minutes  ? data.fee2free_slot_end_minutes : 0
                    }
                }).then(() => {
                    resolve({code: 0, message: '修改成功'})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d11pricing',
            operator: 'deleteOne',
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: '删除成功'})
        })
    })
}

// 获取页面初始化数据
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_carpark 当前用户信息：停车场id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_carpark) {
            q._id = data.id_carpark
        }

        GQuery({
            tblName: 'ly0d11carpark',
            operator: 'find',
            query: q
        }).then(result => {
            resolve({code: 0, message: "",
                data: {
                    arrCarpark: result.data,
                    arrPricingType: code.pricingType
                }
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
