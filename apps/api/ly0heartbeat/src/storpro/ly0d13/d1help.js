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

    // 备注 模糊匹配
    if (data0.note) {
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    return data1
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.note
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
                tblName: 'ly0d13d1help',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: 'ly0d13d1help',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        appendix: [i.appendix && i.appendix.length > 0 ? imageDomain.domain + i.appendix[0] : '']
                    })
                }),
                total: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    return new Promise((resolve, reject) => {
        if (!data.note) {
            return resolve({code: 1, message: '备注不能为空'})
        }
        resolve({code: 0, message: '可以提交'})
    })
}

// 插入一条记录
function insertOne (data) {
    // data.note
    // data.appendix
    const data_appendix = []
    data.appendix.forEach(i=>{
        try{
            data_appendix.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    return new Promise((resolve, reject) => {
        dataRule(data).then(result => { // 提交约束
            if (result.code === 1) {
                return resolve(result)
            }

            GQuery({
                tblName: 'ly0d13d1help',
                operator: 'insertOne',
                update: {
                    note: data.note
                }
            }).then(result => {
                let dataNew = result.dataNew
                ImageSave.imageAppend({
                    uploaded: data_appendix[0],
                    tblName: 'ly0d13d1help',
                    fieldName: 'appendix',
                    dataId: dataNew._id,
                }).then(function (appendix) {
                    GQuery({
                        tblName: 'ly0d13d1help',
                        operator: 'updateOne',
                        query: {_id: dataNew._id},
                        update: {
                            appendix: appendix ? [appendix] : []
                        }
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
    // data.note
    // data.appendix
    const data_appendix = []
    data.appendix.forEach(i=>{
        try{
            data_appendix.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    return new Promise((resolve, reject) => {
        dataRule(data).then(result => { // 提交约束
            if (result.code === 1) {
                return resolve(result)
            }

            GQuery({
                tblName: 'ly0d13d1help',
                operator: 'findOne',
                query: {_id: data._id}
            }).then(result => {
                let dataOld = result.data
                ImageSave.imageUpdate({
                    uploaded: data_appendix[0],
                    old: dataOld.appendix[0],
                    tblName: 'ly0d13d1help',
                    fieldName: 'appendix',
                    dataId: dataOld._id,
                }).then(appendix => {
                    GQuery({
                        tblName: 'ly0d13d1help',
                        operator: 'updateOne',
                        query: {_id: data._id},
                        update: {
                            note: data.note ? data.note : '',
                            appendix: appendix ? [appendix] : []
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
            tblName: 'ly0d13d1help',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            ImageSave.imageDelete(result.data.appendix[0]).then(function () {
                GQuery({
                    tblName: 'ly0d13d1help',
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

export default {
    find,
    insertOne,
    updateOne,
    deleteOne
}
