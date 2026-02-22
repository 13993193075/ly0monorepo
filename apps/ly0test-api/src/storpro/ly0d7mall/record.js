import {GQuery} from '../../main/GQuery.js'

// 获取商城用户采购记录
async function getBusiness(data){
    // data.id_guest
    // data.limit
    // data.page

    const query = {
        id_guest: data.id_guest,
        status_code: "2"
    }
    const resultData = await GQuery({
        tblName: "ly0d7business",
        operator: "find",
        query,
        sort: {time: -1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7business",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: "",
        dataBusiness: {
            data: resultData.data,
            count: resultTotal.count
        }
    }
}

// 获取某一采购记录的商品清单
async function getBGoods({id_business}){
    const result= await GQuery({
        tblName: "ly0d7b_goods",
        operator: "find",
        query: {id_business: id_business}
    })
    return {code: 0, message: "",
        dataBGoods: result.data
    }
}

export default {
    getBusiness,
    getBGoods
}