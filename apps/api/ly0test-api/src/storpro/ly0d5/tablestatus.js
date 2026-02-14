import {GQuery} from '../../main/GQuery.js'
import utils from "./utils/index.js"
import ly0d5business from './business.js'
import ly0d5b_table from './b_table.js'

// 获取餐位状态
function getPageData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_restaurant 当前用户信息：餐馆id

    return new Promise((resolve, reject) => {
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
                tblName: 'ly0d5table',
                operator: 'find',
                query: q0
            }).then(result => {
                let arrTable = result.data
                GQuery({
                    tblName: 'ly0d5diningplace',
                    operator: 'find',
                    query: q0
                }).then(result => {
                    let arrDiningplace = result.data
                    resolve({code: 0, message: "",
                        data: {
                            arrRestaurant,
                            arrTable,
                            arrDiningplace,
                            arrTableStatus: code.tableStatus
                        }
                    })
                })
            })
        })
    })
}

// 用餐登记
function newBusiness (data) {
    // data.client_cellphone
    // data.client_name
    // data.peoples
    // data.time
    // data.booknote
    // data.booktime
    // data.arrTable 选中的餐位数组

    return new Promise((resolve, reject) => {
        // 不能提交
        if (!data.time) {
            return resolve({code: 1, message: '用餐时间：必填项'})
        }

        GQuery({
            tblName: "ly0d5restaurant",
            operator: "findOne",
            query: {
                _id: data.arrTable[0].id_restaurant
            }
        }).then(result=>{
            let objRestaurant = result.data
            ly0d5business.insertOne(Object.assign(data, {id_restaurant: objRestaurant._id})).then(function (result) {
                if (result.code !== 0) {
                    return resolve(result)
                }
                let id_business = result._id

                ly0d5b_table.insertMany({
                    id_business,
                    arrTable: data.arrTable
                }).then(function (result) {
                    if (result.code !== 0) {
                        ly0d5business.deleteOne({_id: id_business}).then(function () {
                            resolve(result)
                        })
                    } else {
                        resolve({code: 0, message: '登记成功',
                            id_business
                        })
                    }
                })
            })
        })
    })
}

// 修改状态
function setStatus (data) {
    // data._id
    // data.status_code

    return new Promise((resolve, reject) => {
        // 数据约束
        if (!data.status_code) {
            return resolve({code: 1, message: '未选择状态'})
        }
        // 同步餐位状态
        utils.tableStatus.setTableStatus(data).then(result=>{
            resolve(result)
        })
    })
}

export default {
    getPageData,
    newBusiness,
    setStatus
}
