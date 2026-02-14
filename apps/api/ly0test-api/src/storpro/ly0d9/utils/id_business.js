import {GQuery} from '../../../main/GQuery.js'

// 服务类项目计费
function amount(data) {
    // data.price 单价
    // data.method 计费方法
    // data.area 计费面积
    // data.from 有效期起
    // data.to 有效期止

    let amount = 0,
        from0 = new Date(new Date(data.from).toDateString()),
        to0 = new Date(new Date(data.to).toDateString())

    if (to0 < from0) {
        return amount
    }

    if (data.method === 'AmountArea/Day') { // 单位面积/天
        amount = data.price * data.area * ((to0 - from0) / (1000 * 60 * 60 * 24) + 1)
        return amount
    }

    if (data.method === 'AmountArea/Month') { // 单位面积/月
        amount = data.price * data.area * ((to0.getFullYear() - from0.getFullYear()) * 12 + ((12 - from0.getMonth()) - (12 - to0.getMonth())) + 1)
        return amount
    }

    if (data.method === 'AmountArea/Year') { // 单位面积/年
        amount = data.price * data.area * (to0.getFullYear() - from0.getFullYear() + 1)
        return amount
    }

    if (data.method === 'SizeType/Day') { // 户型/天
        amount = data.price * ((to0 - from0) / (1000 * 60 * 60 * 24) + 1)
        return amount
    }

    if (data.method === 'SizeType/Month') { // 户型/月
        amount = data.price * ((to0.getFullYear() - from0.getFullYear()) * 12 + ((12 - from0.getMonth()) - (12 - to0.getMonth())) + 1)
        return amount
    }

    if (data.method === 'SizeType/Year') { //户型/年
        amount = data.price * (to0.getFullYear() - from0.getFullYear() + 1)
        return amount
    }

    return amount
}

// 获取 id_business 对应的物业（已制单）账目信息
function id_business (data) {
    // data.id_business

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9business',
            operator: 'findOne',
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({ // 获取当前物业详细信息
                tblName: 'ly0d9property',
                operator: 'findOne',
                query: {_id: objBusiness.id_property}
            }).then(result => {
                let objProperty = result.data
                GQuery({
                    tblName: 'ly0d9unit',
                    operator: 'findOne',
                    query: {_id: objProperty.id_unit}
                }).then(result => {
                    let objUnit = result.data
                    GQuery({ // 服务类项目
                        tblName: 'ly0d9b_goods',
                        operator: 'find',
                        query: {id_business: data.id_business}
                    }).then(result => {
                        let arrBGoods = result.data
                        GQuery({ // 资源类项目
                            tblName: 'ly0d9b_goods0',
                            operator: 'find',
                            query: {id_business: data.id_business}
                        }).then(result => {
                            let arrBGoods0 = result.data
                            GQuery({ // 抄表记录
                                tblName: 'ly0d9meterrecord',
                                operator: 'find',
                                query: {id_business: data.id_business}
                            }).then(result => {
                                let arrMeterrecord = result.data
                                GQuery({ // 备忘
                                    tblName: 'ly0d9memo',
                                    operator: 'find',
                                    query: {id_business: data.id_business}
                                }).then(result => {
                                    let arrMemo = result.data

                                    let amount_goods = [0].concat(arrBGoods).reduce((total, i)=>{
                                        return total + Number(i.amount)
                                    })
                                    let amount_goods0 = [0].concat(arrBGoods0).reduce((total, i)=>{
                                        return total + Number(i.amount)
                                    })
                                    let amount = amount_goods + amount_goods0
                                    let deal_goods = [0].concat(arrBGoods).reduce((total, i)=>{
                                        return total + Number(i.deal)
                                    })
                                    let deal_goods0 = [0].concat(arrBGoods0).reduce((total, i)=>{
                                        return total + Number(i.deal)
                                    })
                                    let deal = deal_goods + deal_goods0

                                    GQuery({
                                        tblName: "ly0d9business",
                                        operator: "updateOne",
                                        query: {_id: data.id_business},
                                        update: {
                                            amount,
                                            amount_goods,
                                            amount_goods0,
                                            deal_goods,
                                            deal_goods0,
                                            deal
                                        }
                                    }).then(result=>{
                                        resolve({code: 0, message: '',
                                            data: {
                                                objProperty,
                                                objUnit,
                                                arrBGoods,
                                                arrBGoods0,
                                                arrMeterrecord,
                                                arrMemo,
                                                objBusiness: result.dataNew[0]
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取物业未制单账目信息
function id_property (data) {
    // data.id_property

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9property',
            operator: 'findOne',
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = JSON.parse(JSON.stringify(result.data))
            // 已制单
            if(!!objProperty.id_business){
                id_business({id_business: objProperty.id_business}).then(result=>{
                    resolve({code: 0, message: "",
                        data: result.data
                    })
                })
                return
            }

            let q = {
                id_property: data.id_property,
                $or: [
                    {id_business: {$exists: false}},
                    {id_business: null}
                ]
            }
            // 未制单
            GQuery({
                tblName: 'ly0d9unit',
                operator: 'findOne',
                query: {_id: objProperty.id_unit}
            }).then(result => {
                let objUnit = result.data
                GQuery({ // 获取当前物业未清账备忘信息
                    tblName: 'ly0d9b_goods',
                    operator: 'find',
                    query: q
                }).then(result => {
                    let arrBGoods = result.data
                    GQuery({ // 获取当前物业未清账备忘信息
                        tblName: 'ly0d9b_goods0',
                        operator: 'find',
                        query: q
                    }).then(result => {
                        let arrBGoods0 = result.data
                        GQuery({ // 获取当前物业未清账目索引（任何情况下，当前物业的未清账目索引如果有的话，只会有 1 条）
                            tblName: 'ly0d9meterrecord',
                            operator: 'find',
                            query: q,
                            sort: {time: -1}
                        }).then(result => {
                            let arrMeterrecord = result.data
                            GQuery({ // 获取当前物业未清账备忘信息
                                tblName: 'ly0d9memo',
                                operator: 'find',
                                query: q
                            }).then(result => {
                                let arrMemo = result.data

                                let amount_goods = [0].concat(arrBGoods).reduce((total, i)=>{
                                    return total + Number(i.amount)
                                })
                                let amount_goods0 = [0].concat(arrBGoods0).reduce((total, i)=>{
                                    return total + Number(i.amount)
                                })
                                let amount = amount_goods + amount_goods0
                                let deal_goods = [0].concat(arrBGoods).reduce((total, i)=>{
                                    return total + Number(i.deal)
                                })
                                let deal_goods0 = [0].concat(arrBGoods0).reduce((total, i)=>{
                                    return total + Number(i.deal)
                                })
                                let deal = deal_goods + deal_goods0
                                return resolve({code: 0, message: '',
                                    data: {
                                        objProperty,
                                        objUnit,
                                        arrBGoods,
                                        arrBGoods0,
                                        arrMeterrecord,
                                        arrMemo,
                                        objBusiness: {
                                            _id: null,
                                            amount_goods,
                                            amount_goods0,
                                            amount,
                                            deal_goods,
                                            deal_goods0,
                                            deal
                                        }
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

// 制单
function business_new(data){
    // data.id_property
    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9property',
            operator: 'findOne',
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = result.data
            if(!!objProperty.id_business){
                return resolve({code: 0, message: "已制单"})
            }

            let q = {
                id_property: data.id_property,
                $or: [
                    {id_business: {$exists: false}},
                    {id_business: null}
                ]
            }
            GQuery({
                tblName: 'ly0d9b_goods',
                operator: 'find',
                query: q
            }).then(result => {
                let arrBGoods = result.data
                GQuery({
                    tblName: 'ly0d9b_goods0',
                    operator: 'find',
                    query: q
                }).then(result => {
                    let arrBGoods0 = result.data
                    if(arrBGoods.length === 0 && arrBGoods0.length === 0){
                        return resolve({code: 0, message: "未发生新的收费项目"})
                    }

                    let thisTime = new Date()
                    id_property({id_property: objProperty._id}).then(result=>{
                        GQuery({
                            tblName: 'ly0d9business',
                            operator: 'insertOne',
                            update: {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objProperty.id_dataunit,
                                dataunit_name: objProperty.dataunit_name,
                                id_unit: objProperty.id_unit,
                                unit_name: objProperty.unit_name,
                                id_property: objProperty._id,
                                property_number: objProperty.number,
                                property_name: objProperty.name ? data.name : "",
                                time: thisTime,
                                amount_goods: result.data.objBusiness.amount_goods,
                                amount_goods0: result.data.objBusiness.amount_goods0,
                                amount: result.data.objBusiness.amount,
                                deal_goods: result.data.objBusiness.deal_goods,
                                deal_goods0: result.data.objBusiness.deal_goods0,
                                deal: result.data.objBusiness.deal
                            }
                        }).then(result => {
                            let objBusiness = result.data
                            GQuery({
                                tblName: 'ly0d9property',
                                operator: 'updateOne',
                                query: {_id: data.id_property},
                                update: {id_business: objBusiness._id}
                            }).then(() => {
                                GQuery({
                                    tblName: "ly0d9b_goods",
                                    operator: "updateMany",
                                    query: q,
                                    update: {id_business: objBusiness._id}
                                }).then(()=>{
                                    GQuery({
                                        tblName: "ly0d9b_goods0",
                                        operator: "updateMany",
                                        query: q,
                                        update: {id_business: objBusiness._id}
                                    }).then(()=>{
                                        GQuery({
                                            tblName: "ly0d9meterrecord",
                                            operator: "updateMany",
                                            query: q,
                                            update: {id_business: objBusiness._id}
                                        }).then(()=>{
                                            GQuery({
                                                tblName: "ly0d9memo",
                                                operator: "updateMany",
                                                query: q,
                                                update: {id_business: objBusiness._id}
                                            }).then(()=>{
                                                resolve({code: 0, message: "已制单"})
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 取消制单
function business_cancel(data){
    // data.id_property
    return new Promise((resolve, reject) => {
        GQuery({
            tblName: 'ly0d9property',
            operator: 'findOne',
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = result.data
            if(!objProperty.id_business){
                return resolve({code: 0, message: "未制单"})
            }

            let q = {
                id_property: data.id_property,
                id_business: objProperty.id_business
            }
            GQuery({
                tblName: 'ly0d9property',
                operator: 'updateOne',
                query: {_id: data.id_property},
                update: {id_business: null}
            }).then(() => {
                GQuery({
                    tblName: "ly0d9b_goods",
                    operator: "updateMany",
                    query: q,
                    update: {id_business: null}
                }).then(()=>{
                    GQuery({
                        tblName: "ly0d9b_goods0",
                        operator: "updateMany",
                        query: q,
                        update: {id_business: null}
                    }).then(()=>{
                        GQuery({
                            tblName: "ly0d9meterrecord",
                            operator: "updateMany",
                            query: q,
                            update: {id_business: null}
                        }).then(()=>{
                            GQuery({
                                tblName: "ly0d9memo",
                                operator: "updateMany",
                                query: q,
                                update: {id_business: null}
                            }).then(()=>{
                                GQuery({
                                    tblName: 'ly0d9business',
                                    operator: 'deleteOne',
                                    query: {_id: objProperty.id_business}
                                }).then(() => {
                                    resolve({code: 0, message: "已取消制单"})
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
    amount,
    id_business,
    id_property,
    business_new,
    business_cancel
}
