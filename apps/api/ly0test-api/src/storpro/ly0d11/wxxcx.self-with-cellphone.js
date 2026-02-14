import {GQuery} from '../../main/GQuery.js'

// 获取长期车自助缴费期限
function getSelfTerm(para){
    let code = para.code,
        self = para.self,
        dateFrom = para.dateFrom ? new Date(para.dateFrom) : new Date(),
        dateTo = null;

    //天
    if ( code === "Day" ) {
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setDate(dateTo.getDate() + self - 1))
        //月
    }else if ( code === "Month" ) {
        dateFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 1)
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setMonth(dateTo.getMonth() + self))
        dateTo = new Date(dateTo.setDate(dateTo.getDate() - 1))
        //年
    }else if ( code === "Year" ) {
        dateFrom = new Date(dateFrom.getFullYear(), 1, 1)
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setFullYear(dateTo.getFullYear() + self))
        dateTo = new Date(dateTo.setDate(dateTo.getDate() - 1))
    }else {
        dateTo = null
    }
    return {dateTo}
}

// 长期车计费
function amountItemCarwithin (para) {
    let code = para.code,
        price = para.price, //单价
        from = para.from, //有效期起始日期
        to = para.to; //有效期截止日期

    let amount = 0,
        from0 = new Date(new Date(from).toDateString()),
        to0 = new Date(new Date(to).toDateString())

    if (to0 < from0) {
        return amount
    }
    if (code === 'Day') { //天
        amount = price * ((to0 - from0) / (1000 * 60 * 60 * 24) + 1)
        return amount
    }

    if (code === 'Month') { //月
        amount = price * ((to0.getFullYear() - from0.getFullYear()) * 12 + ((12 - from0.getMonth()) - (12 - to0.getMonth())) + 1)
        return amount
    }

    if (code === 'Year') { //年
        amount = price * (to0.getFullYear() - from0.getFullYear() + 1)
        return amount
    }

    return amount
}

// 通过手机号获取待缴费信息
function getPending(data) {
    // data.id_dataunit
    // data.cellphone

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d11carwithin',
            operator: 'find',
            query: {
                id_dataunit: data.id_dataunit,
                cellphone: data.cellphone
            },
            populate: ["id_carpark"]
        }).then(res => {
            let arrCarwithin = res.data // 长期车
            GQuery({
                tblName: 'ly0d11self',
                operator: 'find',
                query: {
                    id_dataunit: data.id_dataunit
                }
            }).then(res => {
                let arrSelf = res.data // 长期车自助缴费项目

                let arrPending = []; // 生成新的待缴费记录
                arrCarwithin.forEach(i => { // 遍历长期车
                    let id_self = i.id_self ? i.id_self : (i.id_carpark.id_self ? i.id_carpark.id_self : null)
                    let objSelf = id_self ? arrSelf.find(i0 => {
                        return i0._id.toString() === id_self.toString()
                    }) : null

                    // 生成新的缴费期
                    let expiryfrom = new Date(),
                        expiryto = new Date(),
                        fee = 0;
                    if (i.expiryto) {
                        expiryfrom = new Date(i.expiryto)
                        expiryfrom.setDate(expiryfrom.getDate() + 1)
                    }

                    if (objSelf) {
                        expiryto = getSelfTerm({
                            code: objSelf.term,
                            self: objSelf.self,
                            dateFrom: expiryfrom
                        }).dateTo

                        // 金额
                        fee = amountItemCarwithin({
                            code: objSelf.term,
                            price: objSelf.price,
                            from: expiryfrom,
                            to: expiryto
                        })
                    } else {
                        expiryto = new Date(expiryfrom)
                        fee = 0
                    }

                    arrPending.push({
                        id_dataunit: i.id_dataunit,
                        id_carpark: JSON.parse(JSON.stringify(i.id_carpark))._id,
                        carpark_name: JSON.parse(JSON.stringify(i.id_carpark)).name,
                        parking: i.parking ? i.parking : "",
                        carplate: i.carplate,
                        expiryfrom,
                        expiryto,
                        fee
                    })
                })
                resolve({arrPending})
            })
        })
    })
}

// 缴费
function submit(data) {
    // data.arrPending

    return new Promise((resolve, reject) => {
        let arrPending = [],
            thisTime = new Date()
        data.arrPending.forEach(i => {
            arrPending.push(Object.assign(i, {
                time_create: thisTime,
                time_update: thisTime
            }))
        })

        GQuery({
            tblName: 'ly0d11carwithin_rec',
            operator: 'insertMany',
            update: arrPending
        }).then(() => {
            resolve()
        })
    })
}

export default {
    getPending,
    submit
}