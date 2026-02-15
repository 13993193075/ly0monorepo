import {GQuery} from '../../main/GQuery.js'
import {GBT} from '@yoooloo42/ly0utils'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.name) { // 姓名，模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    if (data0.docno) { // 证件号码
        data1.docno = {'$regex': `.*${data0.docno}.*`}
    }

    if (data0.cellphone) { // 手机号
        data1.cellphone = {'$regex': `.*${data0.cellphone}.*`}
    }

    if (data0.id_b_goods) { // 房号
        data1.id_b_goods = data0.id_b_goods
    }

    return data1
}

// 分页查询
async function find (data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.name
    // data.query.docno
    // data.query.cellphone
    // data.query.id_b_goods
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
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

    const result = await GQuery({
        tblName: 'ly0d4guest',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const result0 = await GQuery({
        tblName: 'ly0d4guest',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: result.data,
        total: result0.count
    }
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: '姓名：必填项'}
    }
    if (!data.sex_code) {
        return {code: 1, message: '性别：必选项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne (data) {
    // data.id_business
    // data.name
    // data.sex_code
    // data.docno
    // data.cellphone
    // data.id_b_goods
    // data.checkin
    // data.checkout

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {_id: data.id_b_goods ? data.id_b_goods : null}
    })
    const objBGoods = result.data
    result = await GQuery({
        tblName: 'ly0d4guest',
        operator: 'insertOne',
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: objBusiness._id,

            name: data.name,
            sex_code: data.sex_code,
            sex_text: GBT.gbt2261.find(i=>{
                return i.code === data.sex_code
            }).text,
            docno: data.docno ? data.docno : null,
            cellphone: data.cellphone ? data.cellphone : null,

            id_b_goods: objBGoods ? objBGoods._id : null,
            id_room: objBGoods ? objBGoods.id_room : null,
            roomno: objBGoods ? objBGoods.roomno : "",
            checkin: data.checkin ? data.checkin : null,
            checkout: data.checkout ? data.checkout : null
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

async function updateOne (data) {
    // data._id
    // data.id_business
    // data.name
    // data.sex_code
    // data.docno
    // data.cellphone
    // data.id_b_goods
    // data.checkin
    // data.checkout

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {_id: data.id_b_goods ? data.id_b_goods : null}
    })
    const objBGoods = result.data
    await GQuery({
        tblName: 'ly0d4guest',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: data.id_business,

            name: data.name,
            sex_code: data.sex_code,
            sex_text: GBT.gbt2261.find(i=>{
                return i.code === data.sex_code
            }).text,
            docno: data.docno ? data.docno : null,
            cellphone: data.cellphone ? data.cellphone : null,

            id_b_goods: objBGoods ? objBGoods._id : null,
            id_room: objBGoods ? objBGoods.id_room : null,
            roomno: objBGoods ? objBGoods.roomno : "",
            checkin: data.checkin ? data.checkin : null,
            checkout: data.checkout ? data.checkout : null
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

async function deleteOne (data) {
    // data._id

    await GQuery({
        tblName: 'ly0d4guest',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

async function getPgData (data) {
    // data.id_business

    const result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'find',
        query: {id_business: data.id_business},
        sort: {roomno: 1}
    })
    return {code: 0, message: "",
        data: {
            arrBGoods: result.data,
            arrSex: GBT.gbt2261
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
