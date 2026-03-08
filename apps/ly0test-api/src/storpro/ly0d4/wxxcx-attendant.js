// 微信小程序.楼层服务员

// 获取旅店及相关信息
async function getHotel({data, dependencies}) {
    // data.userId

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d4attendant",
        operator: "findOne",
        query: {_id: data.userId}
    })
    const objUser = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d4hotel",
        operator: "findOne",
        query: {_id: objUser.id_hotel}
    })
    const objHotel = result.data // 旅店信息
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d4roomplace",
        operator: "find",
        query: {id_hotel: objHotel._id}
    })
    const arrRoomplace = result.data // 客房分区
    return {code: 0, message: "",
        data: {
            objHotel,
            arrRoomplace
        }
    }
}

// 分页查询
async function getRoom({data, dependencies}) {
    // data.id_hotel
    // data.roomno
    // data.id_roomplace
    // data.roomplace_text
    // data.limit
    // data.page

    const query = {id_hotel: data.id_hotel};
    if (data.roomno) {
        Object.assign(query, {roomno: {'$regex': `.*${data.roomno}.*`}})
    }
    if (data.id_roomplace) {
        Object.assign(query, {id_roomplace: data.id_roomplace})
    }
    if (data.roomplace_text) {
        Object.assign(query, {roomplace_text: {'$regex': `.*${data.roomplace_text}.*`}})
    }
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4room',
        operator: 'find',
        query,
        sort: {roomno: 1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    return {
        code: 0, message: "",
        data: {
            arrRoom: result.data
        }
    }
}

// 退房
async function toStatus3({data, dependencies}) {
    // data.id_room

    await dependencies.GQuery.GQuery({
        tblName: "ly0d4room",
        operator: "updateOne",
        query: {_id: data.id_room},
        update: {status_code: "3", status_text: "脏房"}
    })
    return {code: 0, message: "已修改房态"}
}

// 就绪
async function toStatus4({data, dependencies}) {
    // data.id_room

    await dependencies.GQuery.GQuery({
        tblName: "ly0d4room",
        operator: "updateOne",
        query: {_id: data.id_room},
        update: {status_code: "4", status_text: "已打扫"}
    })
    return {code: 0, message: "已修改房态"}
}

// 客房备忘
async function memo({data, dependencies}) {
    // data.id_room
    // data.memo
    // data.recorder_cellphone
    // data.recorder_name

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d4room",
        operator: "findOne",
        query: {_id: data.id_room}
    })
    const objRoom = result.data
    if (!objRoom || !objRoom.id_business) {
        return resolve({code: 1, message: "房态错误"})
    }

    const thisTime = new Date();
    await dependencies.GQuery.GQuery({
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
    })
    return {code: 0, message: "已提交备忘"}
}

export default {
    getHotel,
    getRoom,
    toStatus3,
    toStatus4,
    memo
}
