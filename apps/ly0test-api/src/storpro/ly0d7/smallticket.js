import {GQuery} from '../../main/GQuery.js'
import {Feie} from '@yoooloo42/ly0nodejs'

// 获取当前业务单位小票机列表，以供前端人工选择要使用的打印机
async function getPrinters({id_business}) {
    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: objBusiness.id_shop}
    })
    const objShop = result.data
    result = await GQuery({
        tblName: "ly0d1d1printer",
        operator: "find",
        query: {id_dataunit: objShop.id_dataunit, id_busiunit: objShop._id},
        populate: ["id_ukey"] // mongoose
    })
    const arrPrinter = JSON.parse(JSON.stringify(result.data));

    const promises = arrPrinter.map(async (item) => {
        // 模拟未来的异步解密操作
        item.id_ukey.ukeyText = item.id_ukey.ukey;
        return item;
    });

    await Promise.all(promises);
    return { arrPrinter };
}

// 飞鹅云打印
async function feie(data) {
    const objShop = data.objShop,
        scene = data.scene,
        arrPrinter = data.arrPrinter,
        id_business = data.id_business,
        arrBGoods = data.arrBGoods ? data.arrBGoods : []

    if (!arrPrinter.length > 0) {
        return {code: 1, message: "没有打印机"}
    }
    if (arrBGoods.length === 0) {
        return {code: 1, message: "没有数据"}
    }

    const thisTime = new Date();
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

    // 使用 map 触发所有打印请求
    const arrPromises = arrPrinter.map(printer =>
        Feie.Open_printMsg({
            user: printer.id_ukey.user,
            ukey: printer.id_ukey.ukeyText,
            sn: printer.sn,
            remark: printer.remark,
            orderInfo
        })
    );
    // 等待所有结果返回
    const results = await Promise.all(arrPromises);
    // 查找第一个非零状态（报错）的结果
    const errorResult = results.find(res => res.code !== 0);
    if (errorResult) {
        return errorResult; // 返回第一个失败的结果
    }

    return { code: 0, message: "打印成功" };
}

async function print(data) {
    let scene = "前台总账", // 使用场景,
        id_business = data.id_business, // 订单 ID
        arrPrinter = data.arrPrinter // 前端人工选择要使用的打印机

    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: objBusiness.id_shop}
    })
    const objShop = result.data
    if (!objShop.smallticket || objShop.smallticket !== "e2") {
        return {code: 1, message: "小票机型号未设置或错误"}
    }

    result = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "find",
        query: {id_business: objBusiness._id}
    })
    const arrBGoods = result.data;

    // 小票机型号：
    if (objShop.smallticket === "e2") {
        result = await feie({
            objShop,
            scene,
            arrPrinter,
            id_business,
            arrBGoods
        })
        if (result.code === 0) {
            return {code: 0, message: "打印成功"}
        } else {
            return {code: 1, message: result.message}
        }
    }
    return {code: 1, message: '未预置小票机型号'}
}

export default {
    getPrinters,
    print
}
