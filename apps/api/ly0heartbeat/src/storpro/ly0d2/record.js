// 支付记录（维护）

import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"

// 内部模块：查询修正
function queryRevise(data){
    let data0 = data ? data : {} , data1 = {};
    if(data0._id){
        data1._id = data0._id;
        return data1;
    }

    if(data0.id_dataunit){
        data1.id_dataunit = data0.id_dataunit;
        return data1;
    }

    if(data0.id_business){ // 订单ID
        data1.id_business = data0.id_business;
        return data1;
    }

    if(data0.businesstype_code){ // 订单类型
        data1.businesstype_code = data0.businesstype_code;
        return data1;
    }

    if(data0.process_code){ // 系统内置支付流程
        data1.process_code = data0.process_code;
        return data1;
    }

    if(data0.method_code){ // 支付方式
        data1.method_code = data0.method_code;
        return data1;
    }

    if(data0.status_code){// 支付状态
        data1.status_code = data0.status_code;
        return data1;
    }

    // 支付发起时间
    if(data0.time_start || data0.time_end){
        data1.time = {};
        if(data0.time_start){
            data1.time.$gte = data0.time_start;
        }
        if(data0.time_end){
            data1.time.$lte = data0.time_end;
        }
    }

    if(data0.note){ // 备注，模糊匹配
        data1.note = { '$regex' : `.*${data0.note}.*` };
    }

    return data1;
}

// 分页查询
function find(data){
    // data.query
    // data.query._id
    // data.query.id_dataunit
    // data.query.id_business
    // data.query.businesstype_code
    // data.query.process_code
    // data.query.method_code
    // data.query.status_code
    // data.query.time_start
    // data.query.time_end
    // data.query.note
    // data.limit
    // data.page
    // data.sort.label
    // data.sort.order

    return new Promise(function(resolve, reject){
        let query = queryRevise(data.query); // 查询修正

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

// 删除一条记录
function deleteOne(data){
    // data._id

    return new Promise(function(resolve, reject){
        GQuery({
            tblName: "ly0d2payment",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(()=>{
            resolve({code: 0, message: '删除一条记录成功'})
        })
    })
}

// 获取页面初始化数据
function getPgData(data){
    // data: null

    return new Promise(function(resolve, reject){
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "find",
            query: {},
            sort: {_id: -1}
        }).then(result=>{
            resolve({code: 0, message: "",
                data: {
                    arrDataunit: result.data,
                    arrBusinessType: code.businessType,
                    arrProcess: code.paymentProcess,
                    arrMethod: code.paymentMethod,
                    arrStatus: code.paymentStatus
                }
            })
        })
    })
}

export default {
    find,
    deleteOne,
    getPgData
}
