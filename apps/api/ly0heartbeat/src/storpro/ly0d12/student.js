import {GQuery} from '../../main/GQuery.js'
import {blindboxes} from 'packages/ly0utils'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    if (data0.cellphone) { // 手机号，模糊匹配
        data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
    }
    if (data0.name) { // 姓名 模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.cellphone
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
                tblName: "ly0d12student",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d12student",
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
function dataRuleInsertOne(data) {
    return new Promise(function (resolve, reject) {
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code:1, message: '手机号格式错误'})
        }

        GQuery({
            tblName: "ly0d12student",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "手机号重复"})
            }
            resolve({code: 0, message: "可以提交"})
        })
    })
}

// 插入一条记录
function insertOne(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.cellphone
    // data.name

    return new Promise((resolve, reject) => {
        dataRuleInsertOne(data).then(result => { // 提交约束
            if (result.code !== 0) {
                return resolve(result);
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
                    tblName: "ly0d12student",
                    operator: "insertOne",
                    update: {
                        id_dataunit: objDataunit._id,
                        dataunit_name: objDataunit.name,
                        cellphone: data.cellphone,
                        name: data.name
                    }
                }).then(result => {
                    resolve({
                        code: 0, message: "新增成功",
                        _id: result.dataNew._id
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
            tblName: "ly0d12student",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 内部模块：数据约束
function dataRuleUpdateOne(data) {
    return new Promise(function (resolve, reject) {
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        if (!blindboxes.regexp.cellphone(data.cellphone)) {
            return resolve({code:1, message: '手机号格式错误'})
        }

        GQuery({
            tblName: "ly0d12student",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                _id: {$ne: data._id},
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "手机号重复"})
            }

            resolve({code: 0, message: "可以提交"})
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.cellphone
    // data.name

    return new Promise((resolve, reject) => {
        dataRuleUpdateOne(data).then(result => { // 提交约束
            if (result.code !== 0) {
                return resolve(result)
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
                    tblName: "ly0d12student",
                    operator: "updateOne",
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objDataunit._id,
                        dataunit_name: objDataunit.name,
                        cellphone: data.cellphone,
                        name: data.name
                    }
                }).then(() => {
                    resolve({code: 0, message: "修改成功"})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d12student",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除成功"})
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
