import {GQuery} from '../../main/GQuery.js'

// 获取场所列表
function getPlace (data) {
    // data.id_dataunit 当前用户信息：数据单元

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d12place',
            operator: 'find',
            query: {
                id_dataunit: data.id_dataunit,
                closed: false
            }
        }).then(result => {
            resolve({arrPlace: result.data})
        })
    })
}

// 获取位置信息
function getPosition (data) {
    // data.id_dataunit 当前用户信息：数据单元

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d12position',
            operator: 'find',
            query: {
                id_dataunit: data.id_dataunit
            }
        }).then(result => {
            resolve({arrPosition: result.data})
        })
    })
}

// 获取教室信息
function getRoom (data) {
    // data.query
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_place
    // data.query.id_position
    // data.query.position_text
    // data.query.name
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        // 重置查询条件
        let query = {}
        query.id_dataunit = data.query.id_dataunit
        if (data.query.id_place) { // 场所 _id
            query.id_place = data.query.id_place
        }
        if (data.query.id_position) { // 房间位置 _id
            query.id_position = data.query.id_position
        }
        if (data.query.position_text) { // 房间位置，模糊匹配
            query.position_text = {'$regex': `.*${data.query.position_text}.*`}
        }
        if (data.query.name) { // 房间名称，模糊匹配
            query.name = {'$regex': `.*${data.query.name}.*`}
        }

        GQuery({
            tblName: 'ly0d12room',
            operator: 'find',
            query,
            sort: {name: 1},
            limit: Number(data.limit), // 分页
            skip: (data.page - 1) * data.limit
        }).then(res=>{
            resolve({
                arrRoom: res.data
            })
        })
    })
}

// 获取座位及相关综合信息
function getSeat (data) {
    // data.id_room
    // data.time

    let thisTime = new Date()
    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d12room',
            operator: 'findOne',
            query: {_id: data.id_room}
        }).then(result => {
            let objRoom = result.data
            GQuery({
                tblName: 'ly0d12place',
                operator: 'findOne',
                query: {_id: objRoom.id_place}
            }).then(result => {
                let objPlace = result.data
                GQuery({
                    tblName: 'ly0d12seat',
                    operator: 'find',
                    query: {id_room: data.id_room},
                    sort: {
                        row: 1, col: 1
                    }
                }).then(result => {
                    let arrSeat = result.data
                    GQuery({
                        tblName: 'ly0d12day',
                        operator: 'find',
                        query: {id_place: objPlace._id},
                        sort: {
                            openfrom_hh: 1,
                            openfrom_mm: 1,
                            opento_hh: 1,
                            opento_mm: 1
                        }
                    }).then(result => {
                        let arrDay = JSON.parse(JSON.stringify(result.data))

                        // 预约期：当前日期 + (可预约天数 - 1)。示例：可预约天数是2，预约期就是今天、明天
                        let periodDays = 1
                        if(objPlace.maxdays && objPlace.maxdays >= 1){
                            periodDays = objPlace.maxdays
                        }
                        let periodDateStart = new Date(new Date(data.time ? data.time : thisTime).toLocaleDateString())
                        // periodDateStart.setDate()会改变调用者（periodDateStart）的值，所以，需要使用new Date(periodDateStart).setDate()
                        let periodDateEnd = new Date(new Date(periodDateStart).setDate(periodDateStart.getDate() + periodDays - 1))

                        GQuery({
                            tblName: 'ly0d12appointment',
                            operator: 'find',
                            query: {
                                id_room: objRoom._id,
                                date: {$gte: periodDateStart, $lte: periodDateEnd}
                            },
                            sort: {
                                seat_row: 1,
                                seat_col: 1
                            }
                        }).then(result => {
                            let arrAppointment = result.data // 获取预约期内的全部预约记录

                            let arrDatePeriod = [] // 预约期内的综合数据
                            for (let i=0; i<periodDays; i++){
                                arrDatePeriod[i] = {}
                                arrDatePeriod[i].date = new Date(new Date(periodDateStart).setDate(periodDateStart.getDate() + i))
                                arrDatePeriod[i].day = arrDatePeriod[i].date.getDay()
                                arrDatePeriod[i].arrPeriod = [] // 预约期内某一天的开放时段
                                arrDay.forEach(iDay=>{
                                    if (iDay.day === arrDatePeriod[i].day){
                                        arrDatePeriod[i].arrPeriod.push(iDay)
                                    }
                                })
                                arrDatePeriod[i].arrPeriod = arrDatePeriod[i].arrPeriod.map(item=>{
                                    let iDay = JSON.parse(JSON.stringify(item))
                                    iDay.arrAppointment = [] // 某一时段对应的预约记录
                                    arrAppointment.forEach(iAppointment=>{
                                        if (
                                            iDay._id.toString() === iAppointment.id_day.toString() &&
                                            new Date(iAppointment.date).toLocaleDateString() === new Date(arrDatePeriod[i].date).toLocaleDateString()
                                        ){
                                            iDay.arrAppointment.push(iAppointment)
                                        }
                                    })
                                    return iDay
                                })
                            }

                            resolve({
                                sysTime: thisTime,
                                objRoom,
                                objPlace,
                                arrSeat,
                                arrDatePeriod
                            })
                        })
                    })
                })
            })
        })
    })
}

// 取消预约
// 某一用户某一天某一时段只能有一条记录
function cancel (data) {
    // data.user_cellphone 当前用户信息：手机号码
    // data.user_name 当前用户信息：用户名称
    // data.id_day
    // data.date

    return new Promise(function (resolve, reject) {
        let date0 = new Date(new Date(data.date).toLocaleDateString()),
            date1 = new Date(new Date(date0).setDate(date0.getDate() + 1)) // 日期加 1 天
        GQuery({
            tblName: 'ly0d12appointment',
            operator: 'deleteMany',
            query: {
                user_cellphone: data.user_cellphone,
                date: {$gte: date0, $lt: date1},
                id_day: data.id_day
            }
        }).then(()=>{
            resolve({
                code: 0, message: '预约取消'
            })
        })
    })
}

// 提交预约
function submit (data) {
    // data.user_cellphone 当前用户信息：手机号码
    // data.user_name 当前用户信息：用户名称
    // data.id_seat
    // data.id_day
    // data.date

    return new Promise(function (resolve, reject) {
        let thisTime = new Date(),
            date0 = new Date(new Date(data.date).toLocaleDateString()),
            date1 = new Date(new Date(date0).setDate(date0.getDate() + 1)) // 日期加 1 天
        GQuery({
            tblName: 'ly0d12seat',
            operator: 'findOne',
            query: {_id: data.id_seat}
        }).then(result => {
            let objSeat = result.data
            GQuery({
                tblName: 'ly0d12room',
                operator: 'findOne',
                query: {_id: objSeat.id_room}
            }).then(result => {
                let objRoom = result.data
                GQuery({
                    tblName: 'ly0d12day',
                    operator: 'findOne',
                    query: {_id: data.id_day}
                }).then(result => {
                    let objDay = result.data
                    GQuery({
                        tblName: 'ly0d12appointment',
                        operator: 'deleteMany',
                        query: {
                            user_cellphone: data.user_cellphone,
                            date: {$gte: date0, $lt: date1},
                            id_day: data.id_day
                        }
                    }).then(()=>{
                        GQuery({
                            tblName: 'ly0d12appointment',
                            operator: 'insertOne',
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objSeat.id_dataunit,
                                user_cellphone: data.user_cellphone,
                                user_name: data.user_name,
                                id_place: objSeat.id_place,
                                place_name: objSeat.place_name,
                                id_position: objRoom.id_position,
                                position_text: objRoom.position_text,
                                id_room: objSeat.id_room,
                                room_name: objSeat.room_name,
                                id_seat: objSeat._id,
                                seat_row: objSeat.row,
                                seat_col: objSeat.col,
                                id_day: objDay._id,
                                day: objDay.day,
                                day_openfrom_hh: objDay.openfrom_hh,
                                day_openfrom_mm: objDay.openfrom_mm,
                                day_opento_hh: objDay.opento_hh,
                                day_opento_mm: objDay.opento_mm,
                                date: date0
                            }
                        }).then(() => {
                            resolve({code: 0, message: '预约成功'})
                        })
                    })
                })
            })
        })
    })
}

// 我的预约记录
function myAppointment (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.user_cellphone 当前用户信息：手机号码
    // data.date

    return new Promise(function (resolve, reject) {
        let date = new Date(new Date(data.Date ? data.date : new Date()).toLocaleDateString())
        GQuery({
            tblName: 'ly0d12appointment',
            operator: 'find',
            query: {
                id_dataunit: data.id_dataunit,
                cellphone: data.user_cellphone,
                date: {$gte: date}
            },
            sort: {
                date: 1,
                day_openfrom_hh: 1
            }
        }).then(result => {
            let arrAppointment = result.data
            resolve({arrAppointment})
        })
    })
}

export default {
    getPlace,
    getPosition,
    getRoom,
    getSeat,
    cancel,
    submit,
    myAppointment
}
