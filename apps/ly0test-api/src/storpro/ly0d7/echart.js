// 电子图表

// 时段应收统计
async function echart({data, dependencies}) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    const q = {id_dataunit: data.id_dataunit}
    const q0 = JSON.parse(JSON.stringify(q))
    if (data.id_shop) {
        q._id = data.id_shop
        q0.id_shop = data.id_shop
    }

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7shop",
        operator: "find",
        query: q
    })
    const dataResponse = {shop: result.data}
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7business",
        operator: "find",
        query: q0,
        showFields: ["id_shop", "time", "amount", "deal"]
    })
    dataResponse.business = result.data
    return {code: 0, message: "",
        data: dataResponse // 数据：shop, business
    }
}

export default {
    echart
}
