import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js"
import ImageSave from '../../main/image-save.js'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    // 课程_id
    if (data0.id_class) {
        data1.id_class = data0.id_class
    }
    // 课件名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_class
    // data.query.name
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
            sort = {class_name: 1, name: 1}
        }

        Promise.all([
            GQuery({
                tblName: 'ly0d15lession',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d15lession',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        video: imageDomain + i.video,
                        poster: imageDomain + i.poster,
                    })
                }),
                count: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.id_class) {
        return {code: 1, message: '课程：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '课件名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_class
    // data.name
    // data.video
    // data.poster
    // data.duration

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d15class",
            operator: "findOne",
            query: {
                _id: data.id_class
            }
        }).then(result=>{
            let objClass = result.data
            GQuery({
                tblName: 'ly0d15lession',
                operator: 'insertOne',
                update: {
                    id_dataunit: objClass.id_dataunit,
                    dataunit_name: objClass.dataunit_name,
                    id_class: objClass._id,
                    class_name: objClass.name,
                    name: data.name
                }
            }).then(result => {
                let objLession = result.data
                // 视频处理
                ImageSave.imageAppend({
                    dataunitId: objLession.id_dataunit,
                    tblName: "ly0d15lession",
                    fieldName: "video",
                    dataId: objLession._id,
                    src: data.video
                }).then(video=>{
                    // 封面处理
                    ImageSave.imageAppend({
                        dataunitId: objLession.id_dataunit,
                        tblName: "ly0d15lession",
                        fieldName: "poster",
                        dataId: objLession._id,
                        src: data.poster
                    }).then(poster=>{
                        GQuery({
                            tblName: "ly0d15lession",
                            operator: "updateOne",
                            query: {_id: objLession._id},
                            update: {
                                video,
                                poster,
                                duration: "duration" in data && data.duration > 0 ? data.duration : 0
                            }
                        }).then(() => {
                            resolve({code: 0, message: '提交成功',
                                _id: objLession._id
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
            tblName: 'ly0d15lession',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            resolve({
                doc: Object.assign(result.data, {
                    video: imageDomain + result.data.video,
                    poster: imageDomain + result.data.poster,
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_class
    // data.name
    // data.videoDelete
    // data.videoNew
    // data.posterDelete
    // data.posterNew
    // data.duration

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        GQuery({
            tblName: "ly0d15class",
            operator: "findOne",
            query: {
                _id: data.id_class
            }
        }).then(result=>{
            let objClass = result.data
            GQuery({
                tblName: "ly0d15lession",
                operator: "findOne",
                query: {
                    _id: data._id
                }
            }).then(result=>{
                let objLessionOld = result.data
                // 视频处理
                ImageSave.imageUpdate({
                    dataunitId: objLessionOld.id_dataunit,
                    tblName: "ly0d15lession",
                    fieldName: "video",
                    dataId: objLessionOld._id,
                    srcOld: objLessionOld.video,
                    deleteOld: "videoDelete" in data && (data.videoDelete === true || data.videoDelete === "true"),
                    srcNew: data.videoNew
                }).then(video=>{
                    // 封面处理
                    ImageSave.imageUpdate({
                        dataunitId: objLessionOld.id_dataunit,
                        tblName: "ly0d15lession",
                        fieldName: "poster",
                        dataId: objLessionOld._id,
                        srcOld: objLessionOld.poster,
                        deleteOld: "posterDelete" in data && (data.posterDelete === true || data.posterDelete === "true"),
                        srcNew: data.posterNew
                    }).then(poster=>{
                        GQuery({
                            tblName: 'ly0d15lession',
                            operator: 'updateOne',
                            query: {_id: data._id},
                            update: {
                                id_dataunit: objClass.id_dataunit,
                                dataunit_name: objClass.dataunit_name,
                                id_class: objClass._id,
                                class_name: objClass.name,
                                name: data.name,
                                video,
                                poster,
                                duration: "duration" in data && data.duration > 0 ? data.duration : 0
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
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d15learning',
            operator: 'findOne',
            query: {id_lession: data._id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d15learning'})
            }
            GQuery({
                tblName: 'ly0d15lession',
                operator: 'findOne',
                query: {_id: data._id}
            }).then(result => {
                let objLession = result.data

                // 视频处理
                ImageSave.imageDelete(objLession.video).then(function () {
                    // 封面处理
                    ImageSave.imagesDelete(objLession.poster).then(()=>{
                        GQuery({
                            tblName: 'ly0d15lession',
                            operator: 'deleteOne',
                            query: {_id: data._id}
                        }).then(() => {
                            resolve({code: 0, message: '删除成功'})
                        })
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d15class",
            operator: "find",
            query: {id_dataunit: data.id_dataunit}
        }).then(result => {
            let arrClass = result.data
            resolve({code: 0, message: "",
                data: {
                    arrClass
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
