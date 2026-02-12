import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save'

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 餐馆 _id
        if (data0.id_restaurant) {
            data1.id_restaurant = data0.id_restaurant
        }

        if (data0.name) { // 商品名称 模糊匹配
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        if (data0.id_goodsgroup) { // 商品分类
            data1.id_goodsgroup = data0.id_goodsgroup
        }
        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_restaurant
    // data.query.name
    // data.query.id_goodsgroup
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
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
                    tblName: 'ly0d5goods0',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }), GQuery({
                    tblName: 'ly0d5goods0',
                    operator: 'countDocuments',
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data.map(i=>{
                        return Object.assign(i, {
                            thumb: imageDomain + i.thumb
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
    if (!data.id_restaurant) {
        return {code: 1, message: '餐馆：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '商品名称：必填项'}
    }
    if (!/^[0-9]+$/.test(data.price)) {
        return {code: 1, message: '单价：必填项，数值，>= 0'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_restaurant
    // data.name
    // data.price
    // data.id_goodsgroup
    // data.thumb

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d5restaurant",
            operator: "findOne",
            query: {
                _id: data.id_restaurant
            }
        }).then(result=>{
            let objRestanrant = result.data
            GQuery({
                tblName: "ly0d5goods0group",
                operator: "findOne",
                query: {
                    _id: data.id_goodsgroup ? data.id_goodsgroup : null
                }
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods0',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objRestanrant.id_dataunit,
                        dataunit_name: objRestanrant.dataunit_name,
                        id_restaurant: objRestanrant._id,
                        restaurant_name: objRestanrant.name,
                        name: data.name,
                        price: data.price,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : null,
                    }
                }).then(result => {
                    let newId = result.dataNew._id
                    ImageSave.imageAppend({
                        uploaded: data.thumb,
                        dataunitId: data.id_dataunit,
                        tblName: 'ly0d5goods0',
                        fieldName: 'thumb',
                        dataId: newId
                    }).then(function (thumb) {
                        GQuery({
                            tblName: 'ly0d5goods0',
                            operator: 'updateOne',
                            query: {_id: newId},
                            update: {thumb: thumb ? thumb : null}
                        }).then(() => {
                            resolve({code: 0, message: '提交成功',
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
            tblName: 'ly0d5goods0',
            operator: 'findOne',
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: Object.assign(result.data, {
                    thumb: imageDomain + result.data.thumb
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_restaurant
    // data.name
    // data.price
    // data.id_goodsgroup
    // data.thumb

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        GQuery({
            tblName: "ly0d5restaurant",
            operator: "findOne",
            query: {
                _id: data.id_restaurant
            }
        }).then(result=>{
            let objRestanrant = result.data
            GQuery({
                tblName: "ly0d5goods0group",
                operator: "findOne",
                query: {
                    _id: data.id_goodsgroup ? data.id_goodsgroup : null
                }
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods0',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objRestanrant.id_dataunit,
                        dataunit_name: objRestanrant.dataunit_name,
                        id_restaurant: objRestanrant._id,
                        restaurant_name: objRestanrant.name,
                        name: data.name,
                        price: data.price,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : null
                    }
                }).then(result => {
                    GQuery({
                        tblName: 'ly0d5goods0',
                        operator: 'findOne',
                        query: {_id: data._id}
                    }).then(result=>{
                        let oldData = result.data
                        ImageSave.imageUpdate({
                            uploaded: data.thumb,
                            old: oldData.thumb,
                            dataunitId: data.id_dataunit,
                            tblName: 'ly0d5goods0',
                            fieldName: 'thumb',
                            dataId: newId
                        }).then(function (thumb) {
                            GQuery({
                                tblName: 'ly0d5goods0',
                                operator: 'updateOne',
                                query: {_id: newId},
                                update: {thumb: thumb ? thumb : null}
                            }).then(() => {
                                resolve({code: 0, message: '修改成功'})
                            })
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
            tblName: 'ly0d5b_goods0',
            operator: 'findOne',
            query: {id_goods: _id}
        }).then(result => {
            if (result.data) {
                return resolve({
                    code: 1,
                    message: '不能删除，存在关联信息：ly0d5b_goods0'
                })
            }
            GQuery({
                tblName: 'ly0d5goods0',
                operator: 'findOne',
                query: {_id}
            }).then(result => {
                ImageSave.imageDelete({url: result.data.thumb}).then(function () {
                    GQuery({
                        tblName: 'ly0d5goods0',
                        operator: 'deleteOne',
                        query: {_id}
                    }).then(() => {
                        resolve({
                            code: 0,
                            message: '删除成功'
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
    // data.id_restaurant 当前用户信息：餐馆id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_restaurant) {
            q._id = data.id_restaurant
            q0.id_restaurant = data.id_restaurant
        }

        GQuery({
            tblName: 'ly0d5restaurant',
            operator: 'find',
            query: q
        }).then(result => {
            let arrRestaurant = result.data
            GQuery({
                tblName: 'ly0d5goods0group',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods0',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrGoods = result.data
                    resolve({code: 0, message: "",
                        data: {
                            arrRestaurant,
                            arrGoodsgroup,
                            arrGoods
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
