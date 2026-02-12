import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from "../../main/config.js";

// 内部模块：查询修正
function queryRevise (data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_property = data0.id_property

        // 抄表名称
        if (data0.id_metername) {
            data1.id_metername = data0.id_metername
        }
        // 抄表时间
        if (data0.time_start || data0.time_end) {
            data1.time = {}
            if (data0.time_start) {
                data1.time.$gte = data0.time_start
            }
            if (data0.time_end) {
                data1.time.$lte = data0.time_end
            }
        }
        // 抄表备注 模糊匹配
        if (data0.note) {
            data1.note = {'$regex': `.*${data0.note}.*`}
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
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_unit
    // data.query.id_property
    // data.query.id_metername
    // data.query.time_start
    // data.query.time_end
    // data.query.id_business
    // data.query.note
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
                    tblName: 'ly0d9meterrecord',
                    operator: 'find',
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'countDocuments',
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data.map(i=>{
                        return Object.assign(i, {
                            photo: imageDomain + result.data.photo
                        })
                    }),
                    count: result [1].count
                })
            })
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
                tblName: 'ly0d9metername',
                operator: 'find',
                query: {id_unit: objProperty.id_unit}
            }).then(result => {
                let arrMetername = result.data
                resolve({code: 0, message: "",
                    data: {
                        arrMetername
                    }
                })
            })
        })
    })
}

export default {
    find,
    getPageData
}
