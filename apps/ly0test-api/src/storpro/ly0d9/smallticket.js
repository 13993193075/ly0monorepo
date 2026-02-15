import {GQuery} from '../../main/GQuery.js'
import {Feie} from 'packages/ly0libs/src/index.js'

// 获取当前业务单位小票机列表，以供前端人工选择要使用的打印机
function getPrinters(data) {
    // data.id_property

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: data.id_property}
        }).then(result => {
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9unit",
                operator: "findOne",
                query: {_id: objProperty.id_unit}
            }).then(result => {
                let objUnit = result.data
                GQuery({
                    tblName: "ly0d1d1printer",
                    operator: "find",
                    query: {id_dataunit: objUnit.id_dataunit, id_busiunit: objUnit._id},
                    populate: ["id_ukey"] // mongoose
                }).then(result => {
                    let arrPrinter = JSON.parse(JSON.stringify(result.data))
                    let arrPromise = []
                    for (let i = 0; i < arrPrinter.length; i++) {
                        arrPromise [i] = new Promise((resolve, reject) => {
                            // UKEY 解密
                            arrPrinter [i].id_ukey.ukeyText = ""
                            arrPrinter [i].id_ukey.ukeyText = arrPrinter [i].id_ukey.ukey
                            resolve()
                        })
                    }
                    Promise.all(arrPromise).then(() => {
                        resolve({arrPrinter})
                    })
                })
            })
        })
    })
}

// 飞鹅云打印
function feie(data) {
    let objUnit = data.objUnit,
        scene = data.scene,
        arrPrinter = data.arrPrinter,
        objProperty = data.objProperty,
        objBusiness = data.objBusiness,
        arrBGoods = data.arrBGoods ? data.arrBGoods : [],
        arrBGoods0 = data.arrBGoods0 ? data.arrBGoods0 : []

    return new Promise(function (resolve, reject) {
        if (!arrPrinter.length > 0) {
            return resolve({code: 1, message: "没有打印机"})
        }
        if (arrBGoods.length === 0 && arrBGoods0.length === 0) {
            return resolve({code: 1, message: "没有数据"})
        }
        let orderInfo = "<CB>" + "[ " + objUnit.name + " ] " + objProperty.number + "</CB><BR>"

        orderInfo = orderInfo + "<L>"
        orderInfo = orderInfo + "物业收费（代收） [" + scene + "]" + "<BR>"
        orderInfo = orderInfo + "收费单号：" + (objBusiness ? objBusiness._id : "") + "<BR>"

        orderInfo = orderInfo + "清账时间：" + (objBusiness && objBusiness.clear ? (objBusiness.time.getFullYear() + "年" + (objBusiness.time.getMonth() + 1) + "月" + objBusiness.time.getDate() + "日<BR>"
            + objBusiness.time.getHours() + "时" + objBusiness.time.getMinutes() + "分" + objBusiness.time.getSeconds() + "秒") : "") + "<BR>"
        let sum = 0, sum0 = 0

        if (arrBGoods.length > 0) {
            orderInfo = orderInfo + "<BR>---------- 服务类项目核收 ----------<BR>" // 分隔线宽度：20
            for (let i = 0; i < arrBGoods.length; i++) {
                orderInfo = orderInfo + arrBGoods [i].goods_name
                    + "  " + Math.round(arrBGoods [i].deal) / 100 + "<BR>"
                sum += arrBGoods [i].deal
            }
            orderInfo = orderInfo + "<BR>合计：" + Math.round(sum / 100) + "<BR>"
                + "--------------------<BR>"
            sum0 = sum0 + sum
        }
        if (arrBGoods0.length > 0) {
            sum = 0
            orderInfo = orderInfo + "<BR>---------- 资源类项目核收 ----------<BR>"
            for (let i = 0; i < arrBGoods0.length; i++) {
                orderInfo = orderInfo + arrBGoods0 [i].name
                    + "  " + Math.round(arrBGoods0 [i].deal) / 100 + "<BR>"
                sum += arrBGoods0 [i].deal
            }
            orderInfo = orderInfo + "<BR>合计：" + Math.round(sum / 100) + "<BR>"
                + "--------------------<BR>"
            sum0 = sum0 + sum;
        }
        orderInfo = orderInfo + "<BR>总计：" + Math.round(sum0 / 100) + "<BR>"
            + "--------------------<BR>"
        orderInfo = orderInfo + "</L>"

        // 打印
        let arrPromises = [];
        for (let i = 0; i < arrPrinter.length; i++) {
            arrPromises [i] = Feie.Open_printMsg({
                user: arrPrinter [i].id_ukey.user,
                ukey: arrPrinter [i].id_ukey.ukeyText,
                sn: arrPrinter [i].sn,
                remark: arrPrinter [i].remark,
                orderInfo
            })
        }

        Promise.all(arrPromises).then(function (arrP) {
            // 可能存在个别打印机失败
            for (let i = 0; i < arrP.length; i++) {
                if (arrP [i].code !== 0) {
                    return resolve(arrP [i])
                }
            }

            return resolve({code: 0, message: "打印成功"})
        })
    })
}

function print(data) {
    let scene = "前台总账", // 使用场景
        id_property = data.id_property,
        id_business = data.id_business ? data.id_business : null,
        arrPrinter = data.arrPrinter // 前端人工选择要使用的打印机

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d9property",
            operator: "findOne",
            query: {_id: id_property}
        }).then(result => {
            let objProperty = result.data
            GQuery({
                tblName: "ly0d9business",
                operator: "findOne",
                query: {_id: id_business}
            }).then(result => {
                let objBusiness = result.data
                GQuery({
                    tblName: "ly0d9unit",
                    operator: "findOne",
                    query: {_id: objProperty.id_unit}
                }).then(result => {
                    let objUnit = result.data
                    if (!objUnit.smallticket || objUnit.smallticket !== "e2") {
                        return resolve({code: 1, message: "小票机型号未设置或错误"})
                    }

                    GQuery({
                        tblName: "ly0d9b_goods",
                        operator: "find",
                        query: {id_business: objBusiness._id}
                    }).then(result => {
                        let arrBGoods = result.data;
                        GQuery({
                            tblName: "ly0d9b_goods0",
                            operator: "find",
                            query: {id_business: objBusiness._id}
                        }).then(result => {
                            let arrBGoods0 = result.data;
                            if (objUnit.smallticket === "e2") {
                                feie({
                                    objUnit,
                                    scene,
                                    arrPrinter,
                                    objProperty,
                                    objBusiness,
                                    arrBGoods, arrBGoods0
                                }).then(function (result) {
                                    if (result.code === 0) {
                                        return resolve({code: 0, message: "打印成功"})
                                    } else {
                                        return resolve({code: 1, message: p.message})
                                    }
                                })
                            }
                        })
                    })
                })
            })
        })
    })
}

export default {
    getPrinters,
    print
}
