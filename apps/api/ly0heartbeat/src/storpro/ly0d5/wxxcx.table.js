import {GQuery} from '../../main/GQuery.js'
import b_table from './b_table.js'
import smallticket from './smallticket.js'
import utils from './utils/index.js'
import ly0d2wxzf from '../ly0d2/wxzf.js'

// 查询餐位信息
function tableScan(data) {
    let tableId = data.tableId ? data.tableId : null,
        tableNo = '',
        businessId = data.businessId ? data.businessId : null

    return new Promise((resolve, reject) => {
        if (!tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误',
                data: {
                    tableId: null,
                    tableNo: '',
                    businessId: null
                }
            })
        }

        GQuery({
            tblName: 'ly0d5table',
            operator: 'findOne',
            query: {_id: data.tableId}
        }).then(result => {
            let objTable = result.data
            tableNo = objTable && objTable.tableno ? objTable.tableno : ''
            if (!businessId) {
                businessId = objTable && objTable.id_business ? objTable.id_business : null
            }
            if (!businessId) {
                return resolve({
                    code: 0,
                    message: '请求成功',
                    data: {
                        tableId,
                        tableNo,
                        businessId: null
                    }
                })
            } else {
                GQuery({
                    tblName: 'ly0d5b_table',
                    operator: 'deleteMany',
                    query: {id_business: businessId}
                }).then(() => {
                    b_table.insertOne({
                            id_business: businessId,
                            id_table: data.tableId
                    }).then(() => {
                        GQuery({
                            tblName: 'ly0d5table',
                            operator: 'updateMany',
                            query: {id_business: businessId},
                            update: {id_business: null}
                        }).then(() => {
                            GQuery({
                                tblName: 'ly0d5table',
                                operator: 'updateOne',
                                query: {_id: data.tableId},
                                update: {id_business: businessId}
                            }).then(() => {
                                resolve({
                                    code: 0,
                                    message: '请求成功',
                                    data: {
                                        tableId,
                                        tableNo,
                                        businessId
                                    }
                                })
                            })
                        })
                    })
                })
            }
        })
    })
}

// 获取菜单
function getMenu(data) {
    // data.tableId

    return new Promise((resolve, reject) => {
        if (!data || !data.tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        GQuery({
            tblName: 'ly0d5table',
            operator: 'findOne',
            query: {_id: data.tableId}
        }).then(result => {
            let objTable = result.data
            if (!objTable) {
                return resolve({
                    code: 1,
                    message: '餐位不存在'
                })
            }
            GQuery({
                tblName: 'ly0d5restaurant',
                operator: 'findOne',
                query: {_id: objTable.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                GQuery({
                    tblName: 'ly0d5goods',
                    operator: 'find',
                    query: {id_restaurant: objRestaurant._id}
                }).then(result => {
                    let arrGoods = result.data
                    GQuery({
                        tblName: 'ly0d5goods0',
                        operator: 'find',
                        query: {id_restaurant: objRestaurant._id}
                    }).then(result => {
                        let arrGoods0 = result.data
                        GQuery({
                            tblName: 'ly0d5goodsgroup',
                            operator: 'find',
                            query: {id_restaurant: objRestaurant._id}
                        }).then(result => {
                            let arrGoodsgroup = result.data
                            GQuery({
                                tblName: 'ly0d5goods0group',
                                operator: 'find',
                                query: {id_restaurant: objRestaurant._id}
                            }).then(result => {
                                let arrGoods0group = result.data
                                resolve({
                                    code: 0,
                                    arrGoods,
                                    arrGoods0,
                                    arrGoodsgroup,
                                    arrGoods0group
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取订单
function getBusiness(data) {
    //data.tableId

    return new Promise((resolve, reject) => {
        if (!data || !data.tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        GQuery({
            tblName: 'ly0d5table',
            operator: 'findOne',
            query: {_id: data.tableId}
        }).then(result => {
            let objTable = result.data
            if (!objTable) {
                return resolve({
                    code: 1,
                    message: '餐位不存在'
                })
            }
            if (objTable.status_code !== '2' || !objTable.id_business) {
                return resolve({
                    code: 1,
                    message: '订单不存在',
                    tableNo: objTable && objTable.tableno ? objTable.tableno : null
                })
            }

            GQuery({
                tblName: 'ly0d5business',
                operator: 'findOne',
                query: {_id: objTable.id_business}
            }).then(result => {
                let objBusiness = result.data
                GQuery({
                    tblName: 'ly0d5b_goods',
                    operator: 'find',
                    query: {id_business: objBusiness._id}
                }).then(result => {
                    let arrBGoods = result.data
                    GQuery({
                        tblName: 'ly0d5b_goods0',
                        operator: 'find',
                        query: {id_business: objBusiness._id}
                    }).then(result => {
                        let arrBGoods0 = result.data
                        resolve({
                            code: 0,
                            arrBGoods,
                            arrBGoods0
                        })
                    })
                })
            })
        })
    })
}

// 下单
function setBusiness(data) {
    // data.tableId
    // data.arrBGoods
    // data.arrBGoods0

    return new Promise((resolve, reject) => {
        if (!data || !data.tableId || (!data.arrBGoods && !data.arrBGoods)) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        let arrBGoods = data.arrBGoods,
            arrBGoods0 = data.arrBGoods0
        if (arrBGoods.length === 0 && arrBGoods0.length === 0) {
            return resolve({
                code: 1,
                message: '未下单'
            })
        }

        GQuery({
            tblName: 'ly0d5table',
            operator: 'findOne',
            query: {_id: data.tableId}
        }).then(result => {
            let objTable = result.data
            if (!objTable) {
                return resolve({
                    code: 1,
                    message: '餐位不存在'
                })
            }

            let thisTime = new Date()
            GQuery({
                tblName: 'ly0d5restaurant',
                operator: 'findOne',
                query: {_id: objTable.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                new Promise(function (resolve, reject) {
                    if (objTable.status_code !== '2' && !objTable.id_business) { // 订单不存在
                        GQuery({
                            tblName: 'ly0d5business',
                            operator: 'insertOne',
                            update: { // 新订单
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objTable.id_dataunit,
                                id_restaurant: objTable.id_restaurant,
                                restaurant_name: objTable.restaurant_name,
                                client_name: objTable.tableno,
                                time: thisTime,
                                status_code: '1',
                                status_text: '用餐'
                            }
                        }).then(result => {
                            let objBusiness = result.data
                            GQuery({
                                tblName: 'ly0d5b_table',
                                operator: 'insertOne',
                                update: {
                                    time_create: thisTime,
                                    time_update: thisTime,
                                    id_dataunit: objTable.id_dataunit,
                                    id_restaurant: objTable.id_restaurant,
                                    restaurant_name: objTable.restaurant_name,
                                    id_business: objBusiness._id,
                                    id_table: objTable._id,
                                    tableno: objTable.tableno
                                }
                            }).then(() => {
                                resolve({objBusiness})
                            })
                        })
                    } else { // 订单已存在
                        GQuery({
                            tblName: 'ly0d5business',
                            operator: 'findOne',
                            query: {_id: objTable.id_business}
                        }).then(result => {
                            let objBusiness = result.data
                            resolve({objBusiness})
                        })
                    }
                }).then(function (result) {
                    let objBusiness = result.objBusiness
                    GQuery({
                        tblName: 'ly0d5table',
                        operator: 'updateOne',
                        query: {_id: data.tableId},
                        update: {
                            status_code: '2',
                            status_text: '用餐',
                            id_business: objBusiness._id
                        }
                    }).then(() => {
                        let arrPromises = [],
                            iArrPromises = 0
                        if (arrBGoods && arrBGoods.length > 0) {
                            for (let i = 0; i < arrBGoods.length; i++) {
                                arrPromises [iArrPromises] = new Promise(function (resolve, reject) {
                                    GQuery({
                                        tblName: 'ly0d5b_goods',
                                        operator: 'insertOne',
                                        update: {
                                            time_create: thisTime,
                                            time_update: thisTime,
                                            id_dataunit: objTable.id_dataunit,
                                            id_restaurant: objRestaurant._id,
                                            restaurant_name: objRestaurant.name,
                                            id_business: objBusiness._id,
                                            id_goods: arrBGoods [i].id_goods,
                                            name: arrBGoods [i].name,
                                            price: arrBGoods [i].price,
                                            count: arrBGoods [i].count
                                        }
                                    }).then(() => {
                                        resolve()
                                    })
                                })
                                iArrPromises++
                            }
                        }

                        if (arrBGoods0 && arrBGoods0.length > 0) {
                            for (let i = 0; i < arrBGoods0.length; i++) {
                                arrPromises [iArrPromises] = new Promise(function (resolve, reject) {
                                    GQuery({
                                        tblName: 'ly0d5b_goods0',
                                        operator: 'insertOne',
                                        update: {
                                            time_create: thisTime,
                                            time_update: thisTime,
                                            id_dataunit: objTable.id_dataunit,
                                            id_restaurant: objRestaurant._id,
                                            restaurant_name: objRestaurant.name,
                                            id_business: objBusiness._id,
                                            id_goods: arrBGoods0 [i].id_goods,
                                            name: arrBGoods0 [i].name,
                                            price: arrBGoods0 [i].price,
                                            count: arrBGoods0 [i].count
                                        }
                                    }).then(() => {
                                        resolve()
                                    })
                                })
                                iArrPromises++
                            }
                        }

                        if ((arrBGoods && arrBGoods.length > 0) || (arrBGoods0 && arrBGoods0.length > 0)) {
                            Promise.all(arrPromises).then(function () {
                                // 小票打印
                                smallticket.print0({
                                        id_business: objBusiness._id,
                                        arrBGoods,
                                        arrBGoods0
                                }).then(function () {
                                    return resolve({
                                        code: 0,
                                        message: '下单成功',
                                        data: {
                                            businessId: objBusiness._id
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
            })
        })
    })
}

// 查询支付流水，查询支付状态并同步
function getPayment(data) {
    // data.tableId

    return new Promise(function (resolve, reject) {
        if (!data || !data.tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        let tableId = data.tableId // 餐位 ID
        GQuery({
            tblName: 'ly0d5table',
            operator: 'findOne',
            query: {_id: tableId}
        }).then(result => {
            let objTable = result.data
            if (!objTable) {
                return resolve({
                    code: 0,
                    message: '餐位不存在'
                })
            }
            if (!objTable.id_business || objTable.status_code !== '2') {
                return resolve({
                    code: 1,
                    message: '餐位空'
                })
            }
            GQuery({
                tblName: 'ly0d5restaurant',
                operator: 'findOne',
                query: {_id: objTable.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                GQuery({
                    tblName: 'ly0d5business',
                    operator: 'findOne',
                    query: {_id: objTable.id_business}
                }).then(result => {
                    let objBusiness = result.data
                    if (!objBusiness) {
                        return resolve({
                            code: 2,
                            message: '未下单'
                        })
                    }

                    // 计费
                    utils.id_business.id_business({id_business: objBusiness._id}).then(function (result) {
                        let objAmount = result.doc
                        if (!objBusiness.deal > 0) {
                            return resolve({
                                code: 3,
                                message: '未计费'
                            })
                        }

                        if (objAmount.amountStarted > 0) {
                            return resolve({
                                code: 4,
                                message: '支付中',
                                objRestaurant,
                                objTable,
                                objBusiness,
                                amountSucceeded: objAmount.money,
                                amountStarted: objAmount.money0,
                                arrStarted: objAmount.arrPaymentStarted
                            })
                        }

                        if (objAmount.amountSucceeded >= objBusiness.deal) {
                            return resolve({
                                code: 5,
                                message: '已支付',
                                objRestaurant,
                                objTable,
                                objBusiness,
                                amountSucceeded: objAmount.money,
                                amountStarted: 0,
                                arrStarted: []
                            })
                        }

                        // amountSucceeded < objBusiness.deal
                        return resolve({
                            code: 6,
                            message: '未支付',
                            objRestaurant,
                            objTable,
                            objBusiness,
                            amountSucceeded: objAmount.money,
                            amountStarted: 0,
                            arrStarted: []
                        })
                    })
                })
            })
        })
    })
}

// 微信支付.客户微信号付款
function wxzf1(data) {
    // data.tableId 餐位 ID
    // data.js_code 客户临时票据

    return new Promise(function (resolve, reject) {
        if (!data || !data.tableId || !data.js_code) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        getPayment({tableId: data.tableId}).then(function (result) {
            if (result.code !== 6) { // 6 : 未支付
                return resolve({
                    code: 1,
                    message: result.message
                })
            }

            let amountSucceeded = result.amountSucceeded,
                amountStarted = result.amountStarted,
                objRestaurant = result.objRestaurant,
                objTable = result.objTable,
                objBusiness = result.objBusiness

            ly0d2wxzf.wxzf1({
                    id_dataunit: objBusiness.id_dataunit,
                    recorder_cellphone: objBusiness.client_cellphone ? objBusiness.client_cellphone : null,
                    recorder_name: objBusiness.client_name ? objBusiness.client_name : null,
                    id_business: objBusiness._id,
                    businesstype_code: 'ly0d5business',
                    businesstype_text: '餐费',
                    amount: (objBusiness.deal ? objBusiness.deal : 0)
                        - (amountSucceeded ? amountSucceeded : 0)
                        - (amountStarted ? amountStarted : 0),
                    method_code: 'wxzf1',
                    method_text: '微信支付.客户微信号付款',
                    note: null,
                    appid: objRestaurant.wx_appid,
                    mchid: objRestaurant.wx_mchid,
                    js_code: data.js_code,
                    description: objBusiness.restaurant_name + ' 餐费'
            }).then(function (result) {
                resolve(result)
            })
        })
    })
}

// 微信支付.商户二维码收款
function wxzf2(data) {
    // data.tableId 餐位 ID

    return new Promise(function (resolve, reject) {
        if (!data || !data.tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        getPayment({tableId: data.tableId}).then(function (result) {
            if (result.code !== 6) { // 6 : 未支付
                return resolve({
                    code: 1,
                    message: result.message
                })
            }

            let amountSucceeded = result.amountSucceeded,
                amountStarted = result.amountStarted,
                objRestaurant = result.objRestaurant,
                objTable = result.objTable,
                objBusiness = result.objBusiness

            ly0d2wxzf.wxzf2({
                    id_dataunit: objBusiness.id_dataunit,
                    recorder_cellphone: objBusiness.client_cellphone ? objBusiness.client_cellphone : null,
                    recorder_name: objBusiness.client_name ? objBusiness.client_name : null,
                    id_business: objBusiness._id,
                    businesstype_code: 'ly0d5business',
                    businesstype_text: '餐费',
                    amount: (objBusiness.deal ? objBusiness.deal : 0)
                        - (amountSucceeded ? amountSucceeded : 0)
                        - (amountStarted ? amountStarted : 0),
                    method_code: 'wxzf2',
                    method_text: '微信支付.商户二维码收款',
                    note: null,
                    appid: objRestaurant.wx_appid,
                    mchid: objRestaurant.wx_mchid,
                    description: objBusiness.restaurant_name + ' 餐费'
            }).then(function (result) {
                resolve(result)
            })
        })
    })
}

// 微信支付：中止支付
function wxzfFail(data) {
    // data.tableId 餐位 ID

    return new Promise(function (resolve, reject) {
        if (!data || !data.tableId) {
            return resolve({
                code: -1,
                message: '请求参数错误'
            })
        }

        getPayment({tableId: data.tableId}).then(function (result) {
            if (result.code !== 4) {
                return resolve({code: 1, message: result.message})
            }
            let objBusiness = result.objBusiness

            ly0d2wxzf.setFail({id_business: objBusiness._id}).then(function () {
                return resolve({code: 0, message: '已取消支付'})
            })
        })
    })
}

export default {
    tableScan,

    getMenu,
    getBusiness,
    setBusiness,

    getPayment,
    wxzf1,
    wxzf2,
    wxzfFail
}
