import {GQuery} from '../../main/GQuery.js'

function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_unit 当前用户信息：工作单位id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_unit) {
            q._id = data.id_unit
            q0.id_unit = data.id_unit
        } else {
            q0.id_unit = {$exists: true, $ne: null}
        }
        q0.id_group = {$exists: true, $ne: null}
        q0.time = {$exists: true, $ne: null}
        q0.deal = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: "ly0d10business",
            operator: "find",
            query: q0,
            field: ["id_unit", "id_group", "time", "deal"]
        }).then(result => {
            let business = result.data
            GQuery({
                tblName: "ly0d10unit",
                operator: "find",
                query: q0
            }).then(result => {
                let unit = result.data
                resolve({code: 0, message: "",
                    data: {
                        business,
                        unit
                    }
                })
            })
        })
    })
}

export default {
    echart
}
