// 内部模块：查询修正
function queryRevise (data) {
    const data0 = data || {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    // 商店名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 商城代收
    if ("mall" in data0 && (data0.mall === true || data0.mall === "true")) {
        data1.mall = true
    } else if ("mall" in data0 && (data0.mall === false || data0.mall === "false")) {
        data1.mall = false
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.name
    // data.query.mall
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

    const resultData = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7shop',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7shop',
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
async function insertOne ({data, dependencies}) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.smallticket
    // data.wx_appid
    // data.wx_mchid
    // data.mall

    const message = dataRule(data) // 数据约束
    if (message.code === 1) {
        return message
    }

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {
            _id: data.id_dataunit
        }
    })
    const objDataunit = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7shop',
        operator: 'insertOne',
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            smallticket: data.smallticket ? data.smallticket : null,
            wx_appid: data.wx_appid ? data.wx_appid : null,
            wx_mchid: data.wx_mchid ? data.wx_mchid : null,
            mall: "mall" in data && (data.mall === true || data.mall === "true")
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.smallticket
    // data.wx_appid
    // data.wx_mchid
    // data.mall

    const message = dataRule(data) // 数据约束
    if (message.code === 1) {
        return message // 不能提交
    }

    const result= await dependencies.GQuery.GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {
            _id: data.id_dataunit
        }
    })
    const objDataunit = result.data
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d7shop',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            smallticket: data.smallticket ? data.smallticket : null,
            wx_appid: data.wx_appid ? data.wx_appid : null,
            wx_mchid: data.wx_mchid ? data.wx_mchid : null,
            // mall: "mall" in data && (data.mall === true || data.mall === "true")
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    // data._id

    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7decode',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7decode'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7goodsgroup',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7goodsgroup'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7goods',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7goods'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7price',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7price'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7business',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1,message: '不能删除，存在关联信息：ly0d7business'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7b_goods',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7b_goods'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d7memo',
        operator: 'findOne',
        query: {id_shop: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d7memo'}
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d7shop',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

async function mall({data, dependencies}) { // 商城代收
    // data._id
    // data.mall

    // 排他性处理
    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: data._id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d7shop",
        operator: "updateMany",
        query: {id_dataunit: result.data.id_dataunit},
        update: {mall: false}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d7shop",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            $set: {
                mall: "mall" in data && (data.mall === true || data.mall === "true")
            }
        }
    })
    return {code: 0, message: "修改成功"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    mall
}
