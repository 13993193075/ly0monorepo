import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business
    if (data0.tableno) { // 桌号，模糊匹配
        data1.tableno = {'$regex': `.*${data0.tableno}.*`}
    }
    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.tableno
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
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
                tblName: "ly0d5b_table",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d5b_table",
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
function dataRule (data, branch) {
    // branch: "insertOne" || "updateOne"

    return new Promise((resolve, reject)=>{
        // 不能提交
        if (!data.tableno) {
            return resolve({code: 1, message: "餐位：必填项"})
        }

        utils.tableUsed.tableUsed({
            id_b_table: branch === "updateOne" ? data._id : null,
            id_table: data.id_table
        }).then(result=>{
            resolve(result)
        })
    })
}

// 插入一条记录
function insertOne(data) {
    // data.id_business
    // data.id_diningplace
    // data.id_table
    // data.tableno

    return new Promise(function (resolve, reject) {
        // 数据约束
        dataRule(data, "insertOne").then(result => {
            if (result.code !== 0) {
                return resolve(result)
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
                    tblName: "ly0d5diningplace",
                    operator: "findOne",
                    query: {_id: data.id_diningplace ? data.id_diningplace : null}
                }).then(result => {
                    let objDiningplace = result.data
                    GQuery({
                        tblName: "ly0d5table",
                        operator: "findOne",
                        query: {_id: data.id_table ? data.id_table : null}
                    }).then(result => {
                        let objTable = result.data
                        if(!objTable && !data.tableno){
                            resolve({code: 1, message: "没有可提交的数据"})
                        }
                        GQuery({
                            tblName: "ly0d5b_table",
                            operator: "insertOne",
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objBusiness.id_dataunit,
                                dataunit_name: objBusiness.dataunit_name,
                                id_restaurant: objBusiness.id_restaurant,
                                restaurant_name: objBusiness.restaurant_name,
                                id_business: objBusiness._id,
                                id_diningplace: objDiningplace ? objDiningplace._id : null,
                                diningplace_text: objDiningplace ? objDiningplace.text : "",
                                id_table: objTable ? objTable._id : null,
                                tableno: objTable ? objTable.tableno : data.tableno
                            }
                        }).then(result => {
                            // 同步餐位状态
                            utils.tableStatus.setTableStatusWithBusiness({id_business: data.id_business}).then(()=>{
                                resolve({code: 0, message: "新增成功，餐位状态已同步",
                                    _id: result.dataNew._id
                                })
                            })
                        })
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
            tblName: "ly0d5b_table",
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
    // _id
    // data.id_business
    // data.id_diningplace
    // data.id_table
    // data.tableno

    return new Promise(function (resolve, reject) {
        // 数据约束
        dataRule(data, "updateOne").then(result => {
            if (result.code === 1) {
                return resolve(result)
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
                    tblName: "ly0d5diningplace",
                    operator: "findOne",
                    query: {_id: data.id_diningplace ? data.id_diningplace : null}
                }).then(result => {
                    let objDiningplace = result.data
                    GQuery({
                        tblName: "ly0d5table",
                        operator: "findOne",
                        query: {_id: data.id_table ? data.id_table : null}
                    }).then(result => {
                        let objTable = result.data
                        if(!objTable && !data.tableno){
                            resolve({code: 1, message: "没有可提交的数据"})
                        }
                        GQuery({
                            tblName: "ly0d5b_table",
                            operator: "updateOne",
                            query: {_id: data._id},
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objBusiness.id_dataunit,
                                dataunit_name: objBusiness.dataunit_name,
                                id_restaurant: objBusiness.id_restaurant,
                                restaurant_name: objBusiness.restaurant_name,
                                id_business: objBusiness._id,
                                id_diningplace: objDiningplace ? objDiningplace._id : null,
                                diningplace_text: objDiningplace ? objDiningplace.text : "",
                                id_table: objTable ? objTable._id : null,
                                tableno: objTable ? objTable.tableno : data.tableno
                            }
                        }).then(() => {
                            // 同步餐位状态
                            utils.tableStatus.setTableStatusWithBusiness({id_business: data.id_business}).then(()=>{
                                resolve({code: 0, message: "修改成功，餐位状态已同步"})
                            })
                        })
                    })
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d5b_table",
            operator: "findOne",
            query: {
                _id: data._id
            }
        }).then(result=>{
            let objBTableOld = result.data
            GQuery({
                tblName: "ly0d5b_table",
                operator: "deleteOne",
                query: {
                    _id: data._id
                }
            }).then(() => {
                // 同步餐位状态
                utils.tableStatus.setTableStatusWithBusiness({id_business: objBTableOld.id_business}).then(()=>{
                    resolve({code: 0, message: "删除成功，餐位状态已同步"})
                })
            })
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_business

    return new Promise(function (resolve, reject) {
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
                    tblName: "ly0d5diningplace",
                    operator: "find",
                    query: {id_restaurant: objRestaurant._id}
                }).then(result => {
                    let arrDiningplace = result.data;
                    GQuery({
                        tblName: "ly0d5table",
                        operator: "find",
                        query: {
                            id_restaurant: objRestaurant._id,
                            status_code: objBusiness.status === "1" ? "1" : {$ne: "0"}
                        }
                    }).then(result => {
                        let arrTable = result.data;
                        resolve({code: 0, message: "",
                            data: {
                                objRestaurant,
                                arrDiningplace,
                                arrTable
                            }
                        })
                    })
                })
            })
        })
    })
}

// 插入多条记录
function insertMany (data) {
    // data.id_business
    // data.arrTable

    return new Promise((resolve, reject) => {
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d5business',
            operator: 'findOne',
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data

            // 数据约束
            if (!data.id_business) {
                return resolve({code: 1, message: '订单ID无'})
            }
            if (!data.arrTable || data.arrTable.length === 0) {
                return resolve({code: 1, message: '未选择餐位'})
            }

            // 提交
            let arrPromise = [],
                countFail = 0 // 提交失败计数
            for (let i = 0; i < data.arrTable.length; i++) {
                arrPromise[i] = new Promise(function (resolve0, reject0) {
                    utils.tableUsed.tableUsed({
                        id_b_table: null,
                        id_table: data.arrTable[i]._id,
                    }).then(result => {
                        if (result.code === 1) {
                            countFail = countFail + 1
                            return resolve0({code: 1, message: '1 条记录插入失败(客房已被使用)'})
                        }

                        GQuery({
                            tblName: 'ly0d5b_table',
                            operator: 'insertOne',
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objBusiness.id_dataunit,
                                dataunit_name: objBusiness.dataunit_name,
                                id_restaurant: objBusiness.id_restaurant,
                                restaurant_name: objBusiness.restaurant_name ? objBusiness.restaurant_name : "数据缺失",
                                id_business: objBusiness._id,
                                id_diningplace: data.arrTable[i].id_diningplace ? data.arrTable[i].id_diningplace : null,
                                diningplace_text: data.arrTable[i].diningplace_text ? data.arrTable[i].diningplace_text : "",
                                id_table: data.arrTable[i]._id,
                                tableno: data.arrTable[i].tableno,
                            }
                        }).then(() => {
                            resolve0({code: 0, message: '1 条记录插入成功'})
                        })
                    })
                })
            }

            Promise.all(arrPromise).then(function () {
                // 同步房态
                utils.tableStatus.setTableStatusWithBusiness({id_business: objBusiness._id}).then(()=>{
                    resolve({code: 0, message: (data.arrTable.length - countFail) + ' 条记录插入成功',
                        success: data.arrTable.length - countFail
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
    getPageData,
    insertMany
}
