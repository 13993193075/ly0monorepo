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
                    tblName: 'ly0d11self',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d11self',
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
        resolve({code: 0, message: '可以提交'})
    })
}

// 插入一条记录
function insertOne (data) {
    // data.id_carpark
    // data.name
    // data.term
    // data.price
    // data.self

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
                    tblName: 'ly0d11self',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objCarpark.id_dataunit,
                        dataunit_name: objCarpark.dataunit_name,
                        id_carpark: objCarpark._id,
                        carpark_name: objCarpark.name,
                        name: data.name,
                        term: data.term ? data.term : "Month",
                        term_text: code.selfTerm.find(i=>{
                            return i.code === data.term
                        }).text,
                        price: !isNaN(Number(data.price)) && Number(data.price) > 0 ? Number(data.price) : 0,
                        self: !isNaN(Number(data.self)) && Number(data.self) > 1 ? Number(data.self) : 1
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
            tblName: 'ly0d11self',
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
    // data.term
    // data.price
    // data.self

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
                    tblName: 'ly0d11self',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objCarpark.id_dataunit,
                        dataunit_name: objCarpark.dataunit_name,
                        id_carpark: objCarpark._id,
                        carpark_name: objCarpark.name,
                        name: data.name,
                        term: data.term ? data.term : "Month",
                        term_text: code.selfTerm.find(i=>{
                            return i.code === data.term
                        }).text,
                        price: !isNaN(Number(data.price)) && Number(data.price) > 0 ? Number(data.price) : 0,
                        self: !isNaN(Number(data.self)) && Number(data.self) > 1 ? Number(data.self) : 1
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
            tblName: 'ly0d11self',
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
                    arrSelfTerm: code.selfTerm
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
