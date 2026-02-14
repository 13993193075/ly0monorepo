import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_property = data0.id_property

        // 收费项目
        if (data0.id_goods) {
            data1.id_goods = data0.id_goods
        }
        // 有效期
        if (data0.to_start || data0.to_end) {
            data1.to = {}
            if (data0.to_start) {
                data1.to.$gte = data0.to_start
            }
            if (data0.to_end) {
                data1.to.$lte = data0.to_end
            }
        }
        // 计费时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }

        // 制单状态
        if(data0.id_business){
            data1.id_business = data0.id_business
        }else{
            data1.$or = [
                {id_business: {$exists: false}},
                {id_business: null}
            ]
        }
        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_property
    // data.query.id_goods
    // data.query.to_start
    // data.query.to_end
    // data.query.time_start
    // data.query.time_end
    // data.query.id_business
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then(query => { // 查询修正
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
                    tblName: 'ly0d9b_goods',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit)
                }),
                GQuery({
                    tblName: 'ly0d9b_goods',
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
    if (!data.id_goods) {
        return {code: 1, message: '收费项目：必选项'}
    }
    if (!data.method_code) {
        return {code: 1, message: '计费方法：必选项'}
    }
    if (!(/^[0-9]+\.?[0-9]*$/.test(data.price))) {
        return {code: 1, message: '单价：必填项，大于等于 0'
        }
    }
    if (!data.from) {
        return {code: 1, message: '有效期起始日期：必填项'}
    }
    if (!data.to) {
        return {code: 1, message: '有效期截止日期：必填项'}
    }
    if (!(/^[0-9]+\.?[0-9]*$/.test(data.amount))) {
        return {code: 1, message: '计费：必填项，大于等于 0'}
    }
    if (!(/^[0-9]+\.?[0-9]*$/.test(data.deal))) {
        return {code: 1, message: '核收：必填项，大于等于 0'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_property
    // data.id_goods
    // data.from
    // data.to
    // data.amount
    // data.deal
    // data.dealnote

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9goods",
                operator: "findOne",
                query: {_id: data.id_goods}
            }).then(result=>{
                let objGoods = result.data
                GQuery({
                    tblName: 'ly0d9b_goods',
                    operator: 'insertOne',
                    update: { // 提交
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: objProperty.id_dataunit,
                        dataunit_name: objProperty.dataunit_name,
                        id_unit: objProperty.id_unit,
                        unit_name: objProperty.unit_name,
                        id_property: objProperty._id,
                        property_number: objProperty.number,
                        property_name: objProperty.name ? data.name : "",
                        id_sizetype: objProperty.id_sizetype,
                        sizetype_name: objProperty.sizetype_name,
                        area: objProperty.area,
                        id_goods: objGoods._id,
                        goods_name: objGoods.name,
                        method_code: objGoods.method_code,
                        method_text: objGoods.method_text,
                        price: objGoods.price,
                        from: data.from,
                        to: data.to,
                        amount: data.amount ? data.amount : 0,
                        time: thisTime,
                        deal: data.deal ? data.deal : 0,
                        dealnote: data.dealnote ? data.dealnote : "",
                        id_business: null
                    }
                }).then(result => {
                    resolve({code: 0, message: '新增成功',
                        _id: result.dataNew._id
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
            tblName: 'ly0d9b_goods',
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
    // data.id_property
    // data.id_goods
    // data.from
    // data.to
    // data.amount
    // data.deal
    // data.dealnote

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 数据约束
        if (message.code === 1) {
            return resolve(message)
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result=>{
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9goods",
                operator: "findOne",
                query: {_id: data.id_goods}
            }).then(result=>{
                let objGoods = result.data
                GQuery({
                    tblName: 'ly0d9b_goods',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: { // 提交
                        time_update: thisTime,
                        id_dataunit: objProperty.id_dataunit,
                        dataunit_name: objProperty.dataunit_name,
                        id_unit: objProperty.id_unit,
                        unit_name: objProperty.unit_name,
                        id_property: objProperty._id,
                        property_number: objProperty.number,
                        property_name: objProperty.name ? data.name : "",
                        id_sizetype: objProperty.id_sizetype,
                        sizetype_name: objProperty.sizetype_name,
                        area: objProperty.area,
                        id_goods: objGoods._id,
                        goods_name: objGoods.name,
                        method_code: objGoods.method_code,
                        method_text: objGoods.method_text,
                        price: objGoods.price,
                        from: data.from,
                        to: data.to,
                        amount: data.amount ? data.amount : 0,
                        time: thisTime,
                        deal: data.deal ? data.deal : 0,
                        dealnote: data.dealnote ? data.dealnote : "",
                        id_business: null
                    }
                }).then(() => {
                    resolve({code: 0, message: '修改成功'})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9b_goods',
            operator: 'deleteOne',
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: '删除成功'})
        })
    })
}

// 获取页面初始化数据
function getPageData (data) {
    // data.id_property

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9property',
            operator: 'findOne',
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = result.data
            GQuery({
                tblName: 'ly0d9unit',
                operator: 'findOne',
                query: {_id: objProperty.id_unit}
            }).then(result => {
                let objUnit = result.data
                GQuery({
                    tblName: 'ly0d9goods',
                    operator: 'find',
                    query: {id_unit: objUnit._id}
                }).then(result => {
                    let arrGoods = result.data
                    resolve({code: 0, message: "",
                        data: {
                            objProperty,
                            objUnit,
                            arrGoods
                        }
                    })
                })
            })
        })
    })
}

function amount(data){
    // data.price 单价
    // data.method 计费方法
    // data.area 计费面积
    // data.from 有效期起
    // data.to 有效期止
    
    return new Promise((resolve, reject) => {
        resolve({code: 0, message: "",
            data: {
                amount: utils.id_business.amount(data)
            }
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
    amount
}
