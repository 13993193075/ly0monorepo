import {GQuery} from '../../main/GQuery.js'

// 月报表
function month (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.timeFrom
    // data.timeTo

    return new Promise(function (resolve, reject) {
        let id_dataunit = data.id_dataunit,
            time = new Date(),
            timeFrom,
            timeTo,
            title
        if (data.timeFrom && data.timeTo) { // 时间段
            timeFrom = new Date(new Date(new Date(new Date(new Date(data.timeFrom).setMilliseconds(0)).setSeconds(0)).setMinutes(0)).setHours(0))
            timeTo = new Date(new Date(new Date(new Date(new Date(data.timeTo).setMilliseconds(999)).setSeconds(59)).setMinutes(59)).setHours(23))
            title = '物业收入 '
                + timeFrom.getFullYear() + '-' + (timeFrom.getMonth() + 1) + '-' + timeFrom.getDate()
                + ' 至 ' + timeTo.getFullYear() + '-' + (timeTo.getMonth() + 1) + '-' + timeTo.getDate()
                + ' 期间报表'
        } else { // 月报表
            if (data.timeFrom) {
                time = new Date(data.timeFrom)
            } else if (data.timeTo) {
                time = new Date(data.timeTo)
            } else {
                time = new Date()
            }
            timeFrom = new Date(new Date(new Date(new Date(new Date(time.setMilliseconds(0)).setSeconds(0)).setMinutes(0)).setHours(0)).setDate(1)) // 月初
            timeTo = new Date(new Date(new Date(new Date(time.setMilliseconds(999)).setSeconds(59)).setMinutes(59)).setHours(23))
            let m = time.getMonth()
            if (m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11) {
                timeTo = new Date(timeTo.setDate(31)) // 大月末：31
            } else if (m === 3 || m === 5 || m === 8 || m === 10) {
                timeTo = new Date(timeTo.setDate(30)) // 小月末：30
            } else { // m === 1
                timeTo = new Date(timeTo.setDate(31)).setDate(0) // 二月末
            }
            title = '物业收入 '
                + time.getFullYear() + '-' + (time.getMonth() + 1)
                + ' 月报表'
        }

        GQuery({
            tblName: 'ly0d9unit',
            operator: 'find',
            query: {id_dataunit}
        }).then(result => {
            let unit = result.data // 物业单位
            GQuery({
                tblName: 'ly0d9goods',
                operator: 'find',
                query: {id_dataunit}
            }).then(result => {
                let goods = result.data // 服务类项目
                GQuery({
                    tblName: 'ly0d9goods0',
                    operator: 'find',
                    query: {id_dataunit}
                }).then(result => {
                    let goods0 = result.data // 资源类项目
                    GQuery({
                        tblName: 'ly0d9b_goods',
                        operator: 'find',
                        query: {
                            id_dataunit,
                            clear: true,
                            deal: {$gt: 0},
                            time: {
                                $gte: timeFrom,
                                $lte: timeTo
                            }
                        },
                        field: ['id_unit', 'id_goods', 'from', 'to', 'time', 'deal']
                    }).then(result => {
                        let bGoods = result.data // 服务类项目收入数据
                        GQuery({
                            tblName: 'ly0d9b_goods0',
                            operator: 'find',
                            query: {
                                id_dataunit,
                                clear: true,
                                deal: {$gt: 0},
                                time: {
                                    $gte: timeFrom,
                                    $lte: timeTo
                                }
                            },
                            field: ['id_unit', 'id_goods', 'time', 'deal']
                        }).then(result => {
                            let bGoods0 = result.data // 资源类项目收入数据

                            GQuery({
                                tblName: 'ly0d0dataunit',
                                operator: 'findOne',
                                query: {_id: id_dataunit}
                            }).then(result => {
                                let objDataUnit = result.data
                                resolve({
                                    code: 0,
                                    message: '获取数据成功',
                                    data: {
                                        title: '[ ' + objDataUnit.name + ' ] ' + title,
                                        unit,
                                        goods,
                                        goods0,
                                        bGoods,
                                        bGoods0
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

export default {
    month
}
