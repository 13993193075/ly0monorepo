import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.note) { // 备注 模糊匹配
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    return data1
}

function dataRule(data) { // 内部模块：数据约束
    // 不能提交
    if (!data.user) {
        return {code: 1, message: "USER：必填项"}
    }
    if (!data.ukey) {
        return {code: 1, message: "UKEY：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.note
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
                tblName: "ly0d1d1ukey",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d1d1ukey",
                operator: "countDocuments",
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

// 插入一条记录
function insertOne(data) {
    // data.ukey
    // data.user
    // data.note

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d1d1ukey",
            operator: "insertOne",
            update: {
                ukey: data.ukey,
                user: data.user,
                note: data.note ? data.note : ''
            }
        }).then(result => {
            resolve({code: 0, message: "插入一条记录成功",
                _id: result.dataNew._id
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.ukey
    // data.user
    // data.note

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d1d1ukey",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                ukey: data.ukey,
                user: data.user,
                note: data.note ? data.note : ''
            }
        }).then(() => {
            resolve({code: 0, message: "修改一条记录成功"})
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d1d1printer",
            operator: "findOne",
            query: {id_ukey: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d1d1printer"})
            }

            GQuery({
                tblName: "ly0d1d1ukey",
                operator: "deleteOne",
                query: {_id}
            }).then(() => {
                resolve({code: 0, message: "删除一条记录成功"})
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
