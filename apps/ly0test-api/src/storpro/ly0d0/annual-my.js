// 分页查询
async function find({data, dependencies}){
    // data.query
    // data.query.id_dataunit
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = {
        id_dataunit: data.query.id_dataunit,
        status_code: {$ne: "2"}
    }

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
        tblName: 'ly0d0annual',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0annual',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 设置支付状态
async function setStatus({data, dependencies}){
    // data._id
    // data.status_code

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0annual',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            status_code: data.status_code,
            status_text: dependencies.ly0utils.ly0d2.busicode.paymentStatus.find(i=>{
                return i.code === data.status_code
            }).text
        }
    })
    return {code: 0, message: '',
        dataNew: result.dataNew,
        dataOld: result.dataOld
    }
}

export default {
    find,
    setStatus
}
