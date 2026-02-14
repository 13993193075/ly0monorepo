import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"
import {WeChat} from 'packages/ly0libs'

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

        // 餐位分区 _id
        if (data0.id_diningplace) {
            data1.id_diningplace = data0.id_diningplace
        }

        if (data0.tableno) { // 桌号，模糊匹配
            data1.tableno = {'$regex': `.*${data0.tableno}.*`}
        }

        if (data0.status_code) { // 状态
            data1.status_code = data0.status_code
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
    // data.query.diningplace_text
    // data.query.tableno
    // data.query.status_code
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
                    tblName: 'ly0d5table',
                    operator: 'find',
                    query,
                    sort: {tableno: 1},
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d5table',
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
    if (!data.id_restaurant) {
        return {code: 1, message: '餐馆：必选项'}
    }
    if (!data.tableno) {
        return {code: 1, message: '餐位：必填项'}
    }
    if (!data.status_code) {
        return {code: 1, message: '状态：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_restaurant
    // data.tableno
    // data.id_diningplace
    // data.status_code

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
                tblName: "ly0d5diningplace",
                operator: "findOne",
                query: {
                    _id: data.id_diningplace ? data.id_diningplace : null
                }
            }).then(result=>{
                let objDiningplace = result.data
                GQuery({
                    tblName: 'ly0d5table',
                    operator: 'insertOne',
                    update: {
                        id_dataunit: objRestaurant.id_dataunit,
                        dataunit_name: objRestaurant.dataunit_name,
                        id_restaurant: objRestaurant._id,
                        restaurant_name: objRestaurant.name,
                        tableno: data.tableno,
                        id_diningplace: objDiningplace ? objDiningplace._id : null,
                        diningplace_text: objDiningplace ? objDiningplace.text : "",
                        status_code: data.status_code,
                        status_text: code.tableStatus.find(i=>{
                            return i.code === data.status_code
                        }).text
                    }
                }).then(result => {
                    resolve({code: 0, message: '提交成功',
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
            tblName: 'ly0d5table',
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
    // data.id_restaurant
    // data.tableno
    // data.id_diningplace
    // data.status_code

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message) // 不能提交
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
                tblName: "ly0d5diningplace",
                operator: "findOne",
                query: {
                    _id: data.id_diningplace ? data.id_diningplace : null
                }
            }).then(result=>{
                let objDiningplace = result.data
                GQuery({
                    tblName: 'ly0d5table',
                    operator: 'updateOne',
                    query: {_id: data._id},
                    update: {
                        id_dataunit: objRestaurant.id_dataunit,
                        dataunit_name: objRestaurant.dataunit_name,
                        id_restaurant: objRestaurant._id,
                        restaurant_name: objRestaurant.name,
                        tableno: data.tableno,
                        id_diningplace: objDiningplace ? objDiningplace._id : null,
                        diningplace_text: objDiningplace ? objDiningplace.text : "",
                        status_code: data.status_code,
                        status_text: code.tableStatus.find(i=>{
                            return i.code === data.status_code
                        }).text
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
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d5b_table',
            operator: 'findOne',
            query: {id_table: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d5b_table'})
            }

            GQuery({
                tblName: 'ly0d5table',
                operator: 'deleteOne',
                query: {_id}
            }).then(() => {
                resolve({code: 0, message: '删除成功'})
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
                tblName: 'ly0d5diningplace',
                operator: 'find',
                query: q0,
                sort: {text: 1}
            }).then(result => {
                let arrDiningplace = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrRestaurant,
                        arrDiningplace,
                        arrStatus: code.tableStatus
                    }
                })
            })
        })
    })
}

// 获取选中餐位的微信小程序码
function getWxacode (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_restaurant 当前用户信息：餐馆id
    // data.arrTable

    return new Promise(function (resolve, reject) {
        let arrPromise0 = [], iArrPromise0 = 0

        let q = {id_dataunit: data.id_dataunit}
        if (data.id_restaurant) {
            q._id = data.id_restaurant
        }

        GQuery({
            tblName: 'ly0d5restaurant',
            operator: 'find',
            query: q
        }).then(result => {
            let arrRestaurant = result.data
            for (let iArrRestaurant = 0; iArrRestaurant < arrRestaurant.length; iArrRestaurant++) {
                if(! arrRestaurant[iArrRestaurant].wx_appid){
                    return resolve({code: 1, message: arrRestaurant[iArrRestaurant].name + " 微信应用凭据不存在"})
                }

                GQuery({
                    tblName: 'ly0d1d0appid',
                    operator: 'findOne',
                    query: {appid: arrRestaurant[iArrRestaurant].wx_appid}
                }).then(result => {
                    if(!result.data){
                        return resolve({code: 1, message: arrRestaurant[iArrRestaurant].name + " 微信应用凭据不存在"})
                    }

                    const objAppid = result.data
                    if (iArrRestaurant === arrRestaurant.length - 1) {
                        let arrTable = data.arrTable
                        for (let iArrTable = 0; iArrTable < arrTable.length; iArrTable++) {
                            arrPromise0 [iArrPromise0] = WeChat.MPC.getMiniProgramCode({
                                appid: objAppid.appid,
                                secret: objAppid.secret,
                                scene: arrTable [iArrTable]._id
                            })
                            iArrPromise0++
                        }
                        Promise.all(arrPromise0).then(result => {
                            resolve({code: 0, message: "获取微信小程序码成功",
                                data: result
                            })
                        })
                    }
                })
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
    getWxacode
}
