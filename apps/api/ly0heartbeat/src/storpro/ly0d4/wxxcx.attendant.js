// 微信小程序.楼层服务员
import {GQuery} from '../../main/GQuery.js'

// 获取旅店及相关信息
function getHotel(data) {
    // data.userId

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d4attendant",
            operator: "findOne",
            query: {_id: data.userId}
        }).then(result => {
            let objUser = result.data
            GQuery({
                tblName: "ly0d4hotel",
                operator: "findOne",
                query: {_id: objUser.id_hotel}
            }).then(result => {
                let objHotel = result.data // 旅店信息
                GQuery({
                    tblName: "ly0d4roomplace",
                    operator: "find",
                    query: {id_hotel: objHotel._id}
                }).then(result => {
                    let arrRoomplace = result.data // 客房分区
                    resolve({code: 0, message: "",
                        data: {
                            objHotel,
                            arrRoomplace
                        }
                    })
                })
            })
        })
    })
}

// 分页查询
function getRoom(data) {
    // data.id_hotel
    // data.roomno
    // data.id_roomplace
    // data.roomplace_text
    // data.limit
    // data.page

    let query = {id_hotel: data.id_hotel};
    if (data.roomno) {
        query = Object.assign(query, {roomno: {'$regex': `.*${data.roomno}.*`}})
    }
    if (data.id_roomplace) {
        query = Object.assign(query, {id_roomplace: data.id_roomplace})
    }
    if (data.roomplace_text) {
        query = Object.assign(query, {roomplace_text: {'$regex': `.*${data.roomplace_text}.*`}})
    }
    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d4room',
            operator: 'find',
            query,
            sort: {roomno: 1},
            skip: (data.page - 1) * data.limit,
            limit: Number(data.limit) // 分页处理
        }).then(function (result) {
            resolve({
                code: 0, message: "",
                data: {
                    arrRoom: result.data
                }
            })
        })
    })
}

// 退房
function toStatus3(data) {
    // data.id_room

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d4room",
            operator: "updateOne",
            query: {_id: data.id_room},
            update: {status_code: "3", status_text: "脏房"}
        }).then(() => {
            resolve({code: 0, message: "已修改房态"})
        })
    })
}

// 就绪
function toStatus4(data) {
    // data.id_room

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d4room",
            operator: "updateOne",
            query: {_id: data.id_room},
            update: {status_code: "4", status_text: "已打扫"}
        }).then(() => {
            resolve({code: 0, message: "已修改房态"})
        })
    })
}

// 客房备忘
function memo(data) {
    // data.id_room
    // data.memo
    // data.recorder_cellphone
    // data.recorder_name

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d4room",
            operator: "findOne",
            query: {_id: data.id_room}
        }).then(result => {
            let objRoom = result.data
            if (!objRoom || !objRoom.id_business) {
                return resolve({code: 1, message: "房态错误"})
            }

            let thisTime = new Date();
            GQuery({
                tblName: "ly0d4memo",
                operator: "insertOne",
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objRoom.id_dataunit,
                    id_hotel: objRoom.id_hotel,
                    hotel_name: objRoom.hotel_name,
                    id_business: objRoom.id_business,

                    memo: "[房号: " + objRoom.roomno + "] " + data.memo,
                    time: thisTime,
                    recorder_cellphone: data.recorder_cellphone,
                    recorder_name: data.recorder_name
                }
            }).then(() => {
                resolve({code: 0, message: "已提交备忘"})
            })
        })
    })
}

export default {
    getHotel,
    getRoom,
    toStatus3,
    toStatus4,
    memo
}
