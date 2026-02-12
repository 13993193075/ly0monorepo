import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.memo) { // 备忘，模糊匹配
        data1.memo = {'$regex': `.*${data0.memo}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.memo
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
                tblName: "ly0d10memo",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d10memo",
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
function dataRule(data) {
    // 不能提交
    if (!data.memo) {
        return {code: 1, message: "备忘：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_business
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data);
        if (message.code === 1) {
            return resolve(message);
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d10business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d10memo",
                operator: "insertOne",
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objBusiness.id_dataunit,
                    dataunit_name: objBusiness.dataunit_name,
                    id_unit: objBusiness.id_unit,
                    unit_name: objBusiness.unit_name,
                    id_business: objBusiness._id,
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name
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
            tblName: "ly0d10memo",
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
    // data.id_business
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d10business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d10memo",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    time_update: thisTime,
                    id_dataunit: objBusiness.id_dataunit,
                    dataunit_name: objBusiness.dataunit_name,
                    id_unit: objBusiness.id_unit,
                    unit_name: objBusiness.unit_name,
                    id_business: objBusiness._id,
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name
                }
            }).then(() => {
                resolve({code: 0, message: "修改成功"})
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d10memo",
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
