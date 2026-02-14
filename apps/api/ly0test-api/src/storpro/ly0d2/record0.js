// 支付记录（交易端）

import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"

// 内部模块：查询修正
function queryRevise(data){
    let data0 = data ? data : {} , data1 = {};
    if(data0._id){
        data1._id = data0._id;
        return data1;
    }
    // 订单id
    data1.id_business = data0.id_business;

    return data1;
}

// 分页查询
function find(data){
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.note
    // data.limit
    // data.page
    // data.sort.label
    // data.sort.order

    return new Promise(function(resolve, reject){
        if(!data.query.id_business || data.query.id_business.length !== 24){
            return resolve({data: [], count: 0})
        }
        let query = queryRevise(data.query) // 查询修正

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
                tblName: "ly0d2payment",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d2payment",
                operator: "countDocuments",
                query
            })
        ]).then(function(result){
            resolve({code: 0, message: '',
                data: result[0].data,
                total: result[1].count
            })
        })
    })
}

// 获取页面初始化数据
function getPgData(data){
    // data: null

    return new Promise(function(resolve, reject){
        resolve({code: 0, message: "",
            data: {
                arrBusinessType: code.businessType,
                arrProcess: code.paymentProcess,
                arrMethod: code.paymentMethod,
                arrStatus: code.paymentStatus
            }
        })
    })
}

export default {
    find,
    getPgData
}
