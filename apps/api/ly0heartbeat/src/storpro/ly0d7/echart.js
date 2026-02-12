// 电子图表
import {GQuery} from '../../main/GQuery.js'

// 时段应收统计
function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_shop) {
            q._id = data.id_shop
            q0.id_shop = data.id_shop
        } else {
            q0.id_shop = {$exists: true, $ne: null}
        }
        q0.time = {$exists: true, $ne: null}
        q0.amount = {$exists: true, $ne: null, $gt: 0}
        q0.deal = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: "ly0d7shop",
            operator: "find",
            query: q
        }).then(result => {
            let data = {shop: result.data}
            GQuery({
                tblName: "ly0d7business",
                operator: "find",
                query: q0,
                field: ["id_shop", "time", "amount", "deal"]
            }).then(result => {
                data.business = result.data
                resolve({code: 0, message: "",
                    data // 数据：shop, business
                })
            })
        })
    })
}

export default {
    echart
}
