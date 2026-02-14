import {GQuery} from '../../main/GQuery.js'
import {Feie} from 'packages/ly0libs'

// 获取当前业务单位小票机列表，以供前端人工选择要使用的打印机
function getPrinters(data) {
    let id_business = data.id_business;

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d7business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d7shop",
                operator: "findOne",
                query: {_id: objBusiness.id_shop}
            }).then(result => {
                let objShop = result.data
                GQuery({
                    tblName: "ly0d1d1printer",
                    operator: "find",
                    query: {id_dataunit: objShop.id_dataunit, id_busiunit: objShop._id},
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
                        resolve({
                            arrPrinter
                        })
                    })
                })
            })
        })
    })
}

// 飞鹅云打印
function feie(data) {
    let objShop = data.objShop,
        scene = data.scene,
        arrPrinter = data.arrPrinter,
        id_business = data.id_business,
        arrBGoods = data.arrBGoods ? data.arrBGoods : []

    return new Promise(function (resolve, reject) {
        if (!arrPrinter.length > 0) {
            return resolve({code: 1, message: "没有打印机"})
        }
        if (arrBGoods.length === 0) {
            return resolve({code: 1, message: "没有数据"})
        }

        let thisTime = new Date();
        let orderInfo = "<CB>" + objShop.name + "</CB><BR>"

        orderInfo = orderInfo + "<L>";
        orderInfo = orderInfo + "交易明细 [" + scene + "]<BR>"
        orderInfo = orderInfo + "交易单号：" + (id_business ? id_business : "") + "<BR>"

        orderInfo = orderInfo + "时间：" + thisTime.getFullYear() + "年" + (thisTime.getMonth() + 1) + "月" + thisTime.getDate() + "日<BR>"
            + thisTime.getHours() + "时" + thisTime.getMinutes() + "分" + thisTime.getSeconds() + "秒<BR>"
        let sum = 0, sum0 = 0

        if (arrBGoods.length > 0) {
            orderInfo = orderInfo + "<BR>---------- 商品 ----------<BR>" // 分隔线宽度：20
            for (let i = 0; i < arrBGoods.length; i++) {
                orderInfo = orderInfo + arrBGoods [i].name
                    + "  " + Math.round(arrBGoods [i].price) / 100
                    + " * " + arrBGoods [i].count
                    + " = " + Math.round(arrBGoods [i].price * arrBGoods [i].count) / 100
                    + "<BR>"
                sum += arrBGoods [i].price * arrBGoods [i].count
            }
            sum0 = sum0 + sum
        }

        orderInfo = orderInfo + "<BR>合计：" + Math.round(sum0 / 100) + "<BR>"
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
    let scene = "前台总账", // 使用场景,
        id_business = data.id_business, // 订单 ID
        arrPrinter = data.arrPrinter // 前端人工选择要使用的打印机

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d7business",
            operator: "findOne",
            query: {_id: id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: "ly0d7shop",
                operator: "findOne",
                query: {_id: objBusiness.id_shop}
            }).then(result => {
                let objShop = result.data
                if (!objShop.smallticket || objShop.smallticket !== "e2") {
                    return resolve({code: 1, message: "小票机型号未设置或错误"});
                }

                GQuery({
                    tblName: "ly0d7b_goods",
                    operator: "find",
                    query: {id_business: objBusiness._id}
                }).then(result => {
                    let arrBGoods = result.data;
                    if (objShop.smallticket === "e2") {
                        feie({
                            objShop,
                            scene,
                            arrPrinter,
                            id_business,
                            arrBGoods
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
}

export default {
    getPrinters,
    print
}
