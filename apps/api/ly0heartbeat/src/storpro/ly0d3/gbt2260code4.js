import {GQuery} from '../../main/GQuery.js'
import {GBT} from 'packages/ly0utils'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.code2) { // 模糊匹配
        data1.code2 = {'$regex': `.*${data0.code2}.*`}
    }
    if (data0.text2) { // 模糊匹配
        data1.text2 = {'$regex': `.*${data0.text2}.*`}
    }

    if (data0.code4) { // 模糊匹配
        data1.code4 = {'$regex': `.*${data0.code4}.*`}
    }
    if (data0.text4) { // 模糊匹配
        data1.text4 = {'$regex': `.*${data0.text4}.*`}
    }

    return data1
}

// 分页查询
function find (data) {
    // data.query
    // data.query.code2
    // data.query.text2
    // data.query.code4
    // data.query.text4
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
                tblName: 'ly0d3gbt2260code4',
                operator: 'find',
                query,
                sort: {code4: 1},
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d3gbt2260code4',
                operator: 'countDocuments',
                query
            })
        ]).then(result => {
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
    if (!data.code2) {
        return {code: 1, message: '省级编码：必填项'}
    }
    if (!data.text2) {
        return {code: 1, message: '省级区划名称：必填项'}
    }
    if (!data.code4) {
        return {code: 1, message: '市级编码：必填项'}
    }
    if (!data.text4) {
        return {code: 1, message: '市级区划名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.code2
    // data.text2
    // data.code4
    // data.text4

    return new Promise((resolve, reject) => {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d3gbt2260code4',
            operator: 'insertOne',
            update: {
                code2: data.code2,
                text2: data.text2,
                code4: data.code4,
                text4: data.text4
            }
        }).then(result => {
            resolve({code: 0, message: '插入一条记录成功',
                _id: result.dataNew._id
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.code2
    // data.text2
    // data.code4
    // data.text4

    return new Promise((resolve, reject) => {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d3gbt2260code4',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                code2: data.code2,
                text2: data.text2,
                code4: data.code4,
                text4: data.text4
            }
        }).then(() => {
            resolve({code: 0, message: '修改一条记录成功'})
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d3gbt2260code4',
            operator: 'deleteOne',
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: '删除一条记录成功'})
        })
    })
}

// 级联
function code2(data){
    // data.code2

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d3gbt2260code4',
            operator: 'find',
            query: {code2: data.code2}
        }).then(result => {
            resolve({code: 0, message: '',
                arrCode4: result.data
            })
        })
    })
}

// 代码导入
function loadAll(data){
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d3gbt2260code4',
            operator: 'deleteMany',
            query: {}
        }).then(() => {
            GQuery({
                tblName: 'ly0d3gbt2260code4',
                operator: 'insertMany',
                update: GBT.gbt2260code4
            }).then(() => {
                resolve({code: 0, message: '导入成功'})
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    code2,
    loadAll
}
