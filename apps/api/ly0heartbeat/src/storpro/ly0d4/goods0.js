import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {},
            data1 = {}

        if (data0._id) { // _id 必须置于首项查询
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 旅店 _id
        if (data0.id_hotel) {
            data1.id_hotel = data0.id_hotel
        }

        if (data0.name) { // 商品名称 模糊匹配
            data1.name = {'$regex': `.*${data0.name}.*`}
        }

        resolve(data1)
    })
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_hotel
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise(function (resolve, reject) {
        queryRevise(data.query).then(query => { // 查询修正
            // 排序
            let sort
            if(data.sort && data.sort.label && data.sort.order){
                sort = {}
                if(data.sort.order === "ascending"){
                    sort[data.sort.label] = 1
                }else if(data.sort.order === "descending"){
                    sort[data.sort.label] = -1
                }else{
                    sort[data.sort.label] = 1
                }
            }else{
                sort = {_id: -1}
            }

            Promise.all([
                GQuery({
                    tblName: 'ly0d4goods0',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d4goods0',
                    operator: 'countDocuments',
                    query
                })
            ]).then(function (result) {
                resolve({code: 0, message: '',
                    data: result [0].data,
                    total: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.id_hotel) {
        return {code: 1, message: '旅店：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '商品名称：必填项'}
    }
    if (!/^[0-9]+$/.test(data.price)) {
        return {code: 1, message: '单价：必填项，数值，>= 0'}
    }
    return {code: 0,message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_hotel
    // data.name
    // data.price

    return new Promise(function (resolve, reject) {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d4hotel',
            operator: 'findOne',
            query: {_id: data.id_hotel}
        }).then(result => {
            let objHotel = result.data
            GQuery({
                tblName: 'ly0d4goods0',
                operator: 'insertOne',
                update: {
                    id_dataunit: objHotel.id_dataunit,
                    dataunit_name: objHotel.dataunit_name,
                    id_hotel: objHotel._id,
                    hotel_name: objHotel.name,
                    name: data.name,
                    price: data.price
                }
            }).then(result => {
                resolve({code: 0, message: '插入一条记录成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_hotel
    // data.name
    // data.price_name
    // data.price

    return new Promise(function (resolve, reject) {
        // 数据约束
        let result = dataRule(data)
        if (result.code === 1) {
            return resolve(result)
        }

        // 提交
        GQuery({
            tblName: 'ly0d4hotel',
            operator: 'findOne',
            query: {_id: data.id_hotel}
        }).then(result => {
            let objHotel = result.data
            GQuery({
                tblName: 'ly0d4goods0',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    id_dataunit: objHotel.id_dataunit,
                    dataunit_name: objHotel.dataunit_name,
                    id_hotel: objHotel._id,
                    hotel_name: objHotel.name,
                    name: data.name,
                    price: data.price
                }
            }).then(() => {
                resolve({code: 0, message: '修改一条记录成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d4b_goods0',
            operator: 'findOne',
            query: {id_goods: data._id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d4b_goods0'})
            }

            GQuery({
                tblName: 'ly0d4goods0',
                operator: 'deleteOne',
                query: {_id: data._id}
            }).then(() => {
                resolve({code: 0, message: '删除一条记录成功'})
            })
        })
    })
}

// 获取页面初始化数据
function getPgData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        if (data.id_hotel) {
            q._id = data.id_hotel
        }

        GQuery({
            tblName: 'ly0d4hotel',
            operator: 'find',
            query: q
        }).then(result => {
            let arrHotel = result.data
            resolve({code: 0, message: "",
                data: {
                    arrHotel
                }
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData
}
