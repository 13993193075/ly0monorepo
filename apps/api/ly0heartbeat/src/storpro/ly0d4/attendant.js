import {GQuery} from '../../main/GQuery.js'
import {blindboxes} from '@yoooloo42/blindboxes'

// 内部模块：查询修正
async function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    // 旅店 _id
    if (data0.id_hotel) {
        data1.id_hotel = data0.id_hotel
    }
    // 手机号 模糊匹配
    if (data0.cellphone) {
        data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
    }
    // 姓名 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_hotel
    // data.query.cellphone
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
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
        tblName: 'ly0d4attendant',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d4attendant',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
async function dataRule (data, branch) {
    if (!data.id_hotel) {
        return {code: 1, message: '旅店：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '姓名：必填项'}
    }
    let result = blindboxes.regexp.cellphone(data.cellphone)
    if (!result) {
        return {code: 1, message: '手机号为空或错误'}
    }

    result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })
    const objHotel = result.data

    return {code: 0, message: '可以提交',
        objHotel
    }
}

// 插入一条记录
async function insertOne (data) {
    // data.id_hotel
    // data.cellphone
    // data.name

    // 提交约束
    let result = await dataRule(data, 'insertOne')
    if (result.code !== 0) {
        return result
    }
    const objHotel = result.objHotel

    result = await GQuery({
        tblName: 'ly0d4attendant',
        operator: 'insertOne',
        update: {
            id_dataunit: objHotel.id_dataunit,
            dataunit_name: objHotel.dataunit_name,
            id_hotel: objHotel._id,
            hotel_name: objHotel.name,
            cellphone: data.cellphone,
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
    // data.id_hotel
    // data.cellphone
    // data.name

    // 提交约束
    let result = await dataRule(data, 'insertOne')
    if (result.code !== 0) {
        return result
    }
    const objHotel = result.objHotel

    await GQuery({
        tblName: 'ly0d4attendant',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objHotel.id_dataunit,
            dataunit_name: objHotel.dataunit_name,
            id_hotel: objHotel._id,
            hotel_name: objHotel.name,
            cellphone: data.cellphone,
            name: data.name
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne (data) {
    // data._id

    await GQuery({
        tblName: 'ly0d4attendant',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除成功'}
}

// 获取页面初始化数据
async function getPgData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    let q = {id_dataunit: data.id_dataunit}
    if (data.id_hotel) {
        q._id = data.id_hotel
    }

    const result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const arrHotel = result.data
    return {code: 0, message: "",
        data: {
            arrHotel
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
