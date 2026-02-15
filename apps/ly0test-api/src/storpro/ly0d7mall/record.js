import {GQuery} from '../../main/GQuery.js'

// 获取商城用户采购记录
function getBusiness(data){
    // data.id_guest
    // data.limit
    // data.page

    return new Promise((resolve, reject)=>{
        let query = {
            id_guest: data.id_guest,
            status_code: "2"
        }
        Promise.all([
            GQuery({
                tblName: "ly0d7business",
                operator: "find",
                query,
                sort: {time: -1},
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit) // 分页处理
            }),
            GQuery({
                tblName: "ly0d7business",
                operator: "countDocuments",
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: "",
                dataBusiness: {
                    data: result [0].data,
                    count: result [1].count
                }
            })
        })
    })
}

// 获取某一采购记录的商品清单
function getBGoods(data){
    // data.id_business

    return new Promise((resolve, reject)=>{
        GQuery({
            tblName: "ly0d7b_goods",
            operator: "find",
            query: {id_business: data.id_business}
        }).then(result=>{
            resolve({code: 0, message: "",
                dataBGoods: result.data
            })
        })
    })
}

export default {
    getBusiness,
    getBGoods
}