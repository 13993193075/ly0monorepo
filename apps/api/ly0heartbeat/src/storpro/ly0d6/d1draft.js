import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save.js'
import {FileDB} from '@yoooloo42/ihavebacking'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    data1.status_code = "0" // 状态：拟稿
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
                tblName: "ly0d6d1",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d6d1",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        content: FileDB.richtext.addPrefixToRelativeSrc(i.content, imageDomain)
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
    if (!data.title) {
        return {code: 1, message: "标题：必填项"}
    }
    if (!data.content) {
        return {code: 1, message: "内容：必填项"}
    }
    return {code: 0}
}

// 插入一条记录
function insertOne(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.content
    // data.appendix
    // data.title
    // data.status_code
    // data.id_draft 当前用户信息：用户 _id
    // data.draft_cellphone 当前用户信息：手机号
    // data.draft_name 当前用户信息：用户名称
    // data.draft_explain

    return new Promise((resolve, reject) => {
        let message = dataRule(data); // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

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
                tblName: "ly0d6d1",
                operator: "insertOne",
                update: { // 数据提交
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    title: data.title,
                    status_code: data.status_code,
                    status_text: code.d6d1status.find(i=>{
                        return i.code === data.status_code
                    }).text,
                    id_draft: data.id_draft,
                    draft_cellphone: data.draft_cellphone,
                    draft_name: data.draft_name,
                    draft_explain: data.draft_explain ? data.draft_explain : "",
                    draft_time: thisTime
                }
            }).then(result => {
                let newId = result.dataNew._id

                ImageSave.richtextAppend({ // 内容
                    richtext: data.content,
                    dataunitId: data.id_dataunit,
                    tblName: "ly0d6d1",
                    fieldName: "content",
                    dataId: newId
                }).then(function (content) {
                    ImageSave.imageAppend({ // 附件
                        uploaded: data.appendix,
                        dataunitId: data.id_dataunit,
                        tblName: "ly0d6d1",
                        fieldName: "appendix",
                        dataId: newId
                    }).then(function (appendix) {
                        GQuery({
                            tblName: "ly0d6d1",
                            operator: "updateOne",
                            query: {_id: newId},
                            update: {content, appendix}
                        }).then(() => {
                            resolve({
                                code: 0, message: "提交成功",
                                _id: newId
                            })
                        })
                    })
                })
            })
        })
    })
}

// 插入一条记录
function insertOne0(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.content
    // data.appendix
    // data.title
    // data.status_code
    // data.id_draft 当前用户信息：用户 _id
    // data.draft_cellphone 当前用户信息：手机号
    // data.draft_name 当前用户信息：用户名称
    // data.draft_explain

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

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
                tblName: "ly0d6d1",
                operator: "insertOne",
                update: { // 数据提交
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    content: data.content,
                    title: data.title,
                    status_code: data.status_code,
                    status_text: code.d6d1status.find(i=>{
                        return i.code === data.status_code
                    }).text,
                    id_draft: data.id_draft,
                    draft_cellphone: data.draft_cellphone,
                    draft_name: data.draft_name,
                    draft_explain: data.draft_explain ? data.draft_explain : "",
                    draft_time: thisTime

                }
            }).then(result => {
                let newId = result.dataNew._id
                ImageSave.imageAppend({ // 附件
                    uploaded: data.appendix,
                    dataunitId: data.id_dataunit,
                    tblName: "ly0d6d1",
                    fieldName: "appendix",
                    dataId: newId
                }).then(function (appendix) {
                    GQuery({
                        tblName: "ly0d6d1",
                        operator: "updateOne",
                        query: {_id: newId},
                        update: {appendix}
                    }).then(() => {
                        resolve({code: 0, message: "提交成功",
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
            tblName: "ly0d6d1",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    content: FileDB.richtext.addPrefixToRelativeSrc(result.data.content, imageDomain),
                    appendix: imageDomain + result.data.appendix
                })
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.content
    // data.appendix
    // data.title
    // data.status_code
    // data.id_draft 当前用户信息：用户 _id
    // data.draft_cellphone 当前用户信息：手机号
    // data.draft_name 当前用户信息：用户名称
    // data.draft_explain

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d6d1",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            let dataOld = result.data
            ImageSave.richtextUpdate({
                richtextNew: data.content,
                richtextOld: dataOld.content,
                dataunitId: data.id_dataunit,
                tblName: "ly0d6d1",
                fieldName: "content",
                dataId: dataOld._id
            }).then(function (content) { // 内容
                ImageSave.imageUpdate({
                    uploaded: data.appendix,
                    old: dataOld.appendix,
                    dataunitId: data.id_dataunit,
                    tblName: "ly0d6d1",
                    fieldName: "appendix",
                    dataId: dataOld._id
                }).then(function (appendix) { // 附件
                    GQuery({
                        tblName: "ly0d0dataunit",
                        operator: "findOne",
                        query: {
                            _id: data.id_dataunit
                        }
                    }).then(result=>{
                        let objDataunit = result.data
                        GQuery({
                            tblName: "ly0d6d1",
                            operator: "updateOne",
                            query: {_id: dataOld._id},
                            update: { // 数据提交
                                time_update: thisTime,
                                id_dataunit: objDataunit._id,
                                dataunit_name: objDataunit.name,
                                title: data.title,
                                content: content,
                                appendix: appendix,
                                status_code: data.status_code,
                                status_text: code.d6d1status.find(i=>{
                                    return i.code === data.status_code
                                }).text,
                                id_draft: data.id_draft,
                                draft_cellphone: data.draft_cellphone,
                                draft_name: data.draft_name,
                                draft_explain: data.draft_explain,
                                draft_time: thisTime
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

// 修改一条记录
function updateOne0(data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.content
    // data.appendix
    // data.title
    // data.status_code
    // data.id_draft 当前用户信息：用户 _id
    // data.draft_cellphone 当前用户信息：手机号
    // data.draft_name 当前用户信息：用户名称
    // data.draft_explain

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d6d1",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            let dataOld = result.data
            ImageSave.imageUpdate({
                uploaded: data.appendix,
                old: dataOld.appendix,
                dataunitId: data.id_dataunit,
                tblName: "ly0d6d1",
                fieldName: "appendix",
                dataId: dataOld._id
            }).then(function (appendix) { // 附件
                GQuery({
                    tblName: "ly0d0dataunit",
                    operator: "findOne",
                    query: {
                        _id: data.id_dataunit
                    }
                }).then(result=>{
                    let objDataunit = result.data
                    GQuery({
                        tblName: "ly0d6d1",
                        operator: "updateOne",
                        query: {_id: dataOld._id},
                        update: { // 数据提交
                            time_update: thisTime,
                            id_dataunit: objDataunit._id,
                            dataunit_name: objDataunit.name,
                            title: data.title,
                            content: data.content,
                            appendix: appendix,
                            status_code: data.status_code,
                            status_text: code.d6d1status.find(i=>{
                                return i.code === data.status_code
                            }).text,
                            id_draft: data.id_draft,
                            draft_cellphone: data.draft_cellphone,
                            draft_name: data.draft_name,
                            draft_explain: data.draft_explain,
                            draft_time: thisTime
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
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d6d1",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            ImageSave.richtextDelete({richtext: result.data.content}).then(function () {
                ImageSave.imageDelete({url: result.data.appendix}).then(function () {
                    GQuery({
                        tblName: "ly0d6d1",
                        operator: "deleteOne",
                        query: {_id: data._id}
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
    insertOne0,
    findOne,
    updateOne,
    updateOne0,
    deleteOne
}
