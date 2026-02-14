import {GQuery} from '../../main/GQuery.js'

// 内部模块：数据约束：批量新增
function dataRuleBatch(data) {
    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d12room",
            operator: "findOne",
            query: {_id: data.id_room}
        }).then(result => {
            let objRoom = result.data
            // 不能提交
            if (!(/^[1-9][0-9]*$/.test(data.row_from) && Number(data.row_from) <= Number(objRoom.rows))) {
                return resolve({code: 1, message: "起始行号：必须是 1-" + objRoom.rows + " 的整数"})
            }
            if (!(/^[1-9][0-9]*$/.test(data.row_to) && Number(data.row_to) <= Number(objRoom.rows))) {
                return resolve({code: 1, message: "截止行号：必须是 1-" + objRoom.rows + " 的整数"})
            }
            if (Number(data.row_from) > Number(data.row_to)) {
                return resolve({code: 1, message: "起始行号不能大于截止行号"})
            }
            if (!(/^[1-9][0-9]*$/.test(data.col_from) && Number(data.col_from) <= Number(objRoom.cols))) {
                return resolve({code: 1, message: "起始列号：必须是 1-" + objRoom.cols + " 的整数"})
            }
            if (!(/^[1-9][0-9]*$/.test(data.col_to) && Number(data.col_to) <= Number(objRoom.cols))) {
                return resolve({code: 1, message: "截止列号：必须是 1-" + objRoom.cols + " 的整数"})
            }
            if (Number(data.col_from) > Number(data.col_to)) {
                return resolve({code: 1, message: "起始列号不能大于截止列号"})
            }
            resolve({code: 0, objRoom})
        })
    })
}

// 批量新增
function batch(data) {
    // data.id_room
    // data.row_from
    // data.row_to
    // data.col_from
    // data.col_to

    return new Promise(function (resolve, reject) {
        dataRuleBatch(data).then(result => { // 数据约束
            if (result.code === 1) {
                return resolve(result)
            }

            let row_from = Number(data.row_from), row_to = Number(data.row_to),
                col_from = Number(data.col_from), col_to = Number(data.col_to),
                objRoom = result.objRoom,
                dataNew = []

            for (let i = row_from; i <= row_to; i++) {
                for (let j = col_from; j <= col_to; j++) {
                    dataNew.push({
                        id_dataunit: objRoom.id_dataunit,
                        dataunit_name: objRoom.dataunit_name,
                        id_place: objRoom.id_place,
                        place_name: objRoom.place_name,
                        id_position: objRoom.id_position,
                        position_text: objRoom.position_text,
                        id_room: objRoom._id,
                        room_name: objRoom.name,
                        row: i,
                        col: j
                    })
                }
            }
            GQuery({
                tblName: "ly0d12seat",
                operator: "insertMany",
                update: dataNew
            }).then(() => {
                return resolve({code: 0, message: "提交成功"})
            })
        })
    })
}

// 批量删除
// 安全警告：可能会删除关联数据
function deleteMany(data) {
    // data.id_room
    // data.row_from
    // data.row_to
    // data.col_from
    // data.col_to

    return new Promise(function (resolve, reject) {
        dataRuleBatch(data).then(result => { // 数据约束
            if (result.code === 1) {
                return resolve(result)
            }

            GQuery({
                tblName: "ly0d12seat",
                operator: "deleteMany",
                query: {
                    id_room: data.id_room,
                    row: {$and: {$gte: Number(data.row_from), $lte: Number(data.row_to)}},
                    col: {$and: {$gte: Number(data.col_from), $lte: Number(data.col_to)}}
                }
            }).then(() => {
                resolve({code: 0, message: "删除成功"})
            })
        })
    })
}

export default {
    batch,
    deleteMany
}
