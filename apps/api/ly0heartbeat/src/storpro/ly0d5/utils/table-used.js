import {GQuery} from '../../../main/GQuery.js'

// 查询餐位是否已被使用
function tableUsed(data){
    // data.id_b_table ID排除
    // data.id_table

    return new Promise((resolve, reject)=>{
        // return resolve({code: 0, message: '餐位未被使用'})
        // /*
        let q = {
            id_table: data.id_table
        }
        if(!!data.id_b_table){
            q = Object.assign(q, {_id: {$ne: data.id_b_table}})
        }
        GQuery({
            tblName: 'ly0d5b_table',
            operator: 'findOne',
            query: q
        }).then(result => {
            if (result.data) {
                let objBTable = result.data
                GQuery({
                    tblName: "ly0d5business",
                    operator: "findOne",
                    query: {
                        _id: objBTable.id_business
                    }
                }).then(result=>{
                    if(result.data.status_code === "1"){ // 订单状态：用餐
                        resolve({code: 1, message: '餐位已被使用'})
                    }else{
                        resolve({code: 0, message: '餐位未被使用'})
                    }
                })
            }else{
                resolve({code: 0, message: '餐位未被使用'})
            }
        })
        // */
    })
}

export default {
    tableUsed
}