import {GQuery} from '../../main/GQuery.js'

// 查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}

        if (data0._id) { // _id 必须置于首项查询
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 停车场 _id
        if (data0.id_carpark) {
            data1.id_carpark = data0.id_carpark
        }
        // 车位 模糊匹配
        if (data0.parking) {
            data1.parking = {'$regex': `.*${data0.parking}.*`}
        }
        // 车牌 模糊匹配
        if (data0.carplate) {
            data1.carplate = {'$regex': `.*${data0.carplate}.*`}
        }
        // 有效期截止日期
        if (data0.expiryto_start || data0.expiryto_end) {
            data1.expiryto = {}
            if (data0.expiryto_start) {
                data1.expiryto.$gte = data0.expiryto_start
            }
            if (data0.expiryto_end) {
                data1.expiryto.$lte = data0.expiryto_end
            }
        }
        // 车主手机号 模糊匹配
        if (data0.cellphone) {
            data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_carpark
    // data.query.parking
    // data.query.carplate
    // data.query.expiryto_start
    // data.query.expiryto_end
    // data.query.cellphone
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
                    tblName: 'ly0d11carwithin',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d11carwithin',
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
    // 不能提交
    if (!data.id_carpark) {
        return {code: 1, message: '停车场：必选项'}
    }
    if (!data.carplate) {
        return {code: 1, message: '车牌：必填项'}
    }
    if (!data.expiryfrom) {
        return {code: 1, message: '有效期起始日期：必填项'}
    }
    if (!data.expiryto) {
        return {code: 1, message: '有效期截止日期：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_carpark
    // data.parking
    // data.carplate
    // data.expiryfrom
    // data.expiryto
    // data.id_pricing
    // data.id_self
    // data.cellphone
    // data.note

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: 'ly0d11carpark',
            operator: 'findOne',
            query: {_id: data.id_carpark},
        }).then(res=>{
            let objCarpark = res.data[0]
            GQuery({
                tblName: 'ly0d11pricing',
                operator: 'findOne',
                query: {_id: data.id_pricing ? data.id_pricing : null},
            }).then(res=>{
                let objPricing = data.id_pricing ? res.data[0] : null
                GQuery({
                    tblName: 'ly0d11self',
                    operator: 'findOne',
                    query: {_id: data.id_self ? data.id_self : null},
                }).then(res=>{
                    let objSelf = data.id_self ? res.data[0] : null
                    GQuery({
                        tblName: 'ly0d11carwithin',
                        operator: 'insertOne',
                        update: {
                            id_dataunit: objCarpark.id_dataunit,
                            dataunit_name: objCarpark.dataunit_name,
                            id_carpark: objCarpark._id,
                            carpark_name: objCarpark.name,
                            parking: data.parking ? data.parking : null,
                            carplate: data.carplate,
                            expiryfrom: data.expiryfrom,
                            expiryto: data.expiryto,
                            id_pricing: objPricing ? objPricing._id : (objCarpark.id_pricing ? objCarpark.id_pricing : null),
                            pricing_name: objPricing ? objPricing.name : (objCarpark.pricing_name ? objCarpark.pricing_name : ""),
                            id_self: objSelf ? objSelf._id : (objCarpark.id_self ? objCarpark.id_self : null),
                            self_name: objSelf ? objSelf.name : (objCarpark.self_name ? objCarpark.self_name : ""),
                            cellphone: data.cellphone ? data.cellphone : null,
                            note: data.note ? data.note : null
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
}

// 查询一条记录
function findOne (data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d11carwithin',
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
    // data.id_carpark
    // data.parking
    // data.carplate
    // data.expiryfrom
    // data.expiryto
    // data.id_pricing
    // data.id_self
    // data.cellphone
    // data.note

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        // 提交
        GQuery({
            tblName: 'ly0d11carpark',
            operator: 'findOne',
            query: {_id: data.id_carpark},
        }).then(res=>{
            let objCarpark = res.data[0]
            GQuery({
                tblName: 'ly0d11pricing',
                operator: 'findOne',
                query: {_id: data.id_pricing ? data.id_pricing : null},
            }).then(res=>{
                let objPricing = data.id_pricing ? res.data[0] : null
                GQuery({
                    tblName: 'ly0d11self',
                    operator: 'findOne',
                    query: {_id: data.id_self ? data.id_self : null},
                }).then(res=>{
                    let objSelf = data.id_self ? res.data[0] : null
                    GQuery({
                        tblName: 'ly0d11carwithin',
                        operator: 'updateOne',
                        query: {_id: data._id},
                        update: {
                            id_dataunit: objCarpark.id_dataunit,
                            dataunit_name: objCarpark.dataunit_name,
                            id_carpark: objCarpark._id,
                            carpark_name: objCarpark.name,
                            parking: data.parking ? data.parking : null,
                            carplate: data.carplate,
                            expiryfrom: data.expiryfrom,
                            expiryto: data.expiryto,
                            id_pricing: objPricing ? objPricing._id : (objCarpark.id_pricing ? objCarpark.id_pricing : null),
                            pricing_name: objPricing ? objPricing.name : (objCarpark.pricing_name ? objCarpark.pricing_name : ""),
                            id_self: objSelf ? objSelf._id : (objCarpark.id_self ? objCarpark.id_self : null),
                            self_name: objSelf ? objSelf.name : (objCarpark.self_name ? objCarpark.self_name : ""),
                            cellphone: data.cellphone ? data.cellphone : null,
                            note: data.note ? data.note : null
                        }
                    }).then(() => {
                        resolve({code: 0, message: '修改成功'})
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
            tblName: 'ly0d11carwithin',
            operator: 'deleteOne',
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: '删除成功'})
        })
    })
}

// 获取页面初始化数据
function getPageData (data) {
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
                GQuery({
                    tblName: 'ly0d11self',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrSelf = result.data
                    resolve({code: 0, message: "",
                        data: {
                            arrCarpark,
                            arrPricing,
                            arrSelf
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
