import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    if (data0.name) { // 商品分类名称 模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
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
        sort['_id'] = -1
    }

    const resultData = await GQuery({
        tblName: 'ly0d7group',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d7group',
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
    if (!data.name) {
        return {code: 1, message: '商店名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name

    const message = dataRule(data) // 数据约束
    if (message.code === 1) {
        return message
    }

    let result = await GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {
            _id: data.id_dataunit
        }
    })
    const objDataunit = result.data
    result = await GQuery({
        tblName: 'ly0d7group',
        operator: 'insertOne',
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne (data) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name

    const message = dataRule(data) // 数据约束
    if (message.code === 1) {
        return message // 不能提交
    }

    const result = await GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {
            _id: data.id_dataunit
        }
    })
    const objDataunit = result.data
    await GQuery({
        tblName: 'ly0d7group',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({_id}) {
    await GQuery({
        tblName: 'ly0d7group',
        operator: 'deleteOne',
        query: {_id}
    })
    return {code: 0, message: '删除成功'}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne
}
