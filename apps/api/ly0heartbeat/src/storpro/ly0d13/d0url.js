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
    if (data0.id_class) { // 教材分类
        data1.id_class = data0.id_class
    }
    if (data0.name) { // 教材名称 模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    if (data0.number) { // 序号 模糊匹配
        data1.number = {'$regex': `.*${data0.number}.*`}
    }

    return data1
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_class
    // data.query.name
    // data.query.number
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
                tblName: 'ly0d13d0url',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d13d0url',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        url: [i.url && i.url.length > 0 ? imageDomain.domain + i.url[0] : '']
                    })
                }),
                total: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    if (!data.id_class) {
        return {code: 1, message: '教材分类：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '教材名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_class
    // data.name
    // data.number
    // data.url
    const data_url = []
    data.url.forEach(i=>{
        try{
            data_url.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    return new Promise((resolve, reject) => {
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: 'ly0d13d0class',
            operator: 'findOne',
            query: {_id: data.id_class},
        }).then(result => {
            GQuery({
                tblName: 'ly0d13d0url',
                operator: 'insertOne',
                update: {
                    id_class: data.id_class,
                    class_name: result.data.name,
                    name: data.name,
                    number: data.number ? data.number : null
                }
            }).then(result => {
                let dataNew = result.dataNew
                ImageSave.imageAppend({
                    uploaded: data_url[0],
                    tblName: 'ly0d13d0url',
                    fieldName: 'url',
                    dataId: dataNew._id
                }).then(url => {
                    GQuery({
                        tblName: 'ly0d13d0url',
                        operator: 'updateOne',
                        query: {_id: dataNew._id},
                        update: {url: url ? [url] : []}
                    }).then(result => {
                        resolve({code: 0, message: '新增成功',
                            dataNew: result.dataNew
                        })
                    })
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_class
    // data.class_name
    // data.name
    // data.number
    // data.url
    const data_url = []
    data.url.forEach(i=>{
        try{
            data_url.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    return new Promise((resolve, reject) => {
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: 'ly0d13d0url',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            let dataOld = result.data
            ImageSave.imageUpdate({
                uploaded: data_url[0],
                old: dataOld.url[0],
                tblName: 'ly0d13d0url',
                fieldName: 'url',
                dataId: dataOld._id,
            }).then(function (url) {
                GQuery({
                    tblName: 'ly0d13d0class',
                    operator: 'findOne',
                    query: {_id: data.id_class},
                }).then(result => {
                    GQuery({
                        tblName: 'ly0d13d0url',
                        operator: 'updateOne',
                        query: {_id: data._id},
                        update: {
                            id_class: data.id_class,
                            class_name: result.data.name,
                            name: data.name,
                            number: data.number ? data.number : '',
                            url: url ? [url] : []
                        }
                    }).then(result => {
                        resolve({code: 0, message: '修改成功',
                            dataNew: result.dataNew,
                            dataOld: result.dataOld
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
            tblName: 'ly0d13d0url',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            ImageSave.imageDelete(result.data.url[0]).then(function () {
                GQuery({
                    tblName: 'ly0d13d0url',
                    operator: 'deleteOne',
                    query: {_id: data._id}
                }).then(result => {
                    resolve({code: 0, message: '删除成功',
                        dataOld: result.dataOld
                    })
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPgData (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d13d0class',
            operator: 'find',
            query: {},
            sort: {_id: -1}
        }).then(result => {
            resolve({code: 0, message: "",
                data: {
                    arrClass: result.data
                }
            })
        })
    })
}

// 查询全部（教材下载中心）
function findAll (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d13d0class',
            operator: 'find',
            query: {},
            sort: {
                number: 1,
                _id: -1
            }
        }).then(result => {
            let arrClass = result.data
            GQuery({
                tblName: 'ly0d13d0url',
                operator: 'find',
                query: {},
                sort: {
                    number: 1,
                    _id: -1
                }
            }).then(result => {
                let arrUrl = result.data.map(i=>{
                    return Object.assign(i, {
                        url: [i.url && i.url.length > 0 ? imageDomain.domain + i.url[0] : '']
                    })
                })
                resolve({code: 0, message: "",
                    data: {
                        arrClass,
                        arrUrl
                    }
                })
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    findAll
}
