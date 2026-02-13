import {blindboxes} from "@yoooloo42/blindboxes"
const regexp = blindboxes.regexp

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
        // 手机号，模糊匹配
        if (data0.cellphone) {
            data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
        }
        // 姓名，模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find(introduce, data) {
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
                introduce.gquery({
                    tblname: "ly0d9reader",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                introduce.gquery({
                    tblname: "ly0d9reader",
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

// 内部模块：数据约束：新增
function dataRuleInsertOne(introduce, data) {
    return new Promise(function (resolve, reject) {
        if (!data.id_unit) {
            return resolve({code: 1, message: "物业单位：必选项"})
        }
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        let result = regexp.cellphone(data.cellphone)
        if (result.code !== 0) {
            return resolve(result) // 手机号：必填项
        }

        introduce.gquery({
            tblname: "ly0d9reader",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data.length > 0) {
                return resolve({code: 1, message: "手机号重复"})
            }
            resolve({code: 0, message: "可以提交"})
        })
    })
}

// 内部模块：数据约束：修改
function dataRuleUpdateOne(introduce, data) {
    return new Promise(function (resolve, reject) {
        if (!data.id_unit) {
            return resolve({code: 1, message: "物业单位：必选项"})
        }
        if (!data.name) {
            return resolve({code: 1, message: "姓名：必填项"})
        }
        let result = regexp.cellphone(data.cellphone)
        if (result.code !== 0) {
            return resolve(result) // 手机号：必填项
        }

        introduce.gquery({
            tblname: "ly0d9reader",
            operator: "findOne",
            query: {
                id_dataunit: data.id_dataunit,
                _id: {$ne: data._id},
                cellphone: data.cellphone
            }
        }).then(result => {
            if (result.data.length > 0) {
                return resolve({code: 1, message: "手机号重复"})
            }
            resolve({code: 0, message: "可以提交"})
        })
    })
}

// 插入一条记录
function insertOne(introduce, data) {
    // data.id_unit
    // data.cellphone
    // data.name

    return new Promise((resolve, reject) => {
        // 数据约束
        dataRuleInsertOne(introduce, data).then(result => {
            if (result.code === 1) {
                return resolve(result); // 不能提交
            }

            // 提交
            introduce.gquery({
                tblname: "ly0d9unit",
                operator: "findOne",
                query: {
                    _id: data.id_unit
                }
            }).then(result=>{
                let objUnit = result.data[0]
                introduce.gquery({
                    tblname: "ly0d9reader",
                    operator: "insertOne",
                    update: {
                        id_dataunit: objUnit.id_dataunit,
                        dataunit_name: objUnit.dataunit_name,
                        id_unit: objUnit._id,
                        unit_name: objUnit.name,
                        cellphone: data.cellphone,
                        name: data.name
                    }
                }).then(result => {
                    resolve({
                        code: 0, message: "新增成功",
                        _id: result.data [0]._id
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne(introduce, data) {
    // data._id

    return new Promise((resolve, reject) => {
        introduce.gquery({
            tblname: "ly0d9reader",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data [0]
            })
        })
    })
}

// 修改一条记录
function updateOne(introduce, data) {
    // data._id
    // data.id_unit
    // data.cellphone
    // data.name

    return new Promise((resolve, reject) => {
        // 数据约束
        dataRuleUpdateOne(introduce, data).then(result => {
            if (result.code === 1) {
                return resolve(result) // 不能提交
            }

            // 提交
            introduce.gquery({
                tblname: "ly0d9unit",
                operator: "findOne",
                query: {
                    _id: data.id_unit
                }
            }).then(result=>{
                let objUnit = result.data[0]
                introduce.gquery({
                    tblname: "ly0d9reader",
                    operator: "updateOne",
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objUnit.id_dataunit,
                        dataunit_name: objUnit.dataunit_name,
                        id_unit: objUnit._id,
                        unit_name: objUnit.name,
                        cellphone: data.cellphone,
                        name: data.name
                    }
                }).then(() => {
                    resolve({code: 0, message: "修改成功"})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(introduce, data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        introduce.gquery({
            tblname: "ly0d9reader",
            operator: "deleteOne",
            query: {_id}
        }).then(() => {
            resolve({code: 0, message: "删除成功"})
        })
    })
}

// 获取页面初始化数据
function getPageData(introduce, data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：物业单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_unit) {
            q._id = data.id_unit
        }

        introduce.gquery({
            tblname: "ly0d9unit",
            operator: "find",
            query: q
        }).then(result => {
            let arrUnit = result.data
            resolve({code: 0, message: "",
                data: {
                    arrUnit
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
