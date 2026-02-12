import {GQuery} from '../../main/GQuery.js'
import ly0d2code from "../ly0d2/code.js"

// 分页查询
function find(data){
    // data.query
    // data.query.id_dataunit
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        // 查询修正
        let query = {
            id_dataunit: data.query.id_dataunit,
            status_code: {$ne: "2"}
        }

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
                tblName: 'ly0d0annual',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: 'ly0d0annual',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data,
                total: result [1].count
            })
        })
    })
}

// 设置支付状态
function setStatus(data){
    // data._id
    // data.status_code

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d0annual',
            operator: 'updateOne',
            query: {_id: data._id},
            update: {
                status_code: data.status_code,
                status_text: ly0d2code.paymentStatus.find(i=>{
                    return i.code === data.status_code
                }).text
            }
        }).then(()=>{
            resolve({code: 0, message: "",
                dataNew: result.dataNew,
                dataOld: result.dataOld
            })
        })
    })
}

export default {
    find,
    setStatus
}
