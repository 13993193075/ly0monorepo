// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return (data1)
    }

    // 数据单元名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

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
        tblName: 'ly0d0dataunit',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule (data) {
    if (!data.name) {
        return {code: 1, message: '名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.name
    // data.systemoff

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }
    // 数据提交
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'insertOne',
        update: {
            name: data.name,
            systemoff: data.systemoff === 'true' || data.systemoff
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.name
    // data.systemoff

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            name: data.name,
            systemoff: data.systemoff === 'true' || data.systemoff
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies, storproRun}) {
    // data._id

    const result = await storproRun({
        storproName: 'ly0d0.dataunit-clear.emptyTest',
        data: {id_dataunit: data._id}
    })
    if (result.code === 1) {
        return {code: 1, message: '非空的数据单元，不能删除'}
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 数据单元关闭
async function systemOff ({data, dependencies}) {
    // data._id
    // data.systemoff

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {systemoff: data.systemoff === 'true' || data.systemoff}
    })
    return {code: 0, message: '已设置数据单元关闭状态',
        dataNew: result.dataNew,
        dataOld: result.dataOld
    }
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    systemOff
}
