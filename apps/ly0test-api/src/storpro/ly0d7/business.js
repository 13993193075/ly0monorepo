import {GQuery} from '../../main/GQuery.js'
import code from "./code.js"
import id_business from "./id_business.js"

// 查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}

    if (data0._id) { // _id 必须置于首项查询
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    // 商店 _id
    if (data0.id_shop) {
        data1.id_shop = data0.id_shop
    }
    // 订单状态
    if (data0.status_code) {
        data1.status_code = data0.status_code
    }
    // 交易时间
    if (data0.time_start || data0.time_end) {
        data1.time = {}
        if (data0.time_start) {
            data1.time.$gte = data0.time_start
        }
        if (data0.time_end) {
            data1.time.$lte = data0.time_end
        }
    }
    // 客户手机号，模糊匹配
    if (data0.client_cellphone) {
        data1.client_cellphone = {'$regex': `.*${data0.client_cellphone}.*`}
    }
    // 客户名称，模糊匹配
    if (data0.client_name) {
        data1.client_name = {'$regex': `.*${data0.client_name}.*`}
    }
    // 商城用户 _id
    if (data0.id_guest) {
        data1.id_guest = data0.id_guest
    }
    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_shop
    // data.query.status_code
    // data.query.time_start
    // data.query.time_end
    // data.query.client_cellphone
    // data.query.client_name
    // data.query.id_guest
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
        tblName: "ly0d7business",
        operator: "find",
        query,
        sort: {time: -1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7business",
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
    if (!data.status_code) {
        return {code: 1, message: '订单状态：必选项'}
    }
    if (!data.time) {
        return {code: 1, message: "交易时间：必填项"};
    }
    if (data.amount && (!(/^[0-9]+$/.test(data.amount)))) {
        return {code: 1, message: "计费：必须大于等于 0"};
    }
    if (data.deal && (!(/^[0-9]+$/.test(data.deal)))) {
        return {code: 1, message: "核收：必须大于等于 0"};
    }

    return {code: 0, message: "可以提交"};
}

// 插入一条记录
async function insertOne(data) {
    // data.id_shop
    // data.status_code
    // data.time
    // data.client_cellphone
    // data.client_name

    // 数据约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }

    // 提交
    const thisTime = new Date()
    let result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: data.id_shop}
    })
    const objShop = result.data
    result = await GQuery({
        tblName: "ly0d7business",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objShop.id_dataunit,
            dataunit_name: objShop.dataunit_name,
            id_shop: objShop._id,
            shop_name: objShop.name,
            status_code: data.status_code,
            status_text: code.businessStatus.find(i=>{
                return i.code === data.status_code
            }).text,
            time: data.time,
            client_cellphone: data.client_cellphone ? data.client_cellphone : null,
            client_name: data.client_name ? data.client_name : null
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
    // data.status_code
    // data.time
    // data.client_cellphone
    // data.client_name

    //  数据约束
    const message = dataRule(data);
    if (message.code === 1) {
        return message //  不能提交
    }

    //  提交
    const thisTime = new Date()
    const result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: data.id_shop}
    })
    const objShop = result.data
    await GQuery({
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objShop.id_dataunit,
            dataunit_name: objShop.dataunit_name,
            id_shop: objShop._id,
            shop_name: objShop.name,
            status_code: data.status_code,
            status_text: code.businessStatus.find(i=>{
                return i.code === data.status_code
            }).text,
            time: data.time,
            client_cellphone: data.client_cellphone ? data.client_cellphone : null,
            client_name: data.client_name ? data.client_name : null
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({_id}) {
    let result = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "findOne",
        query: {id_business: _id}
    })
    if (result.data) {
        return resolve({code: 1, message: "不能删除，存在关联信息：ly0d7b_goods"});
    }
    result = await GQuery({
        tblName: "ly0d7memo",
        operator: "findOne",
        query: {id_business: _id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d7memo"}
    }

    await GQuery({
        tblName: "ly0d7business",
        operator: "deleteOne",
        query: {_id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

//  获取页面初始化数据
async function getPgData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_shop 当前用户信息：商店id

    const q = {id_dataunit: data.id_dataunit}
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
            arrShop: result.data,
            arrBusinessStatus: code.businessStatus
        }
    }
}

// 核收
async function deal(data) {
    // data._id
    // data.deal
    // data.dealnote

    //  不能提交
    if (!/^[0-9]+$/.test(data.deal)) {
        return {code: 1, message: "校验错误：金额必须 >= 0"}
    }

    await GQuery({
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            deal: data.deal,
            dealnote: data.dealnote ? data.dealnote : null
        }
    })
    return {code: 0, message: "修改成功"}
}

// 交易中
async function trading ({_id}) {
    return await id_business.trading({
        id_business: _id
    })
}

// 交易完成
async function traded ({_id}) {
    return await id_business.traded({
        id_business: _id
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    deal,
    trading,
    traded
}
