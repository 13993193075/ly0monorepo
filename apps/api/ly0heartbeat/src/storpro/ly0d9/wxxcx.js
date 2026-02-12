import {GQuery} from '../../main/GQuery.js'
import utils from './utils/index.js'
import ly0d2wxzf from '../ly0d2/wxzf.js'
import ly0d11wxxcxSelfWithCellphone from '../ly0d11/wxxcx.self-with-cellphone.js'

// 获取自助缴费期限
function getSelfTerm(para){
    let code = para.code,
        self = para.self,
        dateFrom = para.dateFrom ? new Date(para.dateFrom) : new Date(),
        dateTo = null

    // 单位面积/天 || 户型/天
    if ( code === "AmountArea/Day" || code === "SizeType/Day" ) {
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setDate(dateTo.getDate() + self - 1))
        // 单位面积/月 || 户型/月
    }else if ( code === "AmountArea/Month" || code === "SizeType/Month" ) {
        dateFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 1)
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setMonth(dateTo.getMonth() + self))
        dateTo = new Date(dateTo.setDate(dateTo.getDate() - 1))
        // 单位面积/年 ||户型/年
    }else if ( code === "AmountArea/Year" || code === "SizeType/Year" ) {
        dateFrom = new Date(dateFrom.getFullYear(), 1, 1)
        dateTo = new Date(dateFrom)
        dateTo = new Date(dateTo.setFullYear(dateTo.getFullYear() + self))
        dateTo = new Date(dateTo.setDate(dateTo.getDate() - 1))
    }else {
        dateTo = null
    }

    return {dateTo}
}

// 服务类项目计费
function amountItemGoods (para) {
    let price = para.price, // 单价
        method = para.method, // 计费方法
        area = para.area, // 计费面积
        from = para.from, // 有效期起始日期
        to = para.to // 有效期截止日期

    let amount = 0,
        from0 = new Date(new Date(from).toDateString()),
        to0 = new Date(new Date(to).toDateString())

    if (to0 < from0) {
        return amount
    }
    if (method === 'AmountArea/Day') { //单位面积/天
        amount = price * area * ((to0 - from0) / (1000 * 60 * 60 * 24) + 1)
        return amount
    }

    if (method === 'AmountArea/Month') { //单位面积/月
        amount = price * area * ((to0.getFullYear() - from0.getFullYear()) * 12 + ((12 - from0.getMonth()) - (12 - to0.getMonth())) + 1)
        return amount
    }

    if (method === 'AmountArea/Year') { //单位面积/年
        amount = price * area * (to0.getFullYear() - from0.getFullYear() + 1)
        return amount
    }

    if (method === 'SizeType/Day') { //户型/天
        amount = price * ((to0 - from0) / (1000 * 60 * 60 * 24) + 1)
        return amount
    }

    if (method === 'SizeType/Month') { //户型/月
        amount = price * ((to0.getFullYear() - from0.getFullYear()) * 12 + ((12 - from0.getMonth()) - (12 - to0.getMonth())) + 1)
        return amount
    }

    if (method === 'SizeType/Year') { //户型/年
        amount = price * (to0.getFullYear() - from0.getFullYear() + 1)
        return amount
    }

    return amount
}

// 获取物业列表
function getProperty(data) {
    let id_dataunit = data.id_dataunit, // 当前用户信息：数据单元
        owner_cellphone = data.owner_cellphone; // 当前用户信息：手机号

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9property",
            operator: "find",
            query: {id_dataunit, owner_cellphone}
        }).then(result => {
            let arrProperty = result.data
            resolve({arrProperty})
        })
    })
}

// 获取收费记录
function getRecords(data) {
    let id_property = data.id_property // 当前物业 _id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {
                _id: id_property
            }
        }).then(res=>{
            let objProperty = res.data[0]
            GQuery({ // 
                tblName: "ly0d9unit",
                operator: "findOne",
                query: {
                    _id: objProperty.id_unit
                }
            }).then(res=>{
                let objUnit = res.data[0]
                GQuery({ // 
                    tblName: "ly0d9goods",
                    operator: "find",
                    query: {
                        id_unit: objProperty.id_unit
                    }
                }).then(res=>{
                    let arrGoods = JSON.parse(JSON.stringify(res.data))
                    GQuery({ // 
                        tblName: "ly0d9goods0",
                        operator: "find",
                        query: {
                            id_unit: objProperty.id_unit
                        }
                    }).then(res=>{
                        let arrGoods0 = JSON.parse(JSON.stringify(res.data))
                        GQuery({
                            tblName: "ly0d9b_goods",
                            operator: "find",
                            query: {
                                id_property,
                                clear: false
                            },
                            sort: {to: -1}
                        }).then(res => {
                            let arrBGoodsNoClear = res.data;
                            GQuery({
                                tblName: "ly0d9b_goods",
                                operator: "find",
                                query: {
                                    id_property,
                                    clear: true
                                },
                                sort: {to: -1}
                            }).then(res => {
                                let arrBGoodsCleared = res.data;
                                GQuery({
                                    tblName: "ly0d9b_goods0",
                                    operator: "find",
                                    query: {
                                        id_property,
                                        clear: false
                                    },
                                    sort: {time: -1}
                                }).then(res => {
                                    let arrBGoods0NoClear = res.data;
                                    GQuery({
                                        tblName: "ly0d9b_goods0",
                                        operator: "find",
                                        query: {
                                            id_property,
                                            clear: true
                                        },
                                        sort: {time: -1}
                                    }).then(res => {
                                        let arrBGoods0Cleared = res.data;
                                        GQuery({
                                            tblName: "ly0d9meterrecord",
                                            operator: "find",
                                            query: {
                                                id_property,
                                                clear: false
                                            },
                                            sort: {time: -1}
                                        }).then(res => {
                                            let arrMeterrecordNoClear = res.data;
                                            GQuery({
                                                tblName: "ly0d9meterrecord",
                                                operator: "find",
                                                query: {
                                                    id_property,
                                                    clear: true
                                                },
                                                sort: {time: -1}
                                            }).then(res => {
                                                let arrMeterrecordCleared = res.data;
                                                ly0d11wxxcxSelfWithCellphone.getPending({
                                                        id_dataunit: objProperty.id_dataunit,
                                                        cellphone: objProperty.owner_cellphone
                                                }).then(res=>{
                                                    let arrD11carwithinPending = res.arrPending // 获取长期车自助待缴费项目

                                                    // 以下全部代码，根据不同情况，可能发生新的待收费记录
                                                    let arrNewBGoods = [],
                                                        arrNewBGoods0 = [];
                                                    let thisTime = new Date();
                                                    // 服务类项目
                                                    arrGoods.forEach(i=>{
                                                        // 获取当前收费项目信息
                                                        let arrBGoodsNoClearI = arrBGoodsNoClear.filter(i0=>{
                                                            return i._id.toString() === i0.id_goods.toString()
                                                        })
                                                        let arrBGoodsClearedI = arrBGoodsCleared.filter(i0=>{
                                                            return i._id.toString() === i0.id_goods.toString()
                                                        })
                                                        // 已有待收费（未清账）记录，或者未设置自助缴费期限，不发生新的待收费记录
                                                        if(arrBGoodsNoClearI.length > 0 || !i.self || i.self === 0){
                                                            return
                                                        }
                                                        let last = arrBGoodsClearedI.length > 0 ? arrBGoodsClearedI[0] : {to: thisTime}
                                                        // 已有已收费（已清账）记录，并且最后一条记录的有效期超过当前日期，不发生新的待收费记录
                                                        if(last._id && new Date(new Date(last.to).toLocaleDateString()) > new Date(thisTime.toLocaleDateString())){
                                                            return
                                                        }

                                                        let from = new Date(last.to)
                                                        from = new Date(from.setDate(from.getDate() + 1))
                                                        let to = getSelfTerm({
                                                            code: i.method_code,
                                                            self: i.self,
                                                            from
                                                        }).dateTo
                                                        let amount = amountItemGoods({
                                                            price: i.price,
                                                            method: i.method_code,
                                                            area: objProperty.area,
                                                            from,
                                                            to
                                                        })
                                                        // 增加新的待收费记录
                                                        arrNewBGoods.push({
                                                            time_create: thisTime,
                                                            time_update: thisTime,
                                                            id_dataunit: objProperty.id_dataunit,
                                                            id_unit: objProperty.id_unit,
                                                            unit_name: objProperty.unit_name,
                                                            id_property: objProperty._id,
                                                            property_number: objProperty.number,
                                                            property_name: objProperty.name,
                                                            id_sizetype: objProperty.id_sizetype,
                                                            sizetype_name: objProperty.sizetype_name,
                                                            area: objProperty.area,
                                                            clear: false,
                                                            id_goods: i._id,
                                                            goods_name: i.name,
                                                            method_code: i.method_code,
                                                            method_text: i.method_text,
                                                            price: i.price,
                                                            from,
                                                            to,
                                                            amount,
                                                            time: thisTime,
                                                            deal: amount
                                                        })
                                                    })
                                                    // 资源类项目
                                                    arrGoods0.forEach(i=>{
                                                        // 获取当前收费项目信息
                                                        let arrBGoods0NoClearI = arrBGoods0NoClear.filter(i0=>{
                                                            return i._id.toString() === i0.id_goods.toString()
                                                        })
                                                        let arrBGoods0ClearedI = arrBGoods0Cleared.filter(i0=>{
                                                            return i._id.toString() === i0.id_goods.toString()
                                                        })
                                                        let arrMeterrecordNoClearI = arrMeterrecordNoClear.filter(i0=>{
                                                            return i.id_metername && i.id_metername.toString() === i0.id_metername.toString()
                                                        })
                                                        let arrMeterrecordClearedI = arrMeterrecordCleared.filter(i0=>{
                                                            return i.id_metername && i.id_metername.toString() === i0.id_metername.toString()
                                                        })
                                                        // 已有待收费（未清账）记录，或者未设置自助缴费限额，同时也非抄表项目，不发生新的待收费记录
                                                        if(arrBGoods0NoClearI.length > 0 || ((!i.self || i.self === 0) && !i.id_metername)){
                                                            return
                                                        }
                                                        let count = 0
                                                        if(!i.id_metername){ // 非抄表项目（已设置自助缴费限额）
                                                            let last = arrBGoods0ClearedI.length > 0 ? arrBGoods0ClearedI[0] : {time: thisTime}
                                                            // 已有已收费（已清账）记录，并且最后一条记录的计费日期加上预估使用天数超过当前日期，则不发生新的待收费记录
                                                            let lastTimeAdd = new Date(last.time)
                                                            lastTimeAdd = new Date(lastTimeAdd.setDate(lastTimeAdd.getDate() + i.self0))
                                                            if(last._id && new Date(lastTimeAdd.toLocaleDateString()) > new Date(thisTime.toLocaleDateString())){
                                                                return
                                                            }
                                                            count = i.self
                                                        }else{ // 抄表项目
                                                            if(arrMeterrecordNoClearI.length > 0 && arrMeterrecordClearedI.length > 0){
                                                                if(arrMeterrecordNoClearI[0].readout > arrMeterrecordClearedI[0].readout){
                                                                    count = arrMeterrecordNoClearI[0].readout - arrMeterrecordClearedI[0].readout
                                                                }else{count = 0}
                                                            }else if(arrMeterrecordNoClearI.length > 0){
                                                                count = arrMeterrecordNoClearI[0].readout
                                                            }else{count = 0}
                                                        }
                                                        // 增加新的待收费记录
                                                        arrNewBGoods0.push({
                                                            time_create: thisTime,
                                                            time_update: thisTime,
                                                            id_dataunit: objProperty.id_dataunit,
                                                            id_unit: objProperty.id_unit,
                                                            unit_name: objProperty.unit_name,
                                                            id_property: objProperty._id,
                                                            property_number: objProperty.number,
                                                            property_name: objProperty.name,
                                                            clear: false,
                                                            id_goods: i._id,
                                                            goods_name: i.name,
                                                            count,
                                                            price: i.price,
                                                            amount: count * i.price,
                                                            time: thisTime,
                                                            deal: count * i.price
                                                        })
                                                    })

                                                    resolve({
                                                        code: 0, message: "",
                                                        arrBGoodsNoClear: arrBGoodsNoClear.concat(arrNewBGoods),
                                                        arrBGoodsCleared,
                                                        arrBGoods0NoClear: arrBGoods0NoClear.concat(arrNewBGoods0),
                                                        arrBGoods0Cleared,
                                                        arrD11carwithinPending
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
        })
    })
}

// 查询支付流水，查询支付状态并同步
function getPayment(data) {
    let id_property = data.id_property // 当前物业 _id

    return new Promise(function (resolve, reject) {
        // 计费：当前物业最新账目信息
        utils.id_business.id_property({id_property}).then(function (result) {
            let objProperty = result.objProperty
            if (!objProperty.deal > 0) {
                return resolve({
                    code: 0, message: "暂无缴费项目，或核收金额为 0",
                    money_2: 0,
                    money_1: 0
                })
            }
            if (objProperty.money_1 > 0) {
                return resolve({
                    code: 1, message: "支付中",
                    money_2: objProperty.money_2,
                    money_1: objProperty.money_1
                })
            }
            if (objProperty.money_2 >= objProperty.deal) {
                return resolve({
                    code: 2, message: "已支付",
                    money_2: objProperty.money_2,
                    money_1: objProperty.money_1
                })
            }

            // objProperty.money_2 < objProperty.deal
            return resolve({
                code: 3, message: "未支付",
                money_2: objProperty.money_2,
                money_1: objProperty.money_1,
                objProperty
            })
        })
    })
}

// 缴费项目重置
function reset(para){
    let id_property = para.id_property,
        arrBGoodsNoClear = para.arrBGoodsNoClear,
        arrBGoods0NoClear = para.arrBGoods0NoClear,
        arrD11carwithinPending = para.arrD11carwithinPending

    return new Promise((resolve, reject)=>{
        GQuery({
            tblName: "ly0d9b_goods",
            operator: "deleteMany",
            query: {
                id_property,
                clear: false
            }
        }).then(()=>{
            GQuery({
                tblName: "ly0d9b_goods0",
                operator: "deleteMany",
                query: {
                    id_property,
                    clear: false
                }
            }).then(()=>{
                GQuery({
                    tblName: "ly0d9b_goods",
                    operator: "insertMany",
                    update: arrBGoodsNoClear
                }).then(()=>{
                    GQuery({
                        tblName: "ly0d9b_goods0",
                        operator: "insertMany",
                        update: arrBGoods0NoClear
                    }).then(()=>{
                        ly0d11wxxcxSelfWithCellphone.submit({
                                arrPending: arrD11carwithinPending
                        })
                        resolve()
                    })
                })
            })
        })
    })
}

// 微信支付.客户微信号付款
function wxzf1(data) {
    let js_code = data.js_code, // 客户临时票据
        id_property = data.id_property,
        arrBGoodsNoClear = data.arrBGoodsNoClear,
        arrBGoods0NoClear = data.arrBGoods0NoClear,
        id_dataunit = data.id_dataunit, // 当前用户信息：数据单元
        recorder_cellphone = data.recorder_cellphone, // 当前用户信息：手机号码
        recorder_name = data.recorder_name // 当前用户信息：用户名称

    return new Promise(function (resolve, reject) {
        // 缴费项目重置
        reset({
            id_property,
            arrBGoodsNoClear,
            arrBGoods0NoClear
        }).then(()=>{
            // 制单
            utils.id_business.business_new({id_property}).then(()=>{
                // 查询当前支付状态
                getPayment({id_property}).then(function (result) {
                    if (result.code !== 3) { // 3 : 未支付
                        return resolve({code: 1, message: result.message})
                    }

                    let money_2 = result.money_2, money_1 = result.money_1,
                        objUnit = result.objProperty.objUnit, objProperty = result.objProperty;

                    ly0d2wxzf.wxzf1({
                        id_dataunit,
                        recorder_cellphone,
                        recorder_name,
                        id_business: objProperty.id_business,
                        businesstype_code: "ly0d9business",
                        businesstype_text: "物业收费",
                        amount: objProperty.deal - money_2 - money_1,
                        method_code: "wxzf1",
                        method_text: "微信支付.客户微信号付款",
                        note: null,
                        appid: objUnit.wx_appid,
                        mchid: objUnit.wx_mchid,
                        js_code,
                        description: objProperty.owner_cellphone + " " + objProperty.owner_name + " 物业收费"
                    }).then(function (resultPay) {
                        resolve(resultPay)
                    })
                })
            })
        })
    })
}

// 微信支付：中止支付
function wxzfFail(data) {
    let id_property = data.id_property // 当前物业 _id

    return new Promise(function (resolve, reject) {
        // 查询当前支付状态
        getPayment({id_property}).then(function (result) {
            if (result.code !== 1) { // 1 : 支付中
                return resolve({code: 1, message: result.message})
            }
            let objProperty = result.objProperty

            ly0d2wxzf.setFail({
                id_business: objProperty.id_business
            }).then(function () {
                resolve({code: 0, message: "已取消支付"})
            })
        })
    })
}

// 获取抄表记录
function getMeterRecords(data){
    let id_property = data.id_property // 当前物业 _id

    return new Promise((resolve, reject)=>{
        GQuery({
            tblName: 'ly0d9property',
            operator: 'findOne',
            query: {_id: id_property}
        }).then(res => {
            let objProperty = res.data[0]
            GQuery({
                tblName: 'ly0d9metername',
                operator: 'find',
                query: {id_unit: objProperty.id_unit}
            }).then(res => {
                let arrMetername = res.data
                GQuery({
                    tblName: 'ly0d9meterrecord',
                    operator: 'find',
                    query: {
                        id_property,
                        clear: false
                    },
                    sort: {time: -1}
                }).then(res => {
                    let arrMeterrec = res.data,
                        arrMeterrecord = []
                    arrMetername.forEach(i=>{
                        let rec = arrMeterrec.find(i0=>{
                            return i0.id_metername.toString() === i._id.toString()
                        })
                        if(!rec){
                            let thisTime = new Date()
                            rec = {
                                time_create: thisTime,
                                time_update: thisTime,
                                id_dataunit: objProperty.id_dataunit,
                                id_unit: objProperty.id_unit,
                                unit_name: objProperty.unit_name,
                                id_property,
                                property_number: objProperty.number,
                                property_name: objProperty.name,
                                clear: false,
                                id_metername: i._id,
                                metername: i.metername,
                                time: thisTime,
                                readout: 0,
                                note: "",
                                recorder_cellphone: "",
                                recorder_name: ""
                            }
                        }
                        arrMeterrecord.push(rec)
                    })
                    resolve({
                        arrMeterrecord
                    })
                })
            })
        })
    })
}

export default {
    getProperty,
    getRecords,
    getPayment,
    wxzf1,
    wxzfFail,
    getMeterRecords
}