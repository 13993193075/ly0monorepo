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

        // 场所 _id
        if (data0.id_place) {
            data1.id_place = data0.id_place
        }
        // 释义，模糊匹配
        if (data0.text) {
            data1.text = {'$regex': `.*${data0.text}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_place
    // data.query.text
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
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
                    tblName: "ly0d12position",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d12position",
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
    if (!data.id_place) {
        return {code: 1, message: "场所：必选项"}
    }
    if (!data.text) {
        return {code: 1, message: "释义：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_place
    // data.text

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d12place",
            operator: "findOne",
            query: {
                _id: data.id_place
            }
        }).then(result=>{
            let objPlace = result.data
            GQuery({
                tblName: "ly0d12position",
                operator: "insertOne",
                update: {
                    id_dataunit: objPlace.id_dataunit,
                    dataunit_name: objPlace.dataunit_name,
                    id_place: objPlace._id,
                    place_name: objPlace.name,
                    text: data.text
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
            tblName: "ly0d12position",
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
    // data.id_place
    // data.text

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d12place",
            operator: "findOne",
            query: {
                _id: data.id_place
            }
        }).then(result=>{
            let objPlace = result.data
            GQuery({
                tblName: "ly0d12position",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    id_dataunit: objPlace.id_dataunit,
                    dataunit_name: objPlace.dataunit_name,
                    id_place: objPlace._id,
                    place_name: objPlace.name,
                    text: data.text
                }
            }).then(() => {
                resolve({code: 0, message: "修改成功"})
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d12room",
            operator: "findOne",
            query: {id_position: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d12room"})
            }
            GQuery({
                tblName: "ly0d12appointment",
                operator: "findOne",
                query: {id_position: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: "不能删除，存在关联信息：ly0d12appointment"})
                }

                GQuery({
                    tblName: "ly0d12position",
                    operator: "deleteOne",
                    query: {_id}
                }).then(() => {
                    resolve({code: 0, message: "删除成功"})
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_place 当前用户信息：场所id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_place) {
            q._id = data.id_place
        }

        GQuery({
            tblName: "ly0d12place",
            operator: "find",
            query: q
        }).then(result => {
            let arrPlace = result.data
            resolve({code: 0, message: "",
                data: {
                    arrPlace
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
