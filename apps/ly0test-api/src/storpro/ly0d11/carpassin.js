import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js"
import ImageSave from '../../main/image-save.js'
import ly0d11carplateFind from './carplate-find.js'

// 查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}

        if (data0._id) { // _id 必须置于首项查询
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 停车场 _id
        if (data0.id_carpark) {
            data1.id_carpark = data0.id_carpark
        }
        // 车牌 模糊匹配
        if (data0.carplate) {
            data1.carplate = {'$regex': `.*${data0.carplate}.*`}
        }
        // 进入时间
        if (data0.timein_start || data0.timein_end) {
            data1.timein = {};
            if (data0.timein_start) {
                data1.timein.$gte = data0.timein_start
            }
            if (data0.timein_end) {
                data1.timein.$lte = data0.timein_end
            }
        }
        // 离开时间
        if (data0.timeout_start || data0.timeout_end) {
            data1.timeout = {};
            if (data0.timeout_start) {
                data1.timeout.$gte = data0.timeout_start
            }
            if (data0.timeout_end) {
                data1.timeout.$lte = data0.timeout_end
            }
        }

        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_carpark
    // data.query.carplate
    // data.query.timein_start
    // data.query.timein_end
    // data.query.timeout_start
    // data.query.timeout_end
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise(function (resolve, reject) {
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
                    tblName: "ly0d11carpassin",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: "ly0d11carpassin",
                    operator: "countDocuments",
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data.map(i=>{
                        return Object.assign(i, {
                            picturein: imageDomain + i.picturein,
                            pictureout: imageDomain + i.pictureout
                        })
                    }),
                    count: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.id_carpark) {
        return {code: 1, message: "停车场：必选项"}
    }
    if (!data.carplate) {
        return {code: 1, message: "车牌：必填项"}
    }
    if (!data.timein) {
        return {code: 1, message: "进入时间：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_carpark
    // data.carplate
    // data.carwithin
    // data.expiryfrom
    // data.expiryto
    // data.timein
    // data.timeout
    // data.id_pricing
    // data.price
    // data.fee
    // data.note
    // data.picturein
    // data.pictureout

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d11carpark",
            operator: "findOne",
            query: {_id: data.id_carpark}
        }).then(res => {
            let objCarpark = res.data[0]
            GQuery({
                tblName: "ly0d11pricing",
                operator: "findOne",
                query: {_id: data.id_pricing ? data.id_pricing : null}
            }).then(res => {
                let objPricing = data.id_pricing ? res.data[0] : null
                GQuery({
                    tblName: "ly0d11carwithin",
                    operator: "findOne",
                    query: {id_carpark: data.id_carpark, carplate: data.carplate}
                }).then(result => {
                    let objCarwithin = result.data
                    GQuery({
                        tblName: 'ly0d11carpassin',
                        operator: 'insertOne',
                        update: {
                            time_create: thisTime,
                            time_update: thisTime,
                            id_dataunit: objCarpark.id_dataunit,
                            dataunit_name: objCarpark.dataunit_name,
                            id_carpark: objCarpark._id,
                            carpark_name: objCarpark.name,
                            carplate: data.carplate,
                            carwithin: data.carwithin,
                            expiryfrom: data.expiryfrom ? data.expiryfrom : null,
                            expiryto: data.expiryto ? data.expiryto : null,
                            timein: data.timein,
                            timeout: data.timeout ? data.timeout : null,
                            id_pricing: objPricing ? objPricing._id
                                : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.id_pricing
                                    : (objCarpark.id_pricing ? objCarpark.id_pricing : null)),
                            pricing_name: objPricing ? objPricing.name
                                : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.pricing_name
                                    : (objCarpark.id_pricing ? objCarpark.pricing_name : "")),
                            price: data.price ? data.price : 0,
                            fee: data.fee ? data.fee : 0,
                            note: data.note ? data.note : ""
                        }
                    }).then(result => {
                        let newId = result.dataNew._id
                        ImageSave.imageAppend({
                            uploaded: data.picturein,
                            dataunitId: objCarpark.id_dataunit,
                            tblName: 'ly0d11carpassin',
                            fieldName: 'picturein',
                            dataId: newId
                        }).then(function (picturein) {
                            ImageSave.imageAppend({
                                uploaded: data.pictureout,
                                dataunitId: objCarpark.id_dataunit,
                                tblName: 'ly0d11carpassin',
                                fieldName: 'pictureout',
                                dataId: newId
                            }).then(function (pictureout) {
                                GQuery({
                                    tblName: 'ly0d11carpassin',
                                    operator: 'updateOne',
                                    query: {_id: newId},
                                    update: {
                                        picturein: picturein ? picturein : "",
                                        pictureout: picturein ? pictureout : ""
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
        })
    })
}

// 查询一条记录
function findOne(data) {
    // data._id 必填项
    // data.timein 可选项，用于发生新的计费
    // data.timeout 可选项，用于发生新的计费

    return new Promise(function (resolve, reject) {
        if (!data || !data._id) {
            return resolve({code: 1, message: "id错误"})
        }

        let thisTime = new Date();
        GQuery({
            tblName: "ly0d11carpassin",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            let doc = JSON.parse(JSON.stringify(result.data))
            GQuery({
                tblName: "ly0d11carpark",
                operator: "findOne",
                query: {_id: doc.id_carpark}
            }).then(result => {
                let objCarpark = result.data
                GQuery({
                    tblName: "ly0d11carwithin",
                    operator: "findOne",
                    query: {
                        id_carpark: doc.id_carpark,
                        carplate: doc.carplate
                    }
                }).then(result => {
                    let objCarwithin = result.data

                    // 发生新的计费
                    let timein = data.timein ? data.timein : doc.timein
                    let timeout = data.timeout ? data.timeout : (doc.timeout ? doc.timeout : thisTime)
                    ly0d11carplateFind.fee({
                        timein,
                        timeout,
                        carwithin: !!objCarwithin,
                        expiryfrom: !!objCarwithin ? objCarwithin.expiryfrom : null,
                        expiryto: !!objCarwithin ? objCarwithin.expiryto : null,
                        id_pricing: doc.id_pricing ? doc.id_pricing
                            : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.id_pricing
                                : (objCarpark.id_pricing ? objCarpark.id_pricing : null))
                    }).then(res => {
                        let fee = res
                        resolve({
                            code: 0, message: "车牌已查询，找到停车记录",
                            doc: Object.assign(doc, {
                                picturein: imageDomain + doc.picturein,
                                pictureout: imageDomain + doc.pictureout,
                                appendix: {
                                    objCarpark,
                                    objCarwithin,
                                    timein,
                                    timeout,
                                    fee
                                }
                            }) // 原始数据
                        })
                    })
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_carpark
    // data.carplate
    // data.carwithin
    // data.expiryfrom
    // data.expiryto
    // data.timein
    // data.timeout
    // data.id_pricing
    // data.price
    // data.fee
    // data.note
    // data.picturein
    // data.pictureout

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d11carpark",
            operator: "findOne",
            query: {_id: data.id_carpark}
        }).then(res => {
            let objCarpark = res.data[0]
            GQuery({
                tblName: "ly0d11pricing",
                operator: "findOne",
                query: {_id: data.id_pricing ? data.id_pricing : null}
            }).then(res => {
                let objPricing = data.id_pricing ? res.data[0] : null
                GQuery({
                    tblName: "ly0d11carwithin",
                    operator: "findOne",
                    query: {id_carpark: data.id_carpark, carplate: data.carplate}
                }).then(result => {
                    let objCarwithin = result.data
                    GQuery({
                        tblName: 'ly0d11carpassin',
                        operator: 'updateOne',
                        query: {_id: data._id},
                        update: {
                            time_update: thisTime,
                            id_dataunit: objCarpark.id_dataunit,
                            dataunit_name: objCarpark.dataunit_name,
                            id_carpark: objCarpark._id,
                            carpark_name: objCarpark.name,
                            carplate: data.carplate,
                            carwithin: data.carwithin,
                            expiryfrom: data.expiryfrom ? data.expiryfrom : null,
                            expiryto: data.expiryto ? data.expiryto : null,
                            timein: data.timein,
                            timeout: data.timeout ? data.timeout : null,
                            id_pricing: objPricing ? objPricing._id
                                : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.id_pricing
                                    : (objCarpark.id_pricing ? objCarpark.id_pricing : null)),
                            pricing_name: objPricing ? objPricing.name
                                : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.pricing_name
                                    : (objCarpark.id_pricing ? objCarpark.pricing_name : "")),
                            price: data.price ? data.price : 0,
                            fee: data.fee ? data.fee : 0,
                            note: data.note ? data.note : ""
                        }
                    }).then(() => {
                        GQuery({
                            tblName: 'ly0d11carpassin',
                            operator: 'findOne',
                            query: {_id: data._id}
                        }).then(result=>{
                            let oldData = result.data
                            ImageSave.imageUpdate({
                                uploaded: data.picturein,
                                old: oldData.picturein,
                                dataunitId: data.id_dataunit,
                                tblName: 'ly0d11carpassin',
                                fieldName: 'picturein',
                                dataId: data._id
                            }).then(function (picturein) {
                                ImageSave.imageUpdate({
                                    uploaded: data.pictureout,
                                    old: oldData.pictureout,
                                    dataunitId: data.id_dataunit,
                                    tblName: 'ly0d11carpassin',
                                    fieldName: 'pictureout',
                                    dataId: data._id
                                }).then(function (pictureout) {
                                    GQuery({
                                        tblName: 'ly0d11carpassin',
                                        operator: 'updateOne',
                                        query: {_id: data._id},
                                        update: {
                                            picturein: picturein ? picturein : "",
                                            pictureout: picturein ? pictureout : ""
                                        }
                                    }).then(() => {
                                        resolve({code: 0, message: '修改成功'})
                                    })
                                })
                            })
                        })
                    })
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
            tblName: 'ly0d11carpassin',
            operator: 'findOne',
            query: {_id}
        }).then(result => {
            let data = result.data
            ImageSave.imageDelete({url: data.picturein}).then(function () {
                ImageSave.imageDelete({url: data.pictureout}).then(function () {
                    GQuery({
                        tblName: 'ly0d11carpassin',
                        operator: 'deleteOne',
                        query: {_id}
                    }).then(() => {
                        resolve({code: 0, message: '删除成功'})
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_carpark 当前用户信息：停车场id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit},
            q0 = {id_dataunit: data.id_dataunit}
        if (data.id_carpark) {
            q._id = data.id_carpark
            q0.id_carpark = data.id_carpark
        }

        GQuery({
            tblName: 'ly0d11carpark',
            operator: 'find',
            query: q
        }).then(result => {
            let arrCarpark = result.data
            GQuery({
                tblName: 'ly0d11pricing',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrPricing = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrCarpark,
                        arrPricing
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
