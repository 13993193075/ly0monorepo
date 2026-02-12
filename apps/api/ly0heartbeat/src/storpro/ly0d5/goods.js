import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save'

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 餐馆 _id
        if (data0.id_restaurant) {
            data1.id_restaurant = data0.id_restaurant
        }

        if (data0.name) { // 菜品名称 模糊匹配
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        if (data0.id_goodsgroup) { // 菜品分类
            data1.id_goodsgroup = data0.id_goodsgroup
        }

        if(!!data0.recommend && data0.recommend === '1'){
            data1.recommend = true
        }else if(!!data0.recommend && data0.recommend === '0'){
            data1.recommend = false
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
    // data.query.recommend
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
                    tblName: 'ly0d5goods',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }), GQuery({
                    tblName: 'ly0d5goods',
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
        return {code: 1, message: '菜品名称：必填项'}
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
    // data.recommend
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
            let objRestaurant = result.data
            GQuery({
                tblName: "ly0d5goodsgroup",
                operator: "findOne",
                query: {
                    _id: data.id_goodsgroup ? data.id_goodsgroup : null
                }
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objRestaurant.id_dataunit,
                        dataunit_name: objRestaurant.dataunit_name,
                        id_restaurant: objRestaurant._id,
                        restaurant_name: objRestaurant.name,
                        name: data.name,
                        price: data.price,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : null,
                        recommend: data.recommend === 'true' // 推荐
                    }
                }).then(result => {
                    let newId = result.dataNew._id
                    ImageSave.imageAppend({
                        uploaded: data.thumb,
                        dataunitId: data.id_dataunit,
                        tblName: 'ly0d5goods',
                        fieldName: 'thumb',
                        dataId: newId
                    }).then(function (thumb) {
                        GQuery({
                            tblName: 'ly0d5goods',
                            operator: 'updateOne',
                            query: {_id: newId},
                            update: {thumb: thumb ? thumb : null}
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
            tblName: 'ly0d5goods',
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
    // data.recommend
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
            let objRestaurant = result.data
            GQuery({
                tblName: "ly0d5goodsgroup",
                operator: "findOne",
                query: {
                    _id: data.id_goodsgroup ? data.id_goodsgroup : null
                }
            }).then(result=>{
                let objGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objRestaurant.id_dataunit,
                        dataunit_name: objRestaurant.dataunit_name,
                        id_restaurant: objRestaurant._id,
                        restaurant_name: objRestaurant.name,
                        name: data.name,
                        price: data.price,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : null,
                        recommend: data.recommend === 'true' // 推荐
                    }
                }).then(() => {
                    GQuery({
                        tblName: 'ly0d5goods',
                        operator: 'findOne',
                        query: {_id: data._id}
                    }).then(result=>{
                        let oldData = result.data
                        ImageSave.imageUpdate({
                            uploaded: data.thumb,
                            old: oldData.thumb,
                            dataunitId: data.id_dataunit,
                            tblName: 'ly0d5goods',
                            fieldName: 'thumb',
                            dataId: data._id
                        }).then(function (thumb) {
                            GQuery({
                                tblName: 'ly0d5goods',
                                operator: 'updateOne',
                                query: {_id: data._id},
                                update: {thumb: thumb ? thumb : null}
                            }).then(() => {
                                resolve({
                                    code: 0,
                                    message: '修改成功'
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
function deleteOne (data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d5b_goods',
            operator: 'findOne',
            query: {id_goods: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_goods'})
            }

            GQuery({
                tblName: 'ly0d5goods',
                operator: 'findOne',
                query: {_id}
            }).then(result => {
                ImageSave.imageDelete({url: result.data.thumb}).then(function () {
                    GQuery({
                        tblName: 'ly0d5goods',
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
                tblName: 'ly0d5goodsgroup',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrGoodsgroup = result.data
                GQuery({
                    tblName: 'ly0d5goods',
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

// 推荐
function setRecommend (data) {
    // data._id
    // data.recommend

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d5goods',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                $set: {
                    recommend: data.recommend === 'true'
                }
            }
        }).then(() => {
            resolve({message: '修改成功'})
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
    setRecommend
}
