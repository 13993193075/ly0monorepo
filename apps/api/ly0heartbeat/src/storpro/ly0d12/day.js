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
        // 星期几
        if (data0.day && data0.day >= 0 && data0.day <= 6) {
            data1.day = data0.day
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
    // data.query.day
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
                    tblName: "ly0d12day",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d12day",
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
    if (!/^[0-6]$/.test(data.day)) {
        return {code: 1, message: "星期几：必填项，0-6"}
    }
    if (!(/^[0-9]{1,2}$/.test(data.openfrom_hh) && data.openfrom_hh <= 23)) {
        return {code: 1, message: "起始时间：时：必填项，0-23"}
    }
    if (!(/^[0-9]{1,2}$/.test(data.openfrom_mm) && data.openfrom_mm <= 59)) {
        return {code: 1, message: "起始时间：分：必填项，0-59"}
    }
    if (!(/^[0-9]{1,2}$/.test(data.opento_hh) && data.opento_hh <= 23)) {
        return {code: 1, message: "截止时间：时：必填项，0-23"}
    }
    if (!(/^[0-9]{1,2}$/.test(data.opento_mm) && data.opento_mm <= 59)) {
        return {code: 1, message: "截止时间：分：必填项，0-59"}
    }
    if (Number(data.openfrom_hh) > Number(data.opento_hh)
        || (Number(data.openfrom_hh) === Number(data.opento_hh)
            && Number(data.openfrom_mm) > Number(data.opento_mm))
    ) {
        return {code: 1, message: "起始时间不能大于截止时间"}
    }

    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_place
    // data.day
    // data.openfrom_hh
    // data.openfrom_mm
    // data.opento_hh
    // data.opento_mm

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
                tblName: "ly0d12day",
                operator: "insertOne",
                update: {
                    id_dataunit: objPlace.id_dataunit,
                    dataunit_name: objPlace.dataunit_name,
                    id_place: objPlace._id,
                    place_name: objPlace.name,
                    day: data.day,
                    openfrom_hh: data.openfrom_hh,
                    openfrom_mm: data.openfrom_mm,
                    opento_hh: data.opento_hh,
                    opento_mm: data.opento_mm
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
            tblName: "ly0d12day",
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
    // data.day
    // data.openfrom_hh
    // data.openfrom_mm
    // data.opento_hh
    // data.opento_mm

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
                tblName: "ly0d12day",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    id_dataunit: objPlace.id_dataunit,
                    dataunit_name: objPlace.dataunit_name,
                    id_place: objPlace._id,
                    place_name: objPlace.name,
                    day: data.day,
                    openfrom_hh: data.openfrom_hh,
                    openfrom_mm: data.openfrom_mm,
                    opento_hh: data.opento_hh,
                    opento_mm: data.opento_mm
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
            tblName: "ly0d12appointment",
            operator: "findOne",
            query: {id_day: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "不能删除，存在关联信息：ly0d12appointment"})
            }

            GQuery({
                tblName: "ly0d12day",
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
