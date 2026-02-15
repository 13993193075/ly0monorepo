import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    data1.type_code = "1" // 文件上传
    data1.status_code = "0" // 状态：上传
    // 标题 模糊匹配
    if (data0.title) {
        data1.title = {'$regex': `.*${data0.title}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.title
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
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
                tblName: "ly0d6d0",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d6d0",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        url: imageDomain + i.url
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
    if (!data.title) {
        return {code: 1, message: "标题：必填项"}
    }
    if (!data.url) {
        return {code: 1, message: "未上传文件"}
    }
    return {code: 0};
}

// 插入一条记录
function insertOne(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.url
    // data.title
    // data.status_code
    // data.id_upload 当前用户信息：用户 _id
    // data.upload_cellphone 当前用户信息：手机号
    // data.upload_name 当前用户信息：用户名称
    // data.upload_explain

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {
                _id: data.id_dataunit
            }
        }).then(result=>{
            let objDataunit = result.data
            GQuery({
                tblName: "ly0d6d0",
                operator: "insertOne",
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    title: data.title,
                    type_code: "1",
                    type_text: code.d6d0type.find(i=>{
                        return i.code === "1"
                    }).text,
                    status_code: data.status_code,
                    status_text: code.d6d0status.find(i=>{
                        return i.code === data.status_code
                    }).text,
                    id_upload: data.id_upload,
                    upload_cellphone: data.upload_cellphone,
                    upload_name: data.upload_name,
                    upload_explain: data.upload_explain,
                    upload_time: thisTime
                }
            }).then((result) => {
                let newId = result.dataNew._id
                ImageSave.imageAppend({
                    uploaded: data.url,
                    dataunitId: data.id_dataunit,
                    tblName: "ly0d6d0",
                    fieldName: "url",
                    dataId: newId
                }).then(function (url) {
                    GQuery({
                        tblName: "ly0d6d0",
                        operator: "updateOne",
                        query: {_id: newId},
                        update: {url}
                    }).then(() => {
                        resolve({code: 0, message: "新增成功",
                            _id: newId
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
            tblName: "ly0d6d0",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    url: result.data.url
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.url
    // data.title
    // data.status_code
    // data.id_upload 当前用户信息：用户 _id
    // data.upload_cellphone 当前用户信息：手机号
    // data.upload_name 当前用户信息：用户名称
    // data.upload_explain

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d6d0",
            operator: "findOne",
            query: {_id: data._id}
        }).then((result) => {
            let oldData = result.data
            ImageSave.imageUpdate({
                uploaded: data.url,
                old: oldData.url,
                dataunitId: data.id_dataunit,
                tblName: "ly0d6d0",
                fieldName: "url",
                dataId: oldData._id
            }).then(function (url) {
                GQuery({
                    tblName: "ly0d0dataunit",
                    operator: "findOne",
                    query: {
                        _id: data.id_dataunit
                    }
                }).then(result=>{
                    let objDataunit = result.data
                    GQuery({
                        tblName: "ly0d6d0",
                        operator: "updateOne",
                        query: {_id: oldData._id},
                        update: {
                            time_update: thisTime,
                            id_dataunit: objDataunit._id,
                            dataunit_name: objDataunit.name,
                            url,
                            title: data.title,
                            type_code: "1",
                            type_text: code.d6d0type.find(i=>{
                                return i.code === "1"
                            }).text,
                            status_code: data.status_code,
                            status_text: code.d6d0status.find(i=>{
                                return i.code === data.status_code
                            }).text,
                            id_upload: data.id_upload,
                            upload_cellphone: data.upload_cellphone,
                            upload_name: data.upload_name,
                            upload_explain: data.upload_explain,
                            upload_time: thisTime
                        }
                    }).then(() => {
                        resolve({code: 0, message: "修改成功"})
                    })
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id;

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d6d0",
            operator: "findOne",
            query: {_id}
        }).then(result => {
            ImageSave.imageDelete(result.data.url).then(function () {
                GQuery({
                    tblName: "ly0d6d0",
                    operator: "deleteOne",
                    query: {_id}
                }).then(() => {
                    resolve({code: 0, message: "删除成功"})
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
