import {GQuery} from '../../main/GQuery.js'
import code from "../code.js"

// 修改餐位状态
function setTableStatus (data) {
    // data.id_table
    // data.status_code

    return new Promise((resolve, reject)=>{
        let upd = {
            status_code: data.status_code,
            status_text: code.tableStatus.find(i=>{
                return i.code === data.status_code
            }).text
        }
        if(data.status_code === "0" || data.status_code === "1"){ // 停用 || 空位：取消餐位状态关联
            upd.id_business = null
            upd.id_b_table = null
        }
        GQuery({
            tblName: 'ly0d5table',
            operator: 'updateOne',
            query: {
                _id: data.id_table
            },
            update: upd
        }).then(result=>{
            let objTable = result.dataNew
            if(!objTable.id_b_table){
                return resolve({code: 0, message: "已修改餐位状态"})
            }

            // 餐位状态缓存至配房记录
            GQuery({
                tblName: 'ly0d5b_table',
                operator: 'updateOne',
                query: {
                    _id: objTable.id_b_table
                },
                update: {
                    table_status_code: objTable.status_code,
                    table_status_text: code.tableStatus.find(i=>{
                        return i.code === objTable.status_code
                    }).text
                }
            }).then(()=>{
                resolve({code: 0, message: "已修改餐位状态"})
            })
        })
    })
}

// 同步餐位状态：不能修改其它订单的餐位状态
function setTableStatusWithBusiness (data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d5business',
            operator: 'findOne',
            query: {
                _id: data.id_business
            }
        }).then(result => {
            let objBusiness = result.data

            // 清除本订单相关的所有餐位状态关联
            GQuery({
                tblName: 'ly0d5table',
                operator: 'updateMany',
                query: {
                    id_business: objBusiness._id
                },
                update: {
                    id_business: null,
                    status_code: '1',
                    status_text: code.tableStatus.find(i=>{
                        return i.code === '1'
                    }).text
                }
            }).then(() => {
                GQuery({
                    tblName: 'ly0d5b_table',
                    operator: 'find',
                    query: {
                        id_business: objBusiness._id
                    }
                }).then(result => {
                    let arrBTable = result.data
                    // 本订单没有餐位分配记录
                    if (arrBTable.length === 0) {
                        return resolve({code: 0, message: '已同步餐位状态'})
                    }

                    let arrPromise = []
                    arrBTable.forEach(iBTable => {
                        arrPromise.push(
                            new Promise((resolve0, reject0) => {
                                if(objBusiness.status_code !== "1"){ // 订单状态非用餐，不继续同步餐位状态
                                    return resolve0()
                                }

                                // 同步餐位状态
                                GQuery({
                                    tblName: 'ly0d5table',
                                    operator: 'updateOne',
                                    query: {
                                        _id: iBTable.id_table,
                                        // 无订单关联
                                        $or: [
                                            {id_business: {$exists: false}},
                                            {id_business: undefined},
                                            {id_business: {$eq: null}}
                                        ]
                                    },
                                    update: {
                                        id_business: objBusiness._id,
                                        status_code: "2",
                                        status_text: code.tableStatus.find(i=>{
                                            return i.code === "2"
                                        }).text
                                    }
                                }).then(() => {
                                    resolve0()
                                })
                            })
                        )
                    })

                    Promise.all(arrPromise).then(() => {
                        resolve({code: 0, message: '已同步餐位状态'})
                    })
                })
            })
        })
    })
}

// 预订
function book(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({ // 订单状态重置：预订
            tblName: "ly0d5business",
            operator: "updateOne",
            query: {_id: data.id_business},
            update: {
                status_code: "0", status_text: "预订"
            }
        }).then(() => {
            // 同步餐位状态
            setTableStatusWithBusiness({
                id_business: data.id_business
            }).then(()=>{
                resolve({code: 0, message: "订单状态：预订"})
            })
        })
    })
}

// 入住
function arrive(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({ // 订单状态重置：入住
            tblName: "ly0d5business",
            operator: "updateOne",
            query: {_id: data.id_business},
            update: {
                status_code: "1", status_text: "入住"
            }
        }).then(() => {
            // 同步餐位状态
            setTableStatusWithBusiness({
                id_business: data.id_business
            }).then(()=>{
                resolve({code: 0, message: "订单状态：入住"})
            })
        })
    })
}

// 离开
function leave(data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({ // 查询支付状态
            tblName: "ly0d2payment",
            operator: "findOne",
            query: {
                id_business: data.id_business,
                status_code: "1"
            }
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: "未完成支付，不能办理离开手续"});
            }

            GQuery({ // 订单状态重置：离店
                tblName: "ly0d5business",
                operator: "updateOne",
                query: {_id: data.id_business},
                update: {
                    status_code: "2", status_text: "离开"
                }
            }).then(() => {
                // 同步餐位状态
                setTableStatusWithBusiness({
                    id_business: data.id_business
                }).then(()=>{
                    resolve({code: 0, message: "已结算，订单状态：离开"})
                })
            })
        })
    })
}

export default {
    setTableStatus,
    setTableStatusWithBusiness,
    book,
    arrive,
    leave
}