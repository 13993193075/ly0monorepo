import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.number) { // 商品编号 模糊匹配
        data1.number = {'$regex': `.*${data0.number}.*`}
    }
    if (data0.name) { // 商品名称，模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.number
    // data.query.name
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
        tblName: "ly0d7b_goods",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: "ly0d7b_goods",
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
    if (!data.number) {
        return {code: 1, message: "商品编号：必填项"};
    }
    if (!data.name) {
        return {code: 1, message: "商品名称：必填项"};
    }
    if (!(/^[0-9]+$/.test(data.price))) {
        return {code: 1, message: "单价：必填项，大于等于 0"};
    }
    if (!(/^[0-9]+$/.test(data.count))) {
        return {code: 1, message: "数量：必填项，大于等于 0"};
    }

    return {code: 0, message: "可以提交"};
}

// 插入一条记录
async function insertOne(data) {
    // data.id_business
    // data.id_goods
    // data.number
    // data.name
    // data.price_name
    // data.price
    // data.count

    // 数据约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }

    // 提交
    const thisTime = new Date()
    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7b_goods",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_shop: objBusiness.id_shop,
            shop_name: objBusiness.shop_name,
            id_business: objBusiness._id,
            id_goods: data.id_goods ? data.id_goods : null,
            number: data.number,
            name: data.name,
            price_name: data.price_name ? data.price_name : "",
            price: data.price,
            count: data.count
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
    // data.id_goods
    // data.number
    // data.name
    // data.price_name
    // data.price
    // data.count

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
        tblName: "ly0d7b_goods",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_shop: objBusiness.id_shop,
            shop_name: objBusiness.shop_name,
            id_business: objBusiness._id,
            id_goods: data.id_goods ? data.id_goods : null,
            number: data.number,
            name: data.name,
            price_name: data.price_name ? data.price_name : "",
            price: data.price,
            count: data.count
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({_id}) {
    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "deleteOne",
        query: {_id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 获取页面初始化数据
async function getPgData({id_business}) {
    let result = await Query({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {_id: objBusiness.id_shop}
    })
    const objShop = result.data
    return {code: 0, message: "",
        data: {
            objBusiness,
            objShop
        }
    }
}

// 商品扫码
async function findNumber(data) {
    // data.id_business
    // data.number

    if (!data.id_business || !data.number) {
        return {code: 1, message: "请求参数错误"}
    }
    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business}
    })
    if (!result.data) {
        return {code: 1, message: "订单编号错误"}
    }
    const objBusiness = result.data
    result = await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {
            id_dataunit: objBusiness.id_dataunit,
            id_shop: objBusiness.id_shop,
            number: data.number
        }
    })
    if (result.data){
        return {code: 0, message: "查询成功",
            objGoods: result.data
        }
    }
    return {code: 1, message: "商品编号错误"}
}

// 商品扫码 - 批量写入
async function insertMany(data) {
    const id_business = data.id_business,
        arrGoods = JSON.parse(JSON.stringify(data.arrGoods)),
        thisTime = new Date()

    const result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: id_business}
    })
    const objBusiness = result.data
    arrGoods.forEach(i => {
        i.time_create = thisTime
        i.time_update = thisTime
        i.id_dataunit = objBusiness.id_dataunit
        i.dataunit_name = objBusiness.dataunit_name
        i.id_shop = objBusiness.id_shop
        i.shop_name = objBusiness.shop_name
        i.id_business = id_business
    })
    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "insertMany",
        update: arrGoods
    })
    return {code: 0, message: "商品扫码 - 批量写入成功"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    findNumber,
    insertMany
}
