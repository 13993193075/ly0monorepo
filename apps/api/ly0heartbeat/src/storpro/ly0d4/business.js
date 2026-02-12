import {GQuery} from '../../main/GQuery.js'
import {ly0d4 as beanLy0d4} from '@yoooloo42/blindboxes'

// 内部模块：查询修正
async function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}

    if (data0._id) { // _id 必须置于首项查询
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    // 旅店 _id
    if (data0.id_hotel) {
        data1.id_hotel = data0.id_hotel
    }

    if (data0.status_code) { // 订单状态
        data1.status_code = data0.status_code
    }

    if (data0.cellphone) { // 订单手机号，模糊匹配
        data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
    }

    if (data0.client_cellphone) { // 客户手机号，模糊匹配
        data1.client_cellphone = {'$regex': `.*${data0.client_cellphone}.*`}
    }

    if (data0.client_name) { // 客户名称，模糊匹配
        data1.client_name = {'$regex': `.*${data0.client_name}.*`}
    }

    if (data0.id_booktype) { // 预订类型
        data1.id_booktype = data0.id_booktype
    }

    // 入住时间
    if (data0.checkin_start || data0.checkin_end) {
        data1.checkin = {}
        if (data0.checkin_start) {
            data1.checkin.$gte = data0.checkin_start
        }
        if (data0.checkin_end) {
            data1.checkin.$lte = data0.checkin_end
        }
    }

    // 离开时间
    if (data0.checkout_start || data0.checkout_end) {
        data1.checkout = {}
        if (data0.checkout_start) {
            data1.checkout.$gte = data0.checkout_start
        }
        if (data0.checkout_end) {
            data1.checkout.$lte = data0.checkout_end
        }
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_hotel
    // data.query.status_code
    // data.qurey.cellphone
    // data.query.checkin_start
    // data.query.checkin_end
    // data.query.checkout_start
    // data.query.checkout_end
    // data.query.id_booktype
    // data.query.client_cellphone
    // data.query.client_name
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
        tblName: "ly0d4business",
        operator: "find",
        query,
        sort: {checkin: -1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: "ly0d4business",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
async function dataRule(data) {
    // 不能提交
    if (!data.status_code) {
        return {code: 1, message: '订单状态：必选项'}
    }
    if (!data.checkin) {
        return {code: 1, message: "入住时间：必填项"};
    }
    if (!data.checkout) {
        return {code: 1, message: "离开时间：必填项"};
    }
    if (new Date(data.checkin) >= new Date(data.checkout)) {
        return ({code: 1, message: "离开时间必须大于入住时间"});
    }

    return {code: 0, message: "可以提交"};
}

// 插入一条记录
async function insertOne(data) {
    // data.id_hotel
    // data.status_code
    // data.cellphone
    // data.checkin
    // data.checkout
    // data.peoples
    // data.rooms
    // data.id_booktype
    // data.booktime
    // data.booknote
    // data.client_cellphone
    // data.client_name

    // 数据约束
    let result = await dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    let thisTime = new Date()
    result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })
    const objHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4booktype',
        operator: 'findOne',
        query: {_id: data.id_booktype || null}
    })
    const objBooktype = result.data || null
    result = await GQuery({
        tblName: "ly0d4business",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objHotel.id_dataunit,
            dataunit_name: objHotel.dataunit_name,
            id_hotel: objHotel._id,
            hotel_name: objHotel.name,
            status_code: data.status_code,
            status_text: beanLy0d4.busicode.businessStatus.find(i=>{
                return i.code === data.status_code
            }).text,
            cellphone: data.cellphone ? data.cellphone : "",
            checkin: data.checkin,
            checkout: data.checkout,
            peoples: data.peoples ? data.peoples : "",
            rooms: data.rooms ? data.rooms : "",
            id_booktype: objBooktype ? objBooktype._id : null,
            booktype_text: objBooktype ? objBooktype.text : "",
            booktime: data.booktime ? data.booktime : null,
            booknote: data.booknote ? data.booknote : "",
            client_cellphone: data.client_cellphone ? data.client_cellphone : "",
            client_name: data.client_name ? data.client_name : ""
        }
    })
    return {
        code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_hotel
    // data.status_code
    // data.cellphone
    // data.checkin
    // data.checkout
    // data.peoples
    // data.rooms
    // data.id_booktype
    // data.booktime
    // data.booknote
    // data.client_cellphone
    // data.client_name

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })
    const objHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4booktype',
        operator: 'findOne',
        query: {_id: data.id_booktype ? data.id_booktype : null}
    })
    const objBooktype = result.data
    await GQuery({
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objHotel.id_dataunit,
            dataunit_name: objHotel.dataunit_name,
            id_hotel: objHotel._id,
            hotel_name: objHotel.name,
            status_code: data.status_code,
            status_text: beanLy0d4.busicode.businessStatus.find(i=>{
                return i.code === data.status_code
            }).text,

            cellphone: data.cellphone ? data.cellphone : "",
            checkin: data.checkin,
            checkout: data.checkout,
            peoples: data.peoples ? data.peoples : "",
            rooms: data.rooms ? data.rooms : "",

            id_booktype: objBooktype ? objBooktype._id : null,
            booktype_text: objBooktype ? objBooktype.text : "",
            booktime: data.booktime ? data.booktime : null,
            booknote: data.booknote ? data.booknote : "",
            client_cellphone: data.client_cellphone ? data.client_cellphone : "",
            client_name: data.client_name ? data.client_name : ""
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne(data) {
    // data._id

    let result = await GQuery({
        tblName: "ly0d4b_goods",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4b_goods"}
    }
    result = await GQuery({
        tblName: "ly0d4b_goods0",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4b_goods0"}
    }
    result = await GQuery({
        tblName: "ly0d4b_goods1",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4b_goods1"}
    }
    result = await GQuery({
        tblName: "ly0d4bill",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4bill"}
    }
    result = await GQuery({
        tblName: "ly0d4memo",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4memo"}
    }
    result = await GQuery({
        tblName: "ly0d4guest",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4guest"}
    }
    result = await GQuery({
        tblName: "ly0d4salebook",
        operator: "findOne",
        query: {id_business: data._id}
    })
    if (result.data) {
        return {code: 1, message: "不能删除，存在关联信息：ly0d4salebook"}
    }

    await GQuery({
        tblName: "ly0d4business",
        operator: "deleteOne",
        query: {_id: data._id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 获取页面初始化数据
async function getPgData(data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    let q = {id_dataunit: data.id_dataunit};
    let q0 = JSON.parse(JSON.stringify(q));
    if (data.id_hotel) {
        q._id = data.id_hotel;
        q0.id_hotel = data.id_hotel;
    }

    let result = await GQuery({
        tblName: "ly0d4hotel",
        operator: "find",
        query: q
    })
    const arrHotel = result.data;
    result = await GQuery({
        tblName: "ly0d4booktype",
        operator: "find",
        query: q0
    })
    const arrBooktype = result.data;
    return {code: 0, message: "",
        data: {
            arrHotel,
            arrBooktype,
            arrBusinessStatus: beanLy0d4.busicode.businessStatus
        }
    }
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
}
