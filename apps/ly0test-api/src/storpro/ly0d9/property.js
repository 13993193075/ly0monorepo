import {GQuery} from '../../main/GQuery.js'
import {blindboxes} from 'packages/ly0utils/src/index.js'

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

        // 物业单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 户号，模糊匹配
        if (data0.number) {
            data1.number = {'$regex': `.*${data0.number}.*`}
        }
        // 户名，模糊匹配
        if (data0.name) {
            data1.name = {'$regex': `.*${data0.name}.*`}
        }
        // 物业分区 _id
        if (data0.id_position) {
            data1.id_position = data0.id_position
        }
        // 户型 _id
        if (data0.id_sizetype) {
            data1.id_sizetype = data0.id_sizetype
        }
        // 业主手机号
        if (data0.owner_cellphone) {
            data1.owner_cellphone = data0.owner_cellphone
        }
        // 业主名称，模糊匹配
        if (data0.owner_name) {
            data1.owner_name = {'$regex': `.*${data0.owner_name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.number
    // data.query.name
    // data.query.id_position
    // data.query.id_sizetype
    // data.query.owner_cellphone
    // data.query.owner_name
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
                    tblName: 'ly0d9property',
                    operator: 'find',
                    query,
                    sort: {number: 1},
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d9property',
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
    return new Promise((resolve, reject) => {
        if (!data.id_unit) {
            return resolve({code: 1, message: '物业单位：必选项'})
        }
        if (!data.number) {
            return resolve({code: 1, message: '户号：必填项'})
        }

        /*
        if (!data.id_sizetype) {
            return resolve ({code: 1, message: "户型：必填项"});
        }
        */

        if (data.owner_cellphone) { // 选填项
            if (blindboxes.regexp.cellphone(data.owner_cellphone)) {
                return resolve({code: 1, message: '手机号：格式错误'})
            }
        }

        resolve({code: 0, message: '可以提交'})
    })
}

// 插入一条记录
function insertOne (data) {
    // data.id_unit
    // data.number
    // data.name
    // data.id_position
    // data.id_sizetype
    // data.area_builtup
    // data.area_usable
    // data.area
    // data.owner_cellphone
    // data.owner_name

    return new Promise((resolve, reject) => {
        dataRule(data).then(result => { // 数据约束
            if (result.code === 1) {
                return resolve(result.message) // 不能提交
            }

            // 提交
            GQuery({
                tblName: "ly0d9unit",
                operator: "findOne",
                query: {_id: data.id_unit}
            }).then(result=>{
                let objUnit = result.data
                GQuery({
                    tblName: "ly0d9position",
                    operator: "findOne",
                    query: {_id: data.id_position ? data.id_position : null}
                }).then(result=>{
                    let objPosition = result.data
                    GQuery({
                        tblName: "ly0d9sizetype",
                        operator: "findOne",
                        query: {_id: data.id_sizetype ? data.id_sizetype : null}
                    }).then(result=>{
                        let objSizetype = result.data
                        GQuery({
                            tblName: 'ly0d9property',
                            operator: 'insertOne',
                            update: {
                                id_dataunit: objUnit.id_dataunit,
                                dataunit_name: objUnit.dataunit_name,
                                id_unit: objUnit._id,
                                unit_name: objUnit.name,
                                number: data.number,
                                name: data.name ? data.name : null,
                                id_position: objPosition ? objPosition._id : null,
                                position_text: objPosition ? objPosition.text : null,
                                id_sizetype: objSizetype ? objSizetype._id : null,
                                sizetype_name: objSizetype ? objSizetype.name : null,
                                area_builtup: data.area_builtup ? data.area_builtup : null,
                                area_usable: data.area_usable ? data.area_usable : null,
                                area: data.area ? data.area : null,
                                owner_cellphone: data.owner_cellphone ? data.owner_cellphone : null,
                                owner_name: data.owner_name ? data.owner_name : null
                            }
                        }).then(result => {
                            resolve({code: 0, message: '新增成功',
                                _id: result.dataNew._id
                            })
                        })
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9property',
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
    // data.id_unit
    // data.number
    // data.name
    // data.id_position
    // data.id_sizetype
    // data.area_builtup
    // data.area_usable
    // data.area
    // data.owner_cellphone
    // data.owner_name

    return new Promise((resolve, reject) => {
        dataRule(data).then(result => { // 数据约束
            if (result.code === 1) {
                return resolve(result.message)
            }

            // 提交
            GQuery({
                tblName: "ly0d9unit",
                operator: "findOne",
                query: {_id: data.id_unit}
            }).then(result=>{
                let objUnit = result.data
                GQuery({
                    tblName: "ly0d9position",
                    operator: "findOne",
                    query: {_id: data.id_position ? data.id_position : null}
                }).then(result=>{
                    let objPosition = result.data
                    GQuery({
                        tblName: "ly0d9sizetype",
                        operator: "findOne",
                        query: {_id: data.id_sizetype ? data.id_sizetype : null}
                    }).then(result=>{
                        let objSizetype = result.data
                        GQuery({
                            tblName: 'ly0d9property',
                            operator: 'updateOne',
                            query: {_id: data._id},
                            update: {
                                id_dataunit: objUnit.id_dataunit,
                                dataunit_name: objUnit.dataunit_name,
                                id_unit: objUnit._id,
                                unit_name: objUnit.name,
                                number: data.number,
                                name: data.name ? data.name : null,
                                id_position: objPosition ? objPosition._id : null,
                                position_text: objPosition ? objPosition.text : null,
                                id_sizetype: objSizetype ? objSizetype._id : null,
                                sizetype_name: objSizetype ? objSizetype.name : null,
                                area_builtup: data.area_builtup ? data.area_builtup : null,
                                area_usable: data.area_usable ? data.area_usable : null,
                                area: data.area ? data.area : null,
                                owner_cellphone: data.owner_cellphone ? data.owner_cellphone : null,
                                owner_name: data.owner_name ? data.owner_name : null
                            }
                        }).then(() => {
                            resolve({code: 0, message: '修改成功'})
                        })
                    })
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d9business',
            operator: 'findOne',
            query: {id_property: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1,message: '不能删除，存在关联信息：ly0d9business'})
            }
            GQuery({
                tblName: 'ly0d9meterrecord',
                operator: 'findOne',
                query: {id_property: _id}
            }).then(result => {
                if (result.data) {
                    return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9meterrecord'})
                }
                GQuery({
                    tblName: 'ly0d9b_goods',
                    operator: 'findOne',
                    query: {id_property: _id}
                }).then(result => {
                    if (result.data) {
                        return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9b_goods'})
                    }
                    GQuery({
                        tblName: 'ly0d9b_goods0',
                        operator: 'findOne',
                        query: {id_property: _id}
                    }).then(result => {
                        if (result.data) {
                            return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9b_goods0'})
                        }
                        GQuery({
                            tblName: 'ly0d9memo',
                            operator: 'findOne',
                            query: {id_property: _id}
                        }).then(result => {
                            if (result.data) {
                                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d9memo'})
                            }

                            GQuery({
                                tblName: 'ly0d9property',
                                operator: 'deleteOne',
                                query: {_id}
                            }).then(() => {
                                resolve({code: 0, message: '删除成功'})
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData (data) {
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
            tblName: 'ly0d9unit',
            operator: 'find',
            query: q
        }).then(result => {
            let arrUnit = result.data
            GQuery({
                tblName: 'ly0d9position',
                operator: 'find',
                query: q0,
                sort: {code: 1, _id: -1}
            }).then(result => {
                let arrPosition = result.data
                GQuery({
                    tblName: 'ly0d9sizetype',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrSizetype = result.data
                    resolve({code: 0, message: "",
                        data: {
                            arrUnit,
                            arrPosition,
                            arrSizetype
                        }
                    })
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
