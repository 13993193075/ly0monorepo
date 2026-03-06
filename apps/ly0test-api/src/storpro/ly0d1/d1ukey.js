// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.note) { // 备注 模糊匹配
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    return data1
}

// 分页查询
async function find({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.note
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
    //  排序
    const sort = {}
    if (data.sort && data.sort.label && data.sort.order) {
        if (data.sort.order === 'ascending') {
            sort[data.sort.label] = 1
        } else if (data.sort.order === 'descending') {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort._id = -1
    }

    const resultData = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

function dataRule(data) { // 内部模块：数据约束
    // 不能提交
    if (!data.user) {
        return {code: 1, message: "USER：必填项"}
    }
    if (!data.ukey) {
        return {code: 1, message: "UKEY：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
async function insertOne({data, dependencies}) {
    // data.ukey
    // data.user
    // data.note

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "insertOne",
        update: {
            ukey: data.ukey,
            user: data.user,
            note: data.note ? data.note : ''
        }
    })
    return {code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne({data, dependencies}) {
    // data._id
    // data.ukey
    // data.user
    // data.note

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }

    await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            ukey: data.ukey,
            user: data.user,
            note: data.note ? data.note : ''
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({data, dependencies}) {
    // data._id

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1printer",
        operator: "findOne",
        query: {id_ukey: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d1d1printer"}
    }

    await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "deleteOne",
        query: {_id: data._id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne
}
