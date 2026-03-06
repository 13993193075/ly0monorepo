// 支付记录（交易端）

// 内部模块：查询修正
function queryRevise(data){
    let data0 = data ? data : {} , data1 = {};
    if(data0._id){
        data1._id = data0._id;
        return data1;
    }
    // 订单id
    data1.id_business = data0.id_business;

    return data1;
}

// 分页查询
async function find({data, dependencies}){
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.note
    // data.limit
    // data.page
    // data.sort.label
    // data.sort.order

    if(!data.query.id_business || data.query.id_business.length !== 24){
        return {data: [], count: 0}
    }
    const query = queryRevise(data.query) // 查询修正

    // 排序
    const sort = {}
    if(data.sort && data.sort.label && data.sort.order){
        if(data.sort.order === "ascending"){
            sort[data.sort.label] = 1
        }else if(data.sort.order === "descending"){
            sort[data.sort.label] = -1
        }else{
            sort[data.sort.label] = 1
        }
    }else{
        sort._id = -1
    }

    const resultData = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 获取页面初始化数据
async function getPgData({data, dependencies}){
    // data: null

    return {code: 0, message: "",
        data: {
            arrBusinessType: dependencies.ly0utils.ly0d2.busicode.businessType,
            arrProcess: dependencies.ly0utils.ly0d2.busicode.paymentProcess,
            arrMethod: dependencies.ly0utils.ly0d2.busicode.paymentMethod,
            arrStatus: dependencies.ly0utils.ly0d2.busicode.paymentStatus
        }
    }
}

export default {
    find,
    getPgData
}
