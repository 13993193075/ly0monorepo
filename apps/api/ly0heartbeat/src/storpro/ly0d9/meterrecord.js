import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js";

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        // 数据单元
        if(data0.id_dataunit){
            data1.id_dataunit = data0.id_dataunit
        }
        // 物业单位 _id
        if (data0.id_unit) {
            data1.id_unit = data0.id_unit
        }
        // 户号
        if (data0.id_property) {
            data1.id_property = data0.id_property
        }
        // 抄表名称
        if (data0.id_metername) {
            data1.id_metername = data0.id_metername
        }
        // 抄表时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }
        // 抄表备注 模糊匹配
        if (data0.note) {
            data1.note = {'$regex': `.*${data0.note}.*`}
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
    // data.query.id_property
    // data.query.id_metername
    // data.query.time_start
    // data.query.time_end
    // data.query.note
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
                    tblName: 'ly0d9meterrecord',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'countDocuments',
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data.map(i=>{
                        return Object.assign(i, {
                            photo: imageDomain + i.photo
                        })
                    }),
                    count: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.id_property) {
        return {code: 1, message: '物业：必选项'}
    }
    if (!data.id_metername) {
        return {code: 1, message: '抄表名称：必选项'}
    }
    if (!(/^[0-9]+\.?[0-9]*$/.test(data.readout))) {
        return {code: 1, message: '本次抄表：必填项，大于等于 0'}
    }
    if (!data.time) {
        return {code: 1, message: '抄表时间：必填项'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_property
    // data.id_metername
    // data.readout
    // data.time
    // data.note
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称
    // data.photo
    // data.id_business

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9metername",
                operator: "findOne",
                query: {_id: data.id_metername ? data.id_metername : null}
            }).then(result=>{
                let objMetername = result.data
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'insertOne',
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: objProperty.id_dataunit,
                        dataunit_name: objProperty.dataunit_name,
                        id_unit: objProperty.id_unit,
                        unit_name: objProperty.unit_name,
                        id_property: objProperty._id,
                        property_number: objProperty.number,
                        property_name: objProperty.name ? objProperty.name : null,
                        id_metername: objMetername ? objMetername._id : null,
                        metername: objMetername ? objMetername.metername : "",
                        readout: data.readout,
                        time: data.time,
                        note: data.note ? data.note : null,
                        recorder_cellphone: data.recorder_cellphone,
                        recorder_name: data.recorder_name,
                        id_business: data.id_business ? data.id_business : null,
                    }
                }).then(result => {
                    let newId = result.dataNew._id
                    ImageSave.imageAppend({
                        dataunitId: data.id_dataunit,
                        tblName: 'ly0d9meterrecord',
                        fieldName: 'photo',
                        dataId: newId,
                        src: data.photo
                    }).then(function (photo) {
                        GQuery({
                            tblName: 'ly0d9meterrecord',
                            operator: 'updateOne',
                            query: {_id: newId},
                            update: {
                                photo: photo ? photo : null
                            }
                        }).then(() => {
                            resolve({code: 0, message: '新增成功',
                                _id: newId
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
            tblName: 'ly0d9meterrecord',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    photo: result.data.photo
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_property
    // data.id_metername
    // data.readout
    // data.time
    // data.note
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称
    // data.photo
    // data.id_business

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9metername",
                operator: "findOne",
                query: {_id: data.id_metername ? data.id_metername : null}
            }).then(result=>{
                let objMetername = result.data
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'findOne',
                    query: {_id: data._id}
                }).then(result => {
                    let oldData = result.data
                    ImageSave.imageUpdate({
                        dataunitId: data.id_dataunit,
                        tblName: 'ly0d9meterrecord',
                        fieldName: 'photo',
                        dataId: oldData._id,
                        srcNew: data.photo,
                        srcOld: oldData.photo
                    }).then(function (photo) {
                        GQuery({
                            tblName: 'ly0d9meterrecord',
                            operator: 'updateOne',
                            query: {_id: data._id},
                            update: { // 提交
                                time_update: thisTime,
                                id_dataunit: objProperty.id_dataunit,
                                dataunit_name: objProperty.dataunit_name,
                                id_unit: objProperty.id_unit,
                                unit_name: objProperty.unit_name,
                                id_property: objProperty._id,
                                property_number: objProperty.number,
                                property_name: objProperty.name ? objProperty.name : null,
                                id_metername: objMetername ? objMetername._id : null,
                                metername: objMetername ? objMetername.metername : "",
                                readout: data.readout,
                                time: data.time,
                                photo: photo ? photo : null,
                                note: data.note ? data.note : null,
                                recorder_cellphone: data.recorder_cellphone,
                                recorder_name: data.recorder_name,
                                id_business: data.id_business ? data.id_business : null,
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
            tblName: 'ly0d9meterrecord',
            operator: 'findOne',
            query: {_id}
        }).then(result => {
            let data = result.data
            ImageSave.imageDelete(data.photo).then(function () {
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'deleteOne',
                    query: {_id}
                }).then(() => {
                    resolve({code: 0, message: '删除成功'})
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
                query: q0
            }).then(result => {
                let arrPosition = result.data
                GQuery({
                    tblName: 'ly0d9property',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrProperty = result.data
                    GQuery({
                        tblName: 'ly0d9metername',
                        operator: 'find',
                        query: q0
                    }).then(result => {
                        let arrMetername = result.data
                        resolve({code: 0, message: "",
                            data: {
                                arrUnit,
                                arrPosition,
                                arrProperty,
                                arrMetername
                            }
                        })
                    })
                })
            })
        })
    })
}

function meterreading (data) {
    // data._id
    // data.readout
    // data.note

    return new Promise((resolve, reject) => {
        // 数据约束
        if (!(/^[0-9]+\.*[0-9]*$/.test(data.readout))) {
            return resolve({
                code: 1,
                message: '必填，数字，大于等于 0'
            })
        }

        // 提交
        GQuery({
            tblName: 'ly0d9meterrecord',
            operator: 'updateOne',
            query: {_id: data._id},
            update: { // 提交
                readout: data.readout,
                note: data.note ? data.note : null
            }
        }).then(() => {
            resolve({code: 0, message: '提交成功'})
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne,
    getPageData,
    meterreading
}
