import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    return new Promise((resolve, reject) => {
        let data0 = data ? data : {}, data1 = {}
        if (data0._id) {
            data1._id = data0._id
            return resolve(data1)
        }
        data1.id_dataunit = data0.id_dataunit

        // 场所 _id
        if (data0.id_place) {
            data1.id_place = data0.id_place
        }

        // 座位信息
        if (data0.id_position) { // 房间位置 _id
            data1.id_position = data0.id_position
        }
        if (data0.id_room) { // 房间 _id
            data1.id_room = data0.id_room
        }

        // 预约信息
        if (data0.user_cellphone) { // 使用人手机号
            data1.user_cellphone = data0.user_cellphone
        }
        if (data0.user_name) { // 使用人姓名，模糊匹配
            data1.user_name = {'$regex': `.*${data0.user_name}.*`}
        }
        if (data0.date_start) { // 使用日期
            data1.date = {'$gte': `${data0.date_start}`}
        }
        if (data0.date_end) {
            data1.date = {'$lte': `${data0.date_end}`}
        }

        resolve(data1)
    })
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_place
    // data.query.id_position
    // data.query.id_room
    // data.query.user_cellphone
    // data.query.user_name
    // data.query.date_start
    // data.query.date_end
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        queryRevise(data.query).then(query => { // 查询修正
            // 排序
            let sort
            if (data.sort && data.sort.label && data.sort.order) {
                sort = {}
                if (data.sort.order === 'ascending') {
                    sort[data.sort.label] = 1
                } else if (data.sort.order === 'descending') {
                    sort[data.sort.label] = -1
                } else {
                    sort[data.sort.label] = 1
                }
            } else {
                sort = {_id: -1}
            }

            Promise.all([
                GQuery({
                    tblName: "ly0d12appointment",
                    operator: "find",
                    query,
                    sort,
                    skip: (data.page - 1) * data.limit,
                    limit: Number(data.limit) // 分页处理
                }),
                GQuery({
                    tblName: "ly0d12appointment",
                    operator: "countDocuments",
                    query
                })
            ]).then(function (result) {
                resolve({
                    data: result [0].data,
                    count: result [1].count
                })
            })
        })
    })
}

// 内部模块：数据约束
function dataRule(data) {
    // 座位信息
    if (!data.id_place) {
        return {code: 1, message: "场所：必选项"}
    }
    if (!data.id_room) {
        return {code: 1, message: "房间：必选项"}
    }
    if (!data.id_seat) {
        return {code: 1, message: "座位：必选项"}
    }

    // 预约信息
    if (!data.user_cellphone) {
        return {code: 1, message: "使用人手机号：必填项"}
    }
    if (!data.date) {
        return {code: 1, message: "使用日期：必填项"}
    }
    if (!data.id_day) {
        return {code: 1, message: "使用时段：必选项"}
    }

    return {code: 0, message: "可以提交"}
}

// 插入一条记录
function insertOne(data) {
    // data.id_seat
    // data.user_cellphone
    // data.user_name
    // data.date
    // data.id_day

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d12seat",
            operator: "findOne",
            query: {
                _id: data.id_seat
            }
        }).then(result=>{
            let objSeat = result.data
            GQuery({
                tblName: "ly0d12day",
                operator: "findOne",
                query: {
                    _id: data.id_day
                }
            }).then(result=>{
                let objDay = result.data
                GQuery({
                    tblName: "ly0d12appointment",
                    operator: "insertOne",
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: objSeat.id_dataunit,
                        dataunit_name: objSeat.dataunit_name,
                        id_place: objSeat.id_place,
                        place_name: objSeat.place_name,
                        id_position: objSeat.id_position ? objSeat.id_position : null,
                        position_text: objSeat.position_text ? objSeat.position_text : "",
                        id_room: objSeat.id_room,
                        room_name: objSeat.room_name,
                        id_seat: objSeat._id,
                        seat_row: objSeat.row,
                        seat_col: objSeat.col,
                        user_cellphone: data.user_cellphone,
                        user_name: data.user_name ? data.user_name : "",
                        date: data.date,
                        id_day: objDay._id,
                        day: objDay.day,
                        day_openfrom_hh: objDay.openfrom_hh,
                        day_openfrom_mm: objDay.openfrom_mm,
                        day_opento_hh: objDay.opento_hh,
                        day_opento_mm: objDay.opento_mm
                    }
                }).then(result => {
                    resolve({code: 0, message: "新增成功",
                        _id: result.dataNew._id
                    })
                })
            })
        })
    })
}

// 查询一条记录
function findOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d12appointment",
            operator: "findOne",
            query: {_id: data._id}
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_seat
    // data.user_cellphone
    // data.user_name
    // data.date
    // data.id_day

    return new Promise((resolve, reject) => {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: "ly0d12seat",
            operator: "findOne",
            query: {
                _id: data.id_seat
            }
        }).then(result=>{
            let objSeat = result.data
            GQuery({
                tblName: "ly0d12day",
                operator: "findOne",
                query: {
                    _id: data.id_day
                }
            }).then(result=>{
                let objDay = result.data
                GQuery({
                    tblName: "ly0d12appointment",
                    operator: "updateOne",
                    query: {_id: data._id},
                    update: {
                        time_update: thisTime,
                        id_dataunit: objSeat.id_dataunit,
                        dataunit_name: objSeat.dataunit_name,
                        id_place: objSeat.id_place,
                        place_name: objSeat.place_name,
                        id_position: objSeat.id_position ? objSeat.id_position : null,
                        position_text: objSeat.position_text ? objSeat.position_text : "",
                        id_room: objSeat.id_room,
                        room_name: objSeat.room_name,
                        id_seat: objSeat._id,
                        seat_row: objSeat.row,
                        seat_col: objSeat.col,
                        user_cellphone: data.user_cellphone,
                        user_name: data.user_name ? data.user_name : "",
                        date: data.date,
                        id_day: objDay._id,
                        day: objDay.day,
                        day_openfrom_hh: objDay.openfrom_hh,
                        day_openfrom_mm: objDay.openfrom_mm,
                        day_opento_hh: objDay.opento_hh,
                        day_opento_mm: objDay.opento_mm
                    }
                }).then(() => {
                    resolve({code: 0, message: "修改成功"})
                })
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    //data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d12appointment',
            operator: 'deleteOne',
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: '删除成功'})
        })
    })
}

// 获取页面初始化数据
function getPageData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_place 当前用户信息：场所id

    return new Promise((resolve, reject) => {
        let q = {id_dataunit: data.id_dataunit}
        let q0 = JSON.parse(JSON.stringify(q))
        if (data.id_place) {
            q._id = data.id_place
            q0.id_place = data.id_place
        }

        GQuery({
            tblName: "ly0d12place",
            operator: "find",
            query: q
        }).then(result => {
            let arrPlace = result.data
            GQuery({
                tblName: "ly0d12position",
                operator: "find",
                query: q0
            }).then(result => {
                let arrPosition = result.data
                GQuery({
                    tblName: "ly0d12room",
                    operator: "find",
                    query: q0
                }).then(result => {
                    let arrRoom = result.data
                    GQuery({
                        tblName: "ly0d12seat",
                        operator: "find",
                        query: q0
                    }).then(result => {
                        let arrSeat = result.data
                        GQuery({
                            tblName: "ly0d12day",
                            operator: "find",
                            query: q0
                        }).then(result => {
                            let arrDay = result.data
                            resolve({code: 0, message: "",
                                data: {
                                    arrPlace,
                                    arrPosition,
                                    arrRoom,
                                    arrSeat,
                                    arrDay
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne,
    getPageData
}
