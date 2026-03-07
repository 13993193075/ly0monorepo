// 内部模块：查询修正
function queryRevise (data) {
    const data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business
    // 房型
    if (data0.id_goods) {
        data1.id_goods = data0.id_goods
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.id_goods
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page
    
    // 查询修正
    const query = queryRevise(data.query)
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

    const resData = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resData.data,
        total: resTotal.count
    }
}

// 内部模块：数据约束：新增
function dataRule (data) {
    // 不能提交
    if (!data.id_goods) {
        return {code: 1, message: '房型：必选项'}
    }
    if (!data.count) {
        return {code: 1, message: '数量：必填项'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.id_business
    // data.id_goods
    // data.count

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data.id_goods}
    })
    const objGoods = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'insertOne',
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: objBusiness._id,
            id_goods: objGoods._id,
            goods_name: objGoods.name,
            count: data.count
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.id_business
    // data.id_goods
    // data.count

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data.id_goods}
    })
    const objGoods = result.data
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: objBusiness._id,
            id_goods: objGoods._id,
            goods_name: objGoods.name,
            count: data.count
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

async function deleteOne ({data, dependencies}) {
    // data._id

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

async function getPgData ({data, dependencies}) {
    // data.id_business

    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: {id_hotel: objBusiness.id_hotel}
    })
    return {code: 0, message: "",
        data: {
            arrGoods: result.data
        }
    }
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData
}
