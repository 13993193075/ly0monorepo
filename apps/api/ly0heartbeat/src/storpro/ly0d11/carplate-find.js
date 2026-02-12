import {GQuery} from '../../main/GQuery.js'
import ImageSave from '../../main/image-save.js'

// 一类计价
function fee1(data) {
    let timein = new Date(data.timein),
        timeout = new Date(data.timeout),
        carwithin = !!data.carwithin, // 长期车
        expiryfrom = data.expiryfrom ? new Date(data.expiryfrom) : null,
        expiryto = data.expiryto ? new Date(data.expiryto) : null,

        fee1hour = data.fee1hour, // 小时单价
        fee1minimum = data.fee1minimum, // 最低收费
        fee1maximum = data.fee1maximum, // 最高收费
        fee1free = data.fee1free; // 免费时长（分钟）

    if (!timein || !timeout || !fee1hour) {
        return 0;
    }

    // 时间取整
    timein.setSeconds(0)
    timein.setMilliseconds(0)
    let timeinDate = new Date(timein)
    timeinDate.setHours(0)
    timeinDate.setMinutes(0)
    timeinDate.setSeconds(0)
    timeinDate.setMilliseconds(0)
    timeout.setSeconds(0)
    timeout.setMilliseconds(0)
    let timeoutDate = new Date(timeout)
    timeoutDate.setHours(0)
    timeoutDate.setMinutes(0)
    timeoutDate.setSeconds(0)
    timeoutDate.setMilliseconds(0)
    if (!expiryfrom) {
        expiryfrom = null
    } else {
        expiryfrom.setHours(0)
        expiryfrom.setMinutes(0)
        expiryfrom.setSeconds(0)
        expiryfrom.setMilliseconds(0)
    }
    if (!expiryto) {
        expiryto = null
    } else {
        expiryto.setHours(0)
        expiryto.setMinutes(0)
        expiryto.setSeconds(0)
        expiryto.setMilliseconds(0)
    }

    if (timein >= timeout) {
        return 0
    }

    // 免费时长（分钟）
    if ((timeout - timein) <= fee1free * 1000 * 60) {
        return 0
    }

    // 长期车
    if (carwithin) {
        if (!expiryfrom && !expiryto) {
            return 0
        }

        if (!expiryfrom && timeoutDate <= expiryto) {
            return 0
        }

        if (!expiryto && timeinDate >= expiryfrom) {
            return 0
        }

        if (timeinDate >= expiryfrom && timeoutDate <= expiryto) {
            return 0
        }

        if (timeinDate < expiryfrom && timeoutDate >= expiryfrom && timeoutDate <= expiryto) {
            timeout = new Date(expiryfrom) // 重置离开时间
            carwithin = false // 以下代码无需处理长期车
        }

        if (timeinDate >= expiryfrom && timeinDate <= expiryto && timeoutDate > expiryto) {
            timein = new Date(expiryto) // 重置进入时间
            carwithin = false // 以下代码无需处理长期车
        }

        if (timeinDate < expiryfrom && timeoutDate > expiryto) {
            let result0 = Math.round((expiryfrom - timein) / 1000 / 60 / 60) * fee1hour,
                result1 = Math.round((timeout - expiryto) / 1000 / 60 / 60) * fee1hour
            return result0 + result1
        }
    }

    let result = Math.round((timeout - timein) / 1000 / 60 / 60) * fee1hour
    result = fee1minimum > 0 ? Math.max(result, fee1minimum) : result
    result = fee1maximum > 0 ? Math.min(result, fee1maximum) : result

    return result
}

// 二类计价
function fee2(data) {
    let timein = new Date(data.timein),
        timeout = new Date(data.timeout),
        carwithin = !!data.carwithin, // 长期车
        expiryfrom = data.expiryfrom ? new Date(data.expiryfrom) : null,
        expiryto = data.expiryto ? new Date(data.expiryto) : null,

        fee2first = data.fee2first, // 第一小时单价
        fee2hour = data.fee2hour, // 小时单价
        fee2term = data.fee2term, // 计价时长
        fee2again = data.fee2again, // 重新计价时长
        fee2free_minutes = data.fee2free_minutes, // 免费时长（分钟）
        fee2free_slot_start_hours = data.fee2free_slot_start_hours, // 免费时段-起始时间-时
        fee2free_slot_start_minutes = data.fee2free_slot_start_minutes, // 免费时段-起始时间-分
        fee2free_slot_end_hours = data.fee2free_slot_end_hours, // 免费时段-结束时间-时
        fee2free_slot_end_minutes = data.fee2free_slot_end_minutes // 免费时段-结束时间-分

    if (!timein || !timeout || !fee2hour) {
        return 0
    }

    // 时间取整
    timein.setSeconds(0)
    timein.setMilliseconds(0)
    let timeinDate = new Date(timein)
    timeinDate.setHours(0)
    timeinDate.setMinutes(0)
    timeinDate.setSeconds(0)
    timeinDate.setMilliseconds(0)
    timeout.setSeconds(0)
    timeout.setMilliseconds(0)
    let timeoutDate = new Date(timeout)
    timeoutDate.setHours(0)
    timeoutDate.setMinutes(0)
    timeoutDate.setSeconds(0)
    timeoutDate.setMilliseconds(0)
    if (!expiryfrom) {
        expiryfrom = null
    } else {
        expiryfrom.setHours(0)
        expiryfrom.setMinutes(0)
        expiryfrom.setSeconds(0)
        expiryfrom.setMilliseconds(0)
    }
    if (!expiryto) {
        expiryto = null
    } else {
        expiryto.setHours(0)
        expiryto.setMinutes(0)
        expiryto.setSeconds(0)
        expiryto.setMilliseconds(0)
    }

    if (timein >= timeout) {
        return 0
    }

    // 免费时长（分钟）
    if ((timeout - timein) <= fee2free_minutes * 1000 * 60) {
        return 0
    }

    // 长期车
    if (carwithin) {
        // 免费
        if (!expiryfrom && !expiryto) {
            return 0
        }
        if (!expiryfrom && timeoutDate <= expiryto) {
            return 0
        }
        if (!expiryto && timeinDate >= expiryfrom) {
            return 0
        }
        if (timeinDate >= expiryfrom && timeoutDate <= expiryto) {
            return 0
        }

        // 
        if (timeinDate < expiryfrom && timeoutDate >= expiryfrom && timeoutDate <= expiryto) {
            timeout = new Date(expiryfrom) // 重置离开时间
            carwithin = false // 以下代码无需处理长期车
        }
        if (timeinDate >= expiryfrom && timeinDate <= expiryto && timeoutDate > expiryto) {
            timein = new Date(expiryto) // 重置进入时间
            carwithin = false // 以下代码无需处理长期车
        }
    }

    let startDate = new Date(timeinDate), // 当天起始时间
        endDate = new Date(timeinDate)
    endDate.setDate(endDate.getDate() + 1) // 次日起始时间
    let term = 0 // 计时累加（毫秒）

    // 按天累计
    while (startDate.getTime() <= timeoutDate.getTime()) {
        // 长期车
        if (carwithin) {
            if (expiryfrom.getTime() < endDate.getTime() && expiryto.getTime() >= startDate.getTime()) {
                // 循环迭代
                startDate.setDate(startDate.getDate() + 1) // 当天起始时间的日期+1
                endDate.setDate(endDate.getDate() + 1) // 次日起始时间的日期+1
                continue
            }
        }

        // 免费时段
        let free = false, // 是否存在免费时段
            // 第一免费时段
            freeFrom0,
            freeTo0,
            // 第二免费时段（存在跨天情况）
            freeFrom1,
            freeTo1
        if (
            isNaN(fee2free_slot_start_hours) ||
            fee2free_slot_start_hours < 0 ||
            fee2free_slot_start_hours > 23 ||
            isNaN(fee2free_slot_start_minutes) ||
            fee2free_slot_start_minutes < 0 ||
            fee2free_slot_start_minutes > 59 ||
            isNaN(fee2free_slot_end_hours) ||
            fee2free_slot_end_hours < 0 ||
            fee2free_slot_end_hours > 23 ||
            isNaN(fee2free_slot_end_minutes) ||
            fee2free_slot_end_minutes < 0 ||
            fee2free_slot_end_minutes > 59
        ) {
        } else {
            free = true
            // 取整
            fee2free_slot_start_hours = Math.floor(fee2free_slot_start_hours)
            fee2free_slot_start_minutes = Math.floor(fee2free_slot_start_minutes)
            fee2free_slot_end_hours = Math.floor(fee2free_slot_end_hours)
            fee2free_slot_end_minutes = Math.floor(fee2free_slot_end_minutes)

            // 不跨天
            if (
                fee2free_slot_start_hours < fee2free_slot_end_hours ||
                fee2free_slot_start_hours === fee2free_slot_end_hours && fee2free_slot_start_minutes <= fee2free_slot_end_minutes
            ) {
                // 重置第一免费时段
                freeFrom0 = new Date(startDate);
                freeFrom0.setHours(fee2free_slot_start_hours)
                freeFrom0.setMinutes(fee2free_slot_start_minutes)
                freeTo0 = new Date(startDate)
                freeTo0.setHours(fee2free_slot_end_hours)
                freeTo0.setMinutes(fee2free_slot_end_minutes)
                // 重置第二免费时段
                freeFrom1 = null
                freeTo1 = null
                // 跨天
            } else {
                // 重置第一免费时段
                freeFrom0 = new Date(startDate);
                freeTo0 = new Date(startDate)
                freeTo0.setHours(fee2free_slot_end_hours)
                freeTo0.setMinutes(fee2free_slot_end_minutes)
                // 重置第二免费时段
                freeFrom1 = new Date(startDate);
                freeFrom1.setHours(fee2free_slot_start_hours)
                freeFrom1.setMinutes(fee2free_slot_start_minutes)
                freeTo1 = new Date(startDate)
                freeTo1.setHours(23)
                freeTo1.setMinutes(59)
            }
        }

        // 计费时段
        let startTime = timein.getTime() > startDate.getTime() ? new Date(timein) : new Date(startDate),
            endTime = timeout.getTime() < endDate.getTime() ? new Date(timeout) : new Date(endDate);
        if (startTime.getTime() >= endTime.getTime()) {
            // 循环迭代
            startDate.setDate(startDate.getDate() + 1) // 当天起始时间的日期+1
            endDate.setDate(endDate.getDate() + 1) // 次日起始时间的日期+1
            continue
        }

        // 计时累加
        if (!free) {
            term = term + (endTime.getTime() - startTime.getTime())
        } else if (!freeFrom1 || !freeTo1) {
            if (startTime.getTime() < freeFrom0.getTime()) {
                if (endTime.getTime() < freeFrom0.getTime()) {
                    term = term + (endTime.getTime() - startTime.getTime())
                } else {
                    term = term + (freeFrom0.getTime() - startTime.getTime())
                }
            }
            if (endTime.getTime() > freeTo0.getTime()) {
                if (startTime.getTime() > freeTo0.getTime()) {
                    term = term + (endTime.getTime() - startTime.getTime())
                } else {
                    term = term + (endTime.getTime() - freeTo0.getTime())
                }
            }
        } else {
            term = term + (Math.min(endTime.getTime(), freeFrom1.getTime()) - Math.max(startTime.getTime(), freeTo0.getTime()))
        }

        // 循环迭代
        startDate.setDate(startDate.getDate() + 1) // 当天起始时间的日期+1
        endDate.setDate(endDate.getDate() + 1) // 次日起始时间的日期+1
    }

    // 小时数
    let hours = Math.ceil(term / 1000 / 60 / 60)
    // 计费周期
    let termCount = Math.floor(hours / fee2again)
    // 余数
    let remainder = (hours) % (fee2again);
    termCount = remainder > 0 ? termCount + 1 : termCount
    return (fee2first * termCount) +
        (fee2hour * (Math.min(hours, fee2term * termCount) - termCount))
}

function fee(data) {
    let timein = new Date(data.timein),
        timeout = new Date(data.timeout),
        carwithin = !!data.carwithin, // 长期车
        expiryfrom = data.expiryfrom ? new Date(data.expiryfrom) : null,
        expiryto = data.expiryto ? new Date(data.expiryto) : null,
        id_pricing = data.id_pricing ? data.id_pricing : null

    return new Promise((resolve, reject) => {
        if (!id_pricing) {
            return resolve(0)
        }
        GQuery({
            tblName: "ly0d11pricing",
            operator: "findOne",
            query: {_id: id_pricing}
        }).then(result => {
            let objPricing = result.data
            if (objPricing.type === "1") {
                resolve(fee1({
                    timein,
                    timeout,
                    carwithin,
                    expiryfrom,
                    expiryto,

                    fee1hour: objPricing.fee1hour,
                    fee1minimum: objPricing.fee1minimum,
                    fee1maximum: objPricing.fee1maximum,
                    fee1free: objPricing.fee1free
                }))
            } else if (objPricing.type === "2") {
                resolve(fee2({
                    timein,
                    timeout,
                    carwithin,
                    expiryfrom,
                    expiryto,

                    fee2first: objPricing.fee2first,
                    fee2hour: objPricing.fee2hour,
                    fee2term: objPricing.fee2term,
                    fee2again: objPricing.fee2again,
                    fee2free_minutes: objPricing.fee2free_minutes,
                    fee2free_slot_start_hours: objPricing.fee2free_slot_start_hours,
                    fee2free_slot_start_minutes: objPricing.fee2free_slot_start_minutes,
                    fee2free_slot_end_hours: objPricing.fee2free_slot_end_hours,
                    fee2free_slot_end_minutes: objPricing.fee2free_slot_end_minutes
                }))
            } else {
                resolve(0)
            }
        })
    })
}

// 车牌查询
function cf(data) {
    // data.id_carpark 必填项，停车场 _id
    // data.carplate 必填项，车牌
    // data.id_pricing 可选项，计费项目
    // data.timein 可选项，用于发生新的计费
    // data.timeout 可选项，用于发生新的计费

    return new Promise((resolve, reject) => {
        if (!data.id_carpark || !data.carplate) {
            return resolve({code: 1, message: "车牌查询失败"})
        }

        let thisTime = new Date()
        GQuery({
            tblName: "ly0d11carpassin",
            operator: "findOne",
            query: {
                id_carpark: data.id_carpark,
                carplate: data.carplate,
                $or: [
                    {timeout: {$exists: false}},
                    {timeout: {$eq: null}}
                ]
            }
        }).then(result => {
            let objCarpassin = result.data
            GQuery({
                tblName: "ly0d11carpark",
                operator: "findOne",
                query: {_id: data.id_carpark}
            }).then(result => {
                let objCarpark = result.data
                GQuery({
                    tblName: "ly0d11carwithin",
                    operator: "findOne",
                    query: {
                        id_carpark: objCarpark._id,
                        carplate: data.carplate
                    }
                }).then(result => {
                    let objCarwithin = result.data
                    if (!objCarpassin && !data.timein) {
                        return resolve({
                            code: 0, message: "车牌已查询，没有停车记录",
                            data: {
                                objCarpassin: null,
                                objCarpark,
                                objCarwithin,
                                timein: data.timein ? data.timein : thisTime,
                                timeout: null,
                                fee: 0
                            }
                        })
                    }

                    // 发生新的计费
                    let timein = data.timein ? data.timein : objCarpassin.timein,
                        timeout = data.timeout ? data.timeout : thisTime
                    fee({
                        timein,
                        timeout,
                        carwithin: !!objCarwithin,
                        expiryfrom: !!objCarwithin ? objCarwithin.expiryfrom : null,
                        expiryto: !!objCarwithin ? objCarwithin.expiryto : null,
                        id_pricing: data.id_pricing ? data.id_pricing
                            : (objCarwithin && objCarwithin.id_pricing ? objCarwithin.id_pricing
                                : (objCarpark.id_pricing ? objCarpark.id_pricing : null))
                    }).then(res => {
                        let fee = res
                        resolve({
                            code: 0, message: "车牌已查询，" + (objCarpassin ? "找到停车记录" : "没有停车记录"),
                            data: {
                                objCarpassin,
                                objCarpark,
                                objCarwithin,
                                timein,
                                timeout,
                                fee
                            }
                        })
                    })
                })
            })
        })
    })
}

// 进车登记
function passin(data) {
    // data.id_carpark
    // data.carplate
    // data.carwithin
    // data.expiryfrom
    // data.expiryto
    // data.timein
    // data.picturein

    return new Promise((resolve, reject) => {
        let thisTime = new Date();

        // 不能提交
        if (!data.id_carpark) {
            return resolve({code: 1, message: "没有停车场信息"})
        }
        if (!data.carplate) {
            return resolve({code: 1, message: "没有车牌号"})
        }
        if (!data.timein) {
            return resolve({code: 1, message: "没有进入时间"})
        }

        // 提交
        GQuery({
            tblName: "ly0d11carpark",
            operator: "findOne",
            query: {_id: data.id_carpark}
        }).then(result=>{
            let objCarpark = result.data
            GQuery({
                tblName: "ly0d11carpassin",
                operator: "updateOne",
                query: {
                    id_carpark: objCarpark._id,
                    carplate: data.carplate,
                    $or: [{timeout: {$exists: false}}, {timeout: {$eq: null}}]
                },
                update: {
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objCarpark.id_dataunit,
                    id_carpark: objCarpark._id,
                    carpark_name: objCarpark.name,
                    carplate: data.carplate,
                    carwithin: !!data.carwithin && data.carwithin !== "false",
                    expiryfrom: !!data.carwithin && data.carwithin !== "false" ? data.expiryfrom : null,
                    expiryto: !!data.carwithin && data.carwithin !== "false" ? data.expiryto : null,
                    timein: data.timein,
                    timeout: null,
                    price: 0,
                    fee: 0,
                    note: ""
                },
                upsert: true
            }).then(result => {
                let newId = result.dataNew._id;
                GQuery({tblName: "ly0d11carpassin",
                    operator: "findOne",
                    query: {_id: newId}
                }).then(result=>{
                    let oldData = result.data
                    ImageSave.imageUpdate({
                        dataunitId: objCarpark.id_dataunit,
                        tblName: "ly0d11carpassin",
                        fieldName: "picturein",
                        dataId: newId,
                        srcNew: data.picturein,
                        srcOld: oldData.picturein
                    }).then(function (picturein) {
                        GQuery({
                            tblName: "ly0d11carpassin",
                            operator: "updateOne",
                            query: {_id: newId},
                            update: {picturein: picturein ? picturein : ""}
                        }).then(() => {
                            resolve({code: 0, message: "提交成功",
                                _id: newId
                            })
                        })
                    })
                })
            })
        })
    })
}

// 出车登记
function passout(data) {
    // data.id_carpark
    // data.carplate
    // data.id_carpassin
    // data.carwithin
    // data.expiryfrom
    // data.expiryto
    // data.timein
    // data.timeout
    // data.price
    // data.fee
    // data.note
    // data.picturein
    // data.pictureout

    return new Promise((resolve, reject) => {
        let thisTime = new Date();

        // 不能提交
        if (!data.id_carpark) {
            return resolve({code: 1, message: "没有停车场信息"});
        }
        if (!data.id_carpassin) {
            return resolve({code: 1, message: "没有进入记录"});
        }
        if (!data.carplate) {
            return resolve({code: 1, message: "没有车牌号"});
        }
        if (!data.timein) {
            return resolve({code: 1, message: "没有进入时间"});
        }
        if (!data.timeout) {
            return resolve({code: 1, message: "没有离开时间"});
        }

        // 提交
        GQuery({
            tblName: "ly0d11carpark",
            operator: "findOne",
            query: {_id: data.id_carpark}
        }).then(result=>{
            let objCarpark = result.data
            GQuery({
                tblName: "ly0d11carpassin",
                operator: "updateOne",
                query: {_id: data.id_carpassin},
                update: {
                    time_update: thisTime,
                    id_dataunit: objCarpark.id_dataunit,
                    dataunit_name: objCarpark.dataunit_name,
                    id_carpark: objCarpark._id,
                    carpark_name: objCarpark.name,

                    carplate: data.carplate,
                    carwithin: !!data.carwithin && data.carwithin !== "false",
                    expiryfrom: data.carwithin && data.carwithin !== "false" ? data.expiryfrom : null,
                    expiryto: data.carwithin && data.carwithin !== "false" ? data.expiryto : null,
                    timein: data.timein,
                    timeout: data.timeout,
                    price: data.price ? data.price : 0,
                    fee: data.fee ? data.fee : 0,
                    note: data.note ? data.note : ""
                },
                upsert: false
            }).then(() => {
                GQuery({
                    tblName: "ly0d11carpassin",
                    operator: "findOne",
                    query: {_id: data.id_carpassin}
                }).then(result=>{
                    let oldData = result.data
                    ImageSave.imageUpdate({
                        dataunitId: objCarpark.id_dataunit,
                        tblName: "ly0d11carpassin",
                        fieldName: "picturein",
                        dataId: data.id_carpassin,
                        srcNew: data.picturein,
                        srcOld: oldData.picturein
                    }).then(function (picturein) {
                        ImageSave.imageAppend({
                            dataunitId: objCarpark.id_dataunit,
                            tblName: "ly0d11carpassin",
                            fieldName: "pictureout",
                            dataId: data.id_carpassin,
                            src: data.pictureout
                        }).then(function (pictureout) {
                            GQuery({
                                tblName: "ly0d11carpassin",
                                operator: "updateOne",
                                query: {_id: data.id_carpassin},
                                update: {
                                    picturein: picturein ? picturein : "",
                                    pictureout: picturein ? pictureout : ""
                                }
                            }).then(() => {
                                resolve({code: 0, message: "提交成功",
                                    _id: data.id_carpassin
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
    fee1,
    fee2,
    fee,
    cf,
    passin,
    passout
}
