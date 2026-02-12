import {GQuery} from '../../main/GQuery.js'

function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：物业单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        } else {
            q0.id_unit = {$exists: true, $ne: null}
        }
        q0.time = {$exists: true, $ne: null}
        q0.deal = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: "ly0d9unit",
            operator: "find",
            query: q
        }).then(result => {
            let data = {unit: result.data}
            GQuery({
                tblName: "ly0d9business",
                operator: "find",
                query: q0,
                field: ["id_unit", "time", "deal", "deal_goods", "deal_goods0"]
            }).then(result => {
                data.business = result.data
                resolve({code: 0, message: "",
                    data // 数据：unit, business
                })
            })
        })
    })
}

export default {
    echart
}
