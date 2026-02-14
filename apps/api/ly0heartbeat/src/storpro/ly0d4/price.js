import {ly0d4 as beanLy0d4} from 'packages/ly0utils'
import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
async function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}

    if (data0._id) { // _id 必须置于首项查询
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    // 旅店 _id
    if (data0.id_hotel) {
        data1.id_hotel = data0.id_hotel
    }
    // 房型名称 _id
    if (data0.id_goods) {
        data1.id_goods = data0.id_goods
    }
    // 标价名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 计价方法
    if (data0.method_code) {
        data1.method_code = data0.method_code
    }

    return data1
}

// 查询
async function find (data) {
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_hotel
    // data.query.id_goods
    // data.query.name
    // data.query.method_code
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = await queryRevise(data.query)
    // 排序
    let sort
    if(data.sort && data.sort.label && data.sort.order){
        sort = {}
        if(data.sort.order === "ascending"){
            sort[data.sort.label] = 1
        }else if(data.sort.order === "descending"){
            sort[data.sort.label] = -1
        }else{
            sort[data.sort.label] = 1
        }
    }else{
        sort = {_id: -1}
    }

    const resultData = await GQuery({
        tblName: 'ly0d4price',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d4price',
        operator: 'countDocuments',
        query: {id_goods: data.query.id_goods}
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
async function dataRule (data) {
    // 不能提交
    if (!data.id_hotel) {
        return {code: 1, message: '旅店：必选项'}
    }
    if (!data.id_goods) {
        return {code: 1, message: '房型名称：必选项'}
    }
    if (!data.method_code) {
        return {code: 1, message: '计价方法：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '标价名称：必填项'}
    }
    if (!/^[0-9]+\.?[0-9]{0,2}$/.test(data.price)) {
        return {code: 1, message: '单价：必填项，大于 0'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne (data) {
    // data.id_goods
    // data.name
    // data.method_code
    // data.price

    // 数据约束
    let result = await dataRule(data)
    if (result.code === 1) {
        return result
    }
    // 提交
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data.id_goods}
    })
    const objGoods = result.data
    const objMethod = beanLy0d4.busicode.method.find(i=>{
        return i.code === data.method_code
    })
    result = await GQuery({
        tblName: 'ly0d4price',
        operator: 'insertOne',
        update: {
            id_dataunit: objGoods.id_dataunit,
            dataunit_name: objGoods.dataunit_name,
            id_hotel: objGoods.id_hotel,
            hotel_name: objGoods.hotel_name,
            id_goods: objGoods._id,
            goods_name: objGoods.name,
            name: data.name ? data.name : null,
            method_code: data.method_code,
            method_text: objMethod.text,
            price: data.price ? data.price : 0
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

//  修改一条记录
async function updateOne (data) {
    //  data._id
    //  data.id_goods
    //  data.name
    //  data.price

    // 数据约束
    let result = await dataRule(data)
    if (result.code === 1) {
        return result
    }
    // 提交
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data.id_goods}
    })
    const objGoods = result.data
    const objMethod = beanLy0d4.busicode.method.find(i=>{
        return i.code === data.method_code
    })
    await GQuery({
        tblName: 'ly0d4price',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objGoods.id_dataunit,
            dataunit_name: objGoods.dataunit_name,
            id_hotel: objGoods.id_hotel,
            hotel_name: objGoods.hotel_name,
            id_goods: objGoods._id,
            goods_name: objGoods.name,
            name: data.name ? data.name : '',
            method_code: data.method_code,
            method_text: objMethod.text,
            price: data.price ? data.price : 0
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

//  删除一条记录
async function deleteOne (data) {
    //  data._id

    let result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {id_price: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4room'}
    }
    await GQuery({
        tblName: 'ly0d4price',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除成功'}
}

// 获取页面渲染数据
async function getPgData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    let q = {id_dataunit: data.id_dataunit}
    if (data.id_hotel) {
        q._id = data.id_hotel
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const arrHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: q
    })
    const arrGoods = result.data
    return {code: 0, message: "",
        data: {
            arrHotel,
            arrGoods,
            arrMethod: beanLy0d4.busicode.pricingMethod,
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
