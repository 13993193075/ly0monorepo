import {GQuery} from '../../main/GQuery.js'

function echart(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_place 当前用户信息：场所id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
            , q1 = JSON.parse(JSON.stringify(q))
        if (data.id_place) {
            q._id = data.id_place
            q0.id_place = data.id_place
            q1.id_place = data.id_place
        } else {
            q0.id_place = {$exists: true, $ne: null}
        }
        q0.id_room = {$exists: true, $ne: null}
        q0.date = {$exists: true, $ne: null}

        GQuery({
            tblName: "ly0d12appointment",
            operator: "find",
            query: q0,
            field: ["id_room", "date"]
        }).then(result => {
            let appointment = result.data
            GQuery({
                tblName: "ly0d12place",
                operator: "find",
                query: q
            }).then(result => {
                let place = result.data
                GQuery({
                    tblName: "ly0d12position",
                    operator: "find",
                    query: q1
                }).then(result => {
                    let position = result.data
                    GQuery({
                        tblName: "ly0d12room",
                        operator: "find",
                        query: q1
                    }).then(result => {
                        let room = result.data
                        resolve({code: 0, message: "",
                            data: {
                                appointment,
                                place,
                                position,
                                room
                            }
                        })
                    })
                })
            })
        })
    })
}

export default {
    echart
}
