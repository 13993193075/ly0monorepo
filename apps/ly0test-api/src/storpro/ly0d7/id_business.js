// 计费
async function id_business({data, dependencies}) {
    // data.id_business

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: objBusiness.id_shop}
    })
    const objShop = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7decode",
        operator: "find",
        query: {id_shop: objBusiness.id_shop}
    })
    const arrDecode = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7b_goods",
        operator: "find",
        query: {id_business: data.id_business}
    })
    const arrBGoods = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7memo",
        operator: "find",
        query: {id_business: data.id_business}
    })
    const arrMemo = result.data

    // 交易合计
    let count = 0,
        count_b_goods = 0,
        amount = 0,
        amount_b_goods = 0
    if (arrBGoods.length > 0) {
        count_b_goods = count_b_goods + [0].concat(arrBGoods).reduce(function (total, i) {
            return total + Number(i.count)
        })
        amount_b_goods = amount_b_goods + [0].concat(arrBGoods).reduce(function (total, i) {
            return total + (Number(i.price) * Number(i.count))
        })
    }
    count = count_b_goods
    amount = amount_b_goods

    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7business",
        operator: 'updateOne',
        query: {_id: data.id_business},
        update: {
            count,
            amount,
            deal: objBusiness.deal > 0 ? objBusiness.deal : amount
        }
    })
    const objBusinessNew = result.dataNew
    return {code: 0, message: "已计费",
        business: {
            objBusiness: objBusinessNew,
            objShop,
            arrDecode,
            arrBGoods,
            arrMemo
        }
    }
}

// 修改订单基本信息
async function setBaseInfo({data, dependencies}) {
    // data._id
    // data.time
    // data.client_cellphone
    // data.client_name

    //  提交
    const thisTime = new Date()
    await dependencies.GQuery.GQuery({
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            time: data.time,
            client_cellphone: data.client_cellphone || null,
            client_name: data.client_name || null
        }
    })
    return {code: 0, message: "修改订单基本信息成功"}
}

// 修改核收金额
async function setDeal({data, dependencies}) {
    // data._id
    // data.deal
    // data.dealnote

    // 提交
    const thisTime = new Date()
    await dependencies.GQuery.GQuery({
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            deal: data.deal || 0,
            dealnote: data.dealnote || '',
        }
    })
    return {code: 0, message: "修改核收金额成功"}
}

// 交易中
async function trading({data, dependencies}) {
    // data.id_business

    await dependencies.GQuery.GQuery({ // 订单状态重置：入住
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "1",
            status_text: dependencies.ly0utils.ly0d7.busicode.businessStatus.find(i=>{
                return i.code === "1"
            }).text
        }
    })
    return {code: 0, message: "订单状态：交易中"}
}

// 交易完成
async function traded({data, dependencies}) {
    // data.id_business
    
    const result = await dependencies.GQuery.GQuery({ // 查询支付状态
        tblName: "ly0d2payment",
        operator: "findOne",
        query: {
            id_business: data.id_business,
            status_code: "1"
        }
    })
    if (result.data) {
        return {code: 1, message: "未完成支付，不能完成交易"}
    }

    await dependencies.GQuery.GQuery({ // 订单状态重置：离店
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "2",
            status_text: dependencies.ly0utils.ly0d7.busicode.businessStatus.find(i=>{
                return i.code === "2"
            }).text
        }
    })
    return {code: 0, message: "订单状态：交易完成"}
}

export default {
    id_business,
    setBaseInfo,
    setDeal,
    trading,
    traded
}
