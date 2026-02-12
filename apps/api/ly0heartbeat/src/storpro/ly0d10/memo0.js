import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js";

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
                tblName: "ly0d10memo0",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d10memo0",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        photo: imageDomain + i.photo,
                        appendix: imageDomain + i.appendix
                    })
                }),
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
    // data.photo
    // data.appendix

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data);
        if (message.code === 1) {
            return resolve(message);
        }

        // 提交
        let thisTime = new Date();
        GQuery({
            tblName: "ly0d10business0",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d10memo0",
                operator: "insertOne",
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objBusiness.id_dataunit,
                    dataunit_name: objBusiness.dataunit_name,
                    id_unit: objBusiness.id_unit,
                    unit_name: objBusiness.unit_name,
                    id_business: data.id_business,
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name
                }
            }).then(result => {
                let newId = result.dataNew._id

                // 图片处理
                ImageSave.imageAppend({
                    dataunitId: objBusiness.id_dataunit,
                    tblName: "ly0d10memo0",
                    fieldName: "photo",
                    dataId: newId,
                    src: data.photo
                }).then(function (photo) {
                    ImageSave.imageAppend({
                        dataunitId: objBusiness.id_dataunit,
                        tblName: "ly0d10memo0",
                        fieldName: "appendix",
                        dataId: newId,
                        src: data.appendix
                    }).then(function (appendix) {
                        GQuery({
                            tblName: "ly0d10memo0",
                            operator: "updateOne",
                            query: {_id: newId},
                            update: {
                                photo: photo ? photo : null,
                                appendix: appendix ? appendix : null
                            }
                        }).then(() => {
                            resolve({code: 0, message: "新增成功",
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
function findOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d10memo0",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    photo: imageDomain + result.data.photo,
                    appendix: imageDomain + result.data.appendix
                })
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
    // data.photo
    // data.appendix

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d10business0",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d10memo0",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    time_update: thisTime,
                    id_dataunit: objBusiness.id_dataunit,
                    dataunit_name: objBusiness.dataunit_name,
                    id_unit: objBusiness.id_unit,
                    unit_name: objBusiness.unit_name,
                    id_business: data.id_business,
                    memo: data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name
                }
            }).then(() => {
                // 图片处理
                ImageSave.imageAppend({
                    dataunitId: objBusiness.id_dataunit,
                    tblName: "ly0d10memo0",
                    fieldName: "photo",
                    dataId: data._id,
                    src: data.photo
                }).then(function (photo) {
                    ImageSave.imageAppend({
                        dataunitId: objBusiness.id_dataunit,
                        tblName: "ly0d10memo0",
                        fieldName: "appendix",
                        dataId: data._id,
                        src: data.appendix
                    }).then(function (appendix) {
                        GQuery({
                            tblName: "ly0d10memo0",
                            operator: "updateOne",
                            query: {_id: data._id},
                            update: {
                                photo: photo ? photo : null,
                                appendix: appendix ? appendix : null
                            }
                        }).then(() => {
                            resolve({code: 0, message: "修改成功"})
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
            tblName: "ly0d10memo0",
            operator: "findOne",
            query: {_id}
        }).then(result => {
            let data = result.data
            ImageSave.imageDelete(data.photo).then(function () {
                ImageSave.imageDelete(data.appendix).then(function () {
                    GQuery({
                        tblName: "ly0d10memo0",
                        operator: "deleteOne",
                        query: {_id}
                    }).then(() => {
                        resolve({code: 0, message: "删除成功"})
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
    deleteOne
}
