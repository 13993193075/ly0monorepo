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

        // 物业单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 项目名称 模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
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
                    tblName: "ly0d9goods0",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d9goods0",
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
    if (!(data.price).code > 0) {
        return {code: 1, message: '单价：必填项，大于 0'}
    }
    if (!(data.self).code > 0) {
        return {code: 1, message: '自助缴费额度：必填项，大于等于 0'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne(data) {
    // data.id_unit
    // data.name
    // data.price
    // data.self
    // data.self0
    // data.id_metername

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
            query: {_id: data.id_unit}
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: "ly0d9metername",
                operator: "findOne",
                query: {_id: data.id_metername ? data.id_metername : null}
            }).then(result=>{
                let objMetername = result.data
                GQuery({
                    tblName: 'ly0d9goods0',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objUnit.id_dataunit,
                        dataunit_name: objUnit.dataunit_name,
                        id_unit: objUnit._id,
                        unit_name: objUnit.name,
                        name: data.name,
                        price: data.price,
                        self: data.self ? data.self : 0,
                        self0: data.self0 ? data.self0 : 0,
                        id_metername: objMetername ? objMetername._id : null,
                        metername: objMetername ? objMetername.metername : ""
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
function findOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9goods0",
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
    // data.price
    // data.self
    // data.self0
    // data.id_metername

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
            query: {_id: data.id_unit}
        }).then(result=>{
            let objUnit = result.data
            GQuery({
                tblName: "ly0d9metername",
                operator: "findOne",
                query: {_id: data.id_metername ? data.id_metername : null}
            }).then(result=>{
                let objMetername = result.data
                GQuery({
                    tblName: 'ly0d9goods0',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objUnit.id_dataunit,
                        dataunit_name: objUnit.dataunit_name,
                        id_unit: objUnit._id,
                        unit_name: objUnit.name,
                        name: data.name,
                        price: data.price,
                        self: data.self ? data.self : 0,
                        self0: data.self0 ? data.self0 : 0,
                        id_metername: objMetername ? objMetername._id : null,
                        metername: objMetername ? objMetername.metername : ""
                    }
                }).then(() => {
                    resolve({code: 0, message: '修改成功'})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d9b_goods0",
            operator: "findOne",
            query: {id_goods: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d9b_goods0"})
            }

            GQuery({
                tblName: "ly0d9goods0",
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
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        }

        GQuery({
            tblName: "ly0d9unit",
            operator: "find",
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: "ly0d9metername",
                operator: "find",
                query: q0
            }).then(result => {
                let arrMetername = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrUnit,
                        arrMetername
                    }
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
    deleteOne,
    getPageData
}
