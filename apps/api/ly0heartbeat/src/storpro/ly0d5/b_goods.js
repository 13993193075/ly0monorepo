import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.name) { // 商品名称，模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query); // 查询修正
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
                tblName: "ly0d5b_goods",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d5b_goods",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data,
                count: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: "商品名称：必填项"}
    }
    if (!(/^[0-9]+$/.test(data.price))) {
        return {code: 1, message: "单价：必填项，大于等于 0"}
    }
    if (!(/^[0-9]+$/.test(data.count))) {
        return {code: 1, message: "数量：必填项，大于等于 0"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_business
    // data.id_goodsgroup
    // data.id_goods
    // data.name
    // data.price
    // data.count

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5goodsgroup",
                operator: "findOne",
                query: {_id: data.id_goodsgroup ? data.id_goodsgroup : null}
            }).then(result => {
                let objGoodsgroup = result.data
                GQuery({
                    tblName: "ly0d5b_goods",
                    operator: "insertOne",
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: objBusiness.id_dataunit,
                        dataunit_name: objBusiness.dataunit_name,
                        id_restaurant: objBusiness.id_restaurant,
                        restaurant_name: objBusiness.restaurant_name,
                        id_business: objBusiness._id,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : "",
                        id_goods: data.id_goods ? data.id_goods : null,
                        name: data.name,
                        price: data.price,
                        count: data.count
                    }
                }).then(result => {
                    resolve({
                        code: 0, message: "新增成功",
                        _id: result.dataNew._id
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
            tblName: "ly0d5b_goods",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_business
    // data.id_goodsgroup
    // data.id_goods
    // data.name
    // data.price
    // data.count

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }
        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5goodsgroup",
                operator: "findOne",
                query: {_id: data.id_goodsgroup ? data.id_goodsgroup : null}
            }).then(result => {
                let objGoodsgroup = result.data
                GQuery({
                    tblName: "ly0d5b_goods",
                    operator: "updateOne",
                    query: {_id: data._id},
                    update: {
                        time_update: thisTime,
                        id_dataunit: objBusiness.id_dataunit,
                        dataunit_name: objBusiness.dataunit_name,
                        id_restaurant: objBusiness.id_restaurant,
                        restaurant_name: objBusiness.restaurant_name,
                        id_business: objBusiness._id,
                        id_goodsgroup: objGoodsgroup ? objGoodsgroup._id : null,
                        goodsgroup_text: objGoodsgroup ? objGoodsgroup.text : "",
                        id_goods: data.id_goods ? data.id_goods : null,
                        name: data.name,
                        price: data.price,
                        count: data.count
                    }
                }).then(() => {
                    resolve({code: 0, message: "修改成功"})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d5b_goods",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除成功"})
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5restaurant",
                operator: "findOne",
                query: {_id: objBusiness.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                GQuery({
                    tblName: "ly0d5goodsgroup",
                    operator: "find",
                    query: {id_restaurant: objRestaurant._id}
                }).then(result => {
                    let arrGoodsgroup = result.data;
                    GQuery({
                        tblName: "ly0d5goods",
                        operator: "find",
                        query: {id_restaurant: objRestaurant._id},
                        sort: {_id: -1}
                    }).then(result => {
                        let arrGoods = result.data
                        resolve({code: 0, message: "",
                            data: {
                                objBusiness,
                                objRestaurant,
                                arrGoodsgroup,
                                arrGoods
                            }
                        })
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
