import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    // 名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 序号 模糊匹配
    if (data0.number) {
        data1.number = {'$regex': `.*${data0.number}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.name
    // data.query.number
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
                tblName: "ly0d13d0class",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d13d0class",
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

// 内部模块：数据约束
function dataRule(data) {
    if (!data.name) {
        return {code: 1, message: "名称：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.name
    // data.number

    return new Promise((resolve, reject) => {
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d13d0class",
            operator: "insertOne",
            update: {
                name: data.name,
                number: data.number ? data.number : null
            }
        }).then(result => {
            resolve({
                code: 0, message: "新增成功",
                dataNew: result.dataNew
            });
        });
    });
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.name
    // data.number

    return new Promise((resolve, reject) => {
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d13d0class",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                name: data.name,
                number: data.number ? data.number : null
            }
        }).then(result => {
            resolve({code: 0, message: "修改成功",
                dataNew: result.dataNew,
                dataOld: result.dataOld
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d13d0url",
            operator: "findOne",
            query: {id_class: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d13d0url"});
            }

            GQuery({
                tblName: "ly0d13d0class",
                operator: "deleteOne",
                query: {_id}
            }).then(result => {
                resolve({code: 0, message: "删除成功",
                    dataOld: result.dataOld
                })
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
