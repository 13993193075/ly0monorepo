// 电子图表
import {GQuery} from '../../main/GQuery.js'

// 时段应收统计
function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_restaurant 当前用户信息：餐馆id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_restaurant) {
            q._id = data.id_restaurant
            q0.id_restaurant = data.id_restaurant
        } else {
            q0.id_restaurant = {$exists: true, $ne: null}
        }
        q0.time = {$exists: true, $ne: null}
        q0.amount = {$exists: true, $ne: null, $gt: 0}
        q0.deal = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: 'ly0d5restaurant',
            operator: 'find',
            query: q
        }).then(result => {
            let data = {restaurant: result.data}
            GQuery({
                tblName: 'ly0d5business',
                operator: 'find',
                query: q0,
                field: ['id_restaurant', 'time', 'amount_goods', 'amount_goods0', 'amount_goods1', 'amount', 'deal']
            }).then(result => {
                data.business = result.data
                resolve({code: 0, message: "",
                    data // 数据：restaurant, business
                })
            })
        })
    })
}

export default {
    echart
}
