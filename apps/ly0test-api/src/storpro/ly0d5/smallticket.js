import {GQuery} from '../../main/GQuery.js'
import {Feie} from 'packages/ly0libs/src/index.js'

// 获取当前业务单位小票机列表，以供前端人工选择要使用的打印机
function getPrinters(data) {
    let id_business = data.id_business;

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5restaurant",
                operator: "findOne",
                query: {_id: objBusiness.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                GQuery({
                    tblName: "ly0d1d1printer",
                    operator: "find",
                    query: {id_dataunit: objRestaurant.id_dataunit, id_busiunit: objRestaurant._id},
                    populate: ["id_ukey"] // mongoose
                }).then(result => {
                    let arrPrinter = JSON.parse(JSON.stringify(result.data))
                    let arrPromise = []
                    for (let i = 0; i < arrPrinter.length; i++) {
                        arrPromise [i] = new Promise((resolve0, reject) => {
                            // UKEY 解密
                            arrPrinter [i].id_ukey.ukeyText = ""
                            arrPrinter [i].id_ukey.ukeyText = arrPrinter [i].id_ukey.ukey
                            resolve0()
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
    let objRestaurant = data.objRestaurant,
        sceneNote = data.sceneNote,
        arrPrinter = data.arrPrinter,
        id_business = data.id_business,
        arrBTable = data.arrBTable,
        arrBGoods = data.arrBGoods ? data.arrBGoods : [],
        arrBGoods0 = data.arrBGoods0 ? data.arrBGoods0 : [],
        arrBGoods1 = data.arrBGoods1 ? data.arrBGoods1 : []

    return new Promise(function (resolve, reject) {
        if (!arrPrinter.length > 0) {
            return resolve({code: 1, message: "没有打印机"})
        }
        if (arrBGoods.length === 0 && arrBGoods0.length === 0 && arrBGoods1.length === 0) {
            return resolve({code: 1, message: "没有数据"})
        }

        let thisTime = new Date()
        let orderInfo = "<CB>" + objRestaurant.name + "</CB><BR>"

        orderInfo = orderInfo + "<L>"
        orderInfo = orderInfo + "餐费明细 [" + sceneNote + "]<BR>"
        orderInfo = orderInfo + "订单号：" + (id_business ? id_business : "") + "<BR>"

        let tableno = ""
        if ((arrBTable.length > 0) && arrBTable [0].tableno) {
            tableno = arrBTable [0].tableno
        }
        orderInfo = orderInfo + "餐位：" + tableno + "<BR>"
            + "时间：" + thisTime.getFullYear() + "年" + (thisTime.getMonth() + 1) + "月" + thisTime.getDate() + "日<BR>"
            + thisTime.getHours() + "时" + thisTime.getMinutes() + "分" + thisTime.getSeconds() + "秒<BR>"
        let sum = 0, sum0 = 0

        if (arrBGoods.length > 0) {
            orderInfo = orderInfo + "<BR>---------- 菜品 ----------<BR>" // 分隔线宽度：20
            for (let i = 0; i < arrBGoods.length; i++) {
                orderInfo = orderInfo + arrBGoods [i].name
                    + "  " + Math.round(arrBGoods [i].price) / 100
                    + " * " + arrBGoods [i].count
                    + " = " + Math.round(arrBGoods [i].price * arrBGoods [i].count) / 100
                    + "<BR>"
                sum += arrBGoods [i].price * arrBGoods [i].count
            }
            orderInfo = orderInfo + "<BR>菜品合计：" + Math.round(sum / 100) + "<BR>"
                + "--------------------<BR>"
            sum0 = sum0 + sum
        }

        if (arrBGoods0.length > 0) {
            sum = 0
            orderInfo = orderInfo + "<BR>---------- 配售 ----------<BR>"
            for (let i = 0; i < arrBGoods0.length; i++) {
                orderInfo = orderInfo + arrBGoods0 [i].name
                    + "  " + Math.round(arrBGoods0 [i].price) / 100
                    + " * " + arrBGoods0 [i].count
                    + " = " + Math.round(arrBGoods0 [i].price * arrBGoods0 [i].count) / 100
                    + "<BR>"
                sum += arrBGoods0 [i].price * arrBGoods0 [i].count
            }
            orderInfo = orderInfo + "<BR>配售合计：" + Math.round(sum / 100) + "<BR>"
                + "--------------------<BR>"
            sum0 = sum0 + sum
        }

        if (arrBGoods1.length > 0) {
            sum = 0
            orderInfo = orderInfo + "<BR>---------- 损赔 ----------<BR>"
            for (let i = 0; i < arrBGoods1.length; i++) {
                orderInfo = orderInfo + arrBGoods1 [i].name
                    + "  " + Math.round(arrBGoods1 [i].price) / 100
                    + " * " + arrBGoods1 [i].count
                    + " = " + Math.round(arrBGoods1 [i].price * arrBGoods1 [i].count) / 100
                    + "<BR>"
                sum += arrBGoods1 [i].price * arrBGoods1 [i].count
            }
            orderInfo = orderInfo + "<BR>损赔合计：" + Math.round(sum / 100) + "<BR>"
                + "--------------------<BR>"
            sum0 = sum0 + sum
        }

        orderInfo = orderInfo + "<BR>总计：" + Math.round(sum0 / 100) + "<BR>"
            + "--------------------<BR>"
        orderInfo = orderInfo + "</L>"

        // 打印
        let arrPromises = []
        for (let i = 0; i < arrPrinter.length; i++) {
            arrPromises [i] = Feie.Open_printMsg({
                user: arrPrinter [i].id_ukey.user,
                ukey: arrPrinter [i].id_ukey.ukeyText,
                sn: arrPrinter [i].sn,
                note: arrPrinter [i].note,
                orderInfo
            })
        }

        Promise.all(arrPromises).then(function (result) {
            // 可能存在个别打印机失败
            for (let i = 0; i < result.length; i++) {
                if (result [i].code !== 0) {
                    return resolve(result [i])
                }
            }

            return resolve({code: 0, message: "打印成功"})
        })
    })
}

function print(data) {
    let scene = "ly0d5smallticket.print", // 使用场景
        sceneNote = "前台总账",
        id_business = data.id_business, // 订单 ID
        arrPrinter = data.arrPrinter // 前端人工选择要使用的打印机

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5restaurant",
                operator: "findOne",
                query: {_id: objBusiness.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                if (!objRestaurant.smallticket || objRestaurant.smallticket !== "e2") {
                    return resolve({code: 1, message: "小票机型号未设置或错误"})
                }

                GQuery({
                    tblName: "ly0d5b_table",
                    operator: "find",
                    query: {id_business: objBusiness._id}
                }).then(result => {
                    let arrBTable = result.data
                    GQuery({
                        tblName: "ly0d5b_goods",
                        operator: "find",
                        query: {id_business: objBusiness._id}
                    }).then(result => {
                        let arrBGoods = result.data
                        GQuery({
                            tblName: "ly0d5b_goods0",
                            operator: "find",
                            query: {id_business: objBusiness._id}
                        }).then(result => {
                            let arrBGoods0 = result.data
                            GQuery({
                                tblName: "ly0d5b_goods1",
                                operator: "find",
                                query: {id_business: objBusiness._id}
                            }).then(result => {
                                let arrBGoods1 = result.data

                                if (objRestaurant.smallticket === "e2") {
                                    feie({
                                        objRestaurant,
                                        sceneNote,
                                        arrPrinter,
                                        id_business,
                                        arrBTable,
                                        arrBGoods,
                                        arrBGoods0,
                                        arrBGoods1
                                    }).then(function (result) {
                                        if (result.code === 0) {
                                            return resolve({code: 0, message: "打印成功"})
                                        } else {
                                            return resolve({code: 1, message: result.message})
                                        }
                                    })
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

function print0(data) {
    let scene = "ly0d5smallticket.print0", // 使用场景
        sceneNote = "小程序下单",
        id_business = data.id_business, // 订单 ID
        arrBGoods = data.arrBGoods, // 菜品
        arrBGoods0 = data.arrBGoods0 // 配售

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d5business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d5restaurant",
                operator: "findOne",
                query: {_id: objBusiness.id_restaurant}
            }).then(result => {
                let objRestaurant = result.data
                if (!objRestaurant.smallticket || objRestaurant.smallticket !== "e2") {
                    return resolve({code: 1, message: "小票机型号未设置或错误"})
                }

                GQuery({
                    tblName: "ly0d1d1printer",
                    operator: "find",
                    query: {
                        id_dataunit: objRestaurant.id_dataunit,
                        id_busiunit: objRestaurant._id,
                        scene
                    },
                    populate: ["id_ukey"] // mongoose
                }).then(result => {
                    let arrPrinter = JSON.parse(JSON.stringify(result.data));
                    let arrPromise = [];
                    for (let i = 0; i < arrPrinter.length; i++) {
                        arrPromise [i] = new Promise((resolve0, reject) => {
                            // UKEY 解密
                            arrPrinter [i].id_ukey.ukeyText = ""
                            arrPrinter [i].id_ukey.ukeyText = arrPrinter [i].id_ukey.ukey
                            resolve0()
                        })
                    }
                    Promise.all(arrPromise).then(() => {
                        GQuery({
                            tblName: "ly0d5b_table",
                            operator: "find",
                            query: {id_business: objBusiness._id}
                        }).then(result => {
                            let arrBTable = result.data
                            if (objRestaurant.smallticket === "e2") {
                                feie({
                                    objRestaurant,
                                    sceneNote,
                                    arrPrinter,
                                    id_business,
                                    arrBTable,
                                    arrBGoods, arrBGoods0
                                }).then(function (result) {
                                    if (result.code === 0) {
                                        return resolve({code: 0, message: "打印成功"})
                                    } else {
                                        return resolve({code: 1, message: result.message})
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
    print,
    print0
}
