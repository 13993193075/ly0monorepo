import {GQuery} from '../../main/GQuery.js'
import {ly0d4 as beanLy0d4, unclassified as blindboxesUnclass} from '@yoooloo42/blindboxes'

// 月报表
async function month (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.timeFrom
    // data.timeTo

    const id_dataunit = data.id_dataunit
    let time = new Date(),
        timeFrom,
        timeTo,
        title
    if (data.timeFrom && data.timeTo) { // 报表类型：期间报表
        timeFrom = new Date(
            new Date(
                new Date(
                    new Date(
                        new Date(
                            data.timeFrom
                        ).setMilliseconds(0)
                    ).setSeconds(0)
                ).setMinutes(0)
            ).setHours(0)
        )
        timeTo = new Date(
            new Date(
                new Date(
                    new Date(
                        new Date(
                            data.timeTo
                        ).setMilliseconds(999)
                    ).setSeconds(59)
                ).setMinutes(59)
            ).setHours(23)
        )
        title = '旅店客房应收 '
            + timeFrom.getFullYear() + '-' + (timeFrom.getMonth() + 1) + '-' + timeFrom.getDate()
            + ' 至 ' + timeTo.getFullYear() + '-' + (timeTo.getMonth() + 1) + '-' + timeTo.getDate()
            + ' 期间报表'
    } else { // 报表类型：月报表
        if (data.timeFrom) {
            time = new Date(data.timeFrom)
        } else if (data.timeTo) {
            time = new Date(data.timeTo)
        } else {
            time = new Date()
        }
        timeFrom = new Date(
            new Date(
                new Date(
                    new Date(
                        new Date(
                            time.setMilliseconds(0)
                        ).setSeconds(0)
                    ).setMinutes(0)
                ).setHours(0)
            ).setDate(1)
        ) // 月初
        timeTo = new Date(
            new Date(
                new Date(
                    new Date(
                        time.setMilliseconds(999)
                    ).setSeconds(59)
                ).setMinutes(59)
            ).setHours(23)
        )
        let m = time.getMonth()
        if (m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m === 9 || m === 11) {
            timeTo = new Date(timeTo.setDate(31)) // 大月末：31
        } else if (m === 3 || m === 5 || m === 8 || m === 10) {
            timeTo = new Date(timeTo.setDate(30)) // 小月末：30
        } else { //m === 1
            timeTo = new Date(timeTo.setDate(31)).setDate(0) // 二月末
        }
        title = '客房收入 '
            + time.getFullYear() + '-' + (time.getMonth() + 1)
            + ' 月报表'
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: {id_dataunit},
    })
    const arrHotel = JSON.parse(JSON.stringify(result.data)) // 旅店
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: {id_dataunit},
    })
    const arrGoods = JSON.parse(JSON.stringify(result.data)) // 房型
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'find',
        query: {
            id_dataunit,
            checkin: {
                $gte: new Date(timeFrom),
                $lte: new Date(timeTo)
            }
        },
    })
    const arrBusiness = result.data // 订单
    const arrBusinessId = []
    arrBusiness.forEach(i=>{
        arrBusinessId.push(i._id)
    })
    result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'find',
        query: {
            id_business: {
                $in: arrBusinessId
            }
        },
    })
    const arrBGoods = JSON.parse(JSON.stringify(result.data)) // 房费
    arrBGoods.forEach(iBGoods=>{
        const objHotel = arrHotel.find(iHotel=>{
            return iHotel._id === iBGoods.id_hotel
        })
        // 逐条计费
        iBGoods.amount = beanLy0d4.calculator.calculator({
            price: iBGoods.price,
            checkin: iBGoods.checkin,
            checkout: iBGoods.checkout,
            method_code: iBGoods.method_code,
            timepoint_hours: objHotel.checkout_hours ? objHotel.checkout_hours : 14,
            timepoint_minutes: objHotel.checkout_minutes ? objHotel.checkout_minutes : 0,
            timepoint0_hours: objHotel.checkout0_hours || objHotel.checkout0_hours === 0 ? objHotel.checkout0_hours : 18,
            timepoint0_minutes: objHotel.checkout0_minutes || objHotel.checkout0_minutes === 0 ? objHotel.checkout0_minutes : 0
        })
    })

    arrHotel.forEach(iHotel=>{
        iHotel.count_amount = [0].concat(arrBGoods.filter(iBGoods=>{
            return iBGoods.id_hotel === iHotel._id
        })).reduce((total, i)=>{
            return total + i.amount
        })
        iHotel.count_deal = [0].concat(arrBusiness.filter(iBusiness=>{
            return iBusiness.id_hotel === iHotel._id
        })).reduce((total, i)=>{
            return total + i.deal
        })
    })
    arrGoods.forEach(iGoods=>{
        iGoods.count_amount = [0].concat(arrBGoods.filter(iBGoods=>{
            return iBGoods.id_goods === iGoods._id
        })).reduce((total, i)=>{
            return total + i.amount
        })
    })

    return {code: 0, message: '获取数据成功',
        data: {
            title,
            hotel: arrHotel,
            goods: arrGoods
        }
    }
}

export default {
    month
}
