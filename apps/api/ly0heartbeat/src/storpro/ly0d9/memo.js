import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_property = data0.id_property

        // 备忘，模糊匹配
        if (data0.memo) {
            data1.memo = {'$regex': `.*${data0.memo}.*`}
        }

        //记录时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }

        // 制单状态
        if(data0.id_business){
            data1.id_business = data0.id_business
        }else{
            data1.$or = [
                {id_business: {$exists: false}},
                {id_business: null}
            ]
        }
        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_property
    // data.query.memo
    // data.query.time_start
    // data.query.time_end
    // data.query.id_business
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
                    tblName: "ly0d9memo",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: "ly0d9memo",
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
    if (!data.memo) {
        return {code: 1, message: "备忘：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_property
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {
                _id: data.id_property
            }
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9memo",
                operator: "insertOne",
                update: { // 提交
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objProperty.id_dataunit,
                    dataunit_name: objProperty.dataunit_name,
                    id_unit: objProperty.id_unit,
                    unit_name: objProperty.unit_name,
                    id_property: objProperty._id,
                    property_number: objProperty.number,
                    property_name: objProperty.name ? objProperty.name : "",
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name,
                    id_business: null
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
            tblName: "ly0d9memo",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data})
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_property
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {
                _id: data.id_property
            }
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9memo",
                operator: "updateOne",
                query: {_id: data._id},
                update: { // 提交
                    time_update: thisTime,
                    id_dataunit: objProperty.id_dataunit,
                    dataunit_name: objProperty.dataunit_name,
                    id_unit: objProperty.id_unit,
                    unit_name: objProperty.unit_name,
                    id_property: objProperty._id,
                    property_number: objProperty.number,
                    property_name: objProperty.name ? objProperty.name : "",
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name,
                    id_business: null
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
            tblName: "ly0d9memo",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除成功"})
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_property

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9unit",
                operator: "findOne",
                query: {_id: objProperty.id_unit}
            }).then(result => {
                let objUnit = result.data
                resolve({code: 0, message: "",
                    objProperty,
                    objUnit
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
