import {GQuery} from '../../main/GQuery.js'
import ly0d2wxzf from '../ly0d2/wxzf.js'

// 获取停车场信息
function getCarpark(data) {
    // data.id_user 当前用户信息

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d11warden",
            operator: "findOne",
            query: {_id: data.id_user}
        }).then(result => {
            let objUser = result.data
            GQuery({
                tblName: "ly0d11carpark",
                operator: "find",
                query: {id_dataunit: objUser.id_dataunit} // 获取所有停车场信息，以用于切换
            }).then(result => {
                resolve({code: 0, message: "获取停车场信息成功",
                    arrCarpark: result.data
                })
            })
        })
    })
}

// 微信支付.商户二维码收款
function wxzf2(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.recorder_cellphone 当前用户信息：手机号码
    // data.recorder_name 当前用户信息：用户名称
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d11carpassin",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            let objCarpassin = result.data
            GQuery({
                tblName: "ly0d11carpark",
                operator: "findOne",
                query: {_id: objCarpassin.id_carpark}
            }).then(result => {
                let objCarpark = result.data
                let fee = objCarpassin.fee ? objCarpassin.fee : (objCarpassin.price ? objCarpassin.price : 0)
                ly0d2wxzf.wxzf2({
                    id_dataunit: data.id_dataunit,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name,

                    id_business: objCarpassin._id,
                    businesstype_code: "ly0d11carpassin",
                    businesstype_text: "停车场营收.临时停车",
                    amount: Math.round(fee * 100) / 100,
                    method_code: "wxzf2",
                    method_text: "微信支付.商户二维码收款",
                    note: null,

                    appid: objCarpark.wx_appid,
                    mchid: objCarpark.wx_mchid,
                    description: "停车场营收.临时停车"
                }).then(function (result) {
                    resolve(result)
                })
            })
        })
    })
}

// 停车记录
function record(data) {
    // data.id_carpark
    // data.carplateSearchVal
    // data.filter
    // data.limit
    // data.page

    // 重置查询条件
    let query = {}
    // 停车场
    query.id_carpark = data.id_carpark
    // 车牌 模糊匹配
    if (data.carplateSearchVal) {
        query.carplate = {'$regex': `.*${data.carplateSearchVal}.*`}
    }
    // 没有离开时间
    if (data.filter === "record") {
        query.$or = [
            {timeout: {$exists: false}},
            {timeout: null}
        ]
    } else if (data.filter === "history") {
        query.$and = [
            {timeout: {$exists: true}},
            {timeout: {$ne: null}}
        ]
    }

    return new Promise(function (resolve, reject) {
        Promise.all([
            GQuery({
                tblName: "ly0d11carpassin",
                operator: "find",
                query,
                sort: {_id: -1},
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d11carpassin",
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

export default {
    getCarpark,
    wxzf2,
    record
}
