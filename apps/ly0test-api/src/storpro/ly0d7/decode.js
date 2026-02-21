import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return resolve(data1)
    }
    data1.id_dataunit = data0.id_dataunit

    // 商店 _id
    if (data0.id_shop) {
        data1.id_shop = data0.id_shop
    }

    if (data0.name) { // 解码名称，模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_shop
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 排序
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

    const query = queryRevise(data.query) // 查询修正
    const resultData = await GQuery({
        tblName: "ly0d7decode",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7decode",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        count: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.id_shop) {
        return {code: 1, message: "商店：必选项"};
    }
    if (!data.name) {
        return {code: 1, message: "解码名称：必填项"};
    }
    return {code: 0, message: "可以提交"};
}

// 插入一条记录
async function insertOne(data) {
    // data.id_shop
    // data.name
    // data.decode

    // 数据约束
    let message = dataRule(data);
    if (message.code === 1) {
        return resolve(message);
    }

    // 提交
    let result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {
            _id: data.id_shop
        }
    })
    const objShop = result.data
    result = await GQuery({
        tblName: "ly0d7decode",
        operator: "insertOne",
        update: {
            id_dataunit: objShop.id_dataunit,
            dataunit_name: objShop.dataunit_name,
            id_shop: objShop._id,
            shop_name: objShop.name,
            name: data.name,
            decode: data.decode ? data.decode : null
        }
    })
    return {code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_shop
    // data.name
    // data.decode

    // 数据约束
    let message = dataRule(data);
    if (message.code === 1) {
        return resolve(message); // 不能提交
    }

    // 提交
    const result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {
            _id: data.id_shop
        }
    })
    const objShop = result.data
    await GQuery({
        tblName: "ly0d7decode",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            id_dataunit: objShop.id_dataunit,
            dataunit_name: objShop.dataunit_name,
            id_shop: objShop._id,
            shop_name: objShop.name,
            name: data.name,
            decode: data.decode ? data.decode : null
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({_id}) {
    await GQuery({
        tblName: "ly0d7decode",
        operator: "deleteOne",
        query: {_id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 获取页面初始化数据
async function getPgData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    const q = {id_dataunit: data.id_dataunit};
    if (data.id_shop) {
        q._id = data.id_shop
    }

    const result = await GQuery({
        tblName: "ly0d7shop",
        operator: "find",
        query: q
    })
    return {code: 0, message: "",
        data: {
            arrShop: result.data
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
