import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.memo) { // 备忘，模糊匹配
        data1.memo = {'$regex': `.*${data0.memo}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.memo
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
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

    const resultData = await GQuery({
        tblName: "ly0d7memo",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7memo",
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
    if (!data.memo) {
        return {code: 1, message: "备忘：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
async function insertOne(data) {
    // data.id_business
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    // 数据约束
    const message = dataRule(data);
    if (message.code === 1) {
        return message
    }

    // 提交
    const thisTime = new Date();
    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7memo",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_shop: objBusiness.id_shop,
            shop_name: objBusiness.shop_name,
            id_business: objBusiness._id,
            memo: data.memo,
            time: thisTime,
            recorder_cellphone: data.recorder_cellphone,
            recorder_name: data.recorder_name
        }
    })
    return {code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_business
    // data.memo
    // data.recorder_cellphone 当前用户信息：手机号
    // data.recorder_name 当前用户信息：用户名称

    // 数据约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }

    // 提交
    const thisTime = new Date()
    const result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    await GQuery({
        tblName: "ly0d7memo",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_shop: objBusiness.id_shop,
            shop_name: objBusiness.shop_name,
            id_business: objBusiness._id,
            memo: data.memo,
            time: thisTime,
            recorder_cellphone: data.recorder_cellphone,
            recorder_name: data.recorder_name
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({_id}) {
    await GQuery({
        tblName: "ly0d7memo",
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
