import {GQuery} from '../../main/GQuery.js'

function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_carpark 当前用户信息：停车场id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_carpark) {
            q._id = data.id_carpark
            q0.id_carpark = data.id_carpark
        } else {
            q0.id_carpark = {$exists: true, $ne: null}
        }
        q0.timeout = {$exists: true, $ne: null}
        q0.price = {$exists: true, $ne: null, $gt: 0}
        q0.fee = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: "ly0d11carpark",
            operator: "find",
            query: q
        }).then(result => {
            let data = {carpark: result.data}
            GQuery({
                tblName: "ly0d11carpassin",
                operator: "find",
                query: q0,
                field: ["id_carpark", "timeout", "price", "fee"]
            }).then(result => {
                data.carpassin = result.data
                resolve({code: 0, message: "",
                    data // 数据：carpark, carpassin
                })
            })
        })
    })
}

function echart0(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_carpark 当前用户信息：停车场id

    return new Promise(function (resolve, reject) {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_carpark) {
            q._id = data.id_carpark
            q0.id_carpark = data.id_carpark
        } else {
            q0.id_carpark = {$exists: true, $ne: null}
        }
        q0.time = {$exists: true, $ne: null}
        q0.fee = {$exists: true, $ne: null, $gt: 0}

        GQuery({
            tblName: "ly0d11carpark",
            operator: "find",
            query: q
        }).then(result => {
            let data = {carpark: result.data}
            GQuery({
                tblName: "ly0d11carwithin_rec",
                operator: "find",
                query: q0,
                field: ["id_carpark", "time", "fee"]
            }).then(result => {
                data.carwithin_rec = result.data
                resolve({code: 0, message: "",
                    data // 数据：carpark, carwithin_rec
                })
            })
        })
    })
}

export default {
    echart,
    echart0
}
