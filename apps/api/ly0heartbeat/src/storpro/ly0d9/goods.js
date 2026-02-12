import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 物业单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 项目名称 模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }
        // 计费方法
        if (data0.method_code) {
            data1.method_code = data0.method_code
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
    // data.query.name
    // data.query.method_code
    // data.query.price_name
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
                    tblName: "ly0d9goods",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d9goods",
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
        return {code: 1, message: '物业单位：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '项目名称：必填项'}
    }
    if (!data.method_code) {
        return {code: 1, message: '计费方法：必选项'}
    }
    if (!(data.price).code > 0) {
        return {code: 1, message: '单价：必填项，大于 0'}
    }
    if (!(data.self).code > 0) {
        return {code: 1, message: '自助缴费期限：必填项，大于等于 0'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne(data) {
    // data.id_unit
    // data.unit_name
    // data.name
    // data.method_code
    // data.price

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d9unit",
            operator: "findOne",
            query: {
                _id: data.id_unit
            }
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: 'ly0d9goods',
                operator: 'insertOne',
                update: {
                    id_dataunit: objUnit.id_dataunit,
                    dataunit_name: objUnit.dataunit_name,
                    id_unit: objUnit._id,
                    unit_name: objUnit.name,
                    name: data.name,
                    method_code: data.method_code,
                    method_text: code.method.find(i=>{
                        return i.code === data.method_code
                    }).text,
                    price: data.price,
                    self: data.self ? data.self : 0
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
function findOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9goods",
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
    // data.name
    // data.method_code
    // data.price

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d9unit",
            operator: "findOne",
            query: {
                _id: data.id_unit
            }
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: 'ly0d9goods',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    id_dataunit: objUnit.id_dataunit,
                    dataunit_name: objUnit.dataunit_name,
                    id_unit: objUnit._id,
                    unit_name: objUnit.name,
                    name: data.name,
                    method_code: data.method_code,
                    method_text: code.method.find(i=>{
                        return i.code === data.method_code
                    }).text,
                    price: data.price,
                    self: data.self ? data.self : 0
                }
            }).then(() => {
                resolve({code: 0, message: '修改成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d9b_goods",
            operator: "findOne",
            query: {id_goods: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d9b_goods"})
            }

            GQuery({
                tblName: "ly0d9goods",
                operator: "deleteOne",
                query: {_id}
            }).then(() => {
                resolve({code: 0, message: "删除成功"})
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：物业单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_unit) {
            q._id = data.id_unit
        }

        GQuery({
            tblName: "ly0d9unit",
            operator: "find",
            query: q
        }).then(result => {
            let arrUnit = result.data
            resolve({code: 0, messager: "",
                data: {
                    arrUnit,
                    arrMethod: code.method
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
