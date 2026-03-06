// 内部模块：查询修正
function queryRevise (data) {
    const data0 = data || {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.code2) { // 模糊匹配
        data1.code2 = {'$regex': `.*${data0.code2}.*`}
    }
    if (data0.text2) { // 模糊匹配
        data1.text2 = {'$regex': `.*${data0.text2}.*`}
    }

    if (data0.code4) { // 模糊匹配
        data1.code4 = {'$regex': `.*${data0.code4}.*`}
    }
    if (data0.text4) { // 模糊匹配
        data1.text4 = {'$regex': `.*${data0.text4}.*`}
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query.code2
    // data.query.text2
    // data.query.code4
    // data.query.text4
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
        tblName: 'ly0d3gbt2260code4',
        operator: 'find',
        query,
        sort: {code4: 1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
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
    // 不能提交
    if (!data.code2) {
        return {code: 1, message: '省级编码：必填项'}
    }
    if (!data.text2) {
        return {code: 1, message: '省级区划名称：必填项'}
    }
    if (!data.code4) {
        return {code: 1, message: '市级编码：必填项'}
    }
    if (!data.text4) {
        return {code: 1, message: '市级区划名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.code2
    // data.text2
    // data.code4
    // data.text4

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'insertOne',
        update: {
            code2: data.code2,
            text2: data.text2,
            code4: data.code4,
            text4: data.text4
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.code2
    // data.text2
    // data.code4
    // data.text4

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            code2: data.code2,
            text2: data.text2,
            code4: data.code4,
            text4: data.text4
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    // data._id

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 级联
async function code2({data, dependencies}) {
    // data.code2

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'find',
        query: {code2: data.code2}
    })
    return {code: 0, message: '',
        arrCode4: result.data
    }
}

// 代码导入
async function loadAll({dependencies}) {
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'deleteMany',
        query: {}
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d3gbt2260code4',
        operator: 'insertMany',
        update: dependencies.ly0utils.GBT.gbt2260code4
    })
    return {code: 0, message: '导入成功'}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    code2,
    loadAll
}
