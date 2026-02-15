import {GQuery} from '../../main/GQuery.js'

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

        if (data0.id_roomplace) { // 客房分区
            data1.id_roomplace = data0.id_roomplace
        }

        if (data0.roomno) { // 房号，模糊匹配
            data1.roomno = {'$regex': `.*${data0.roomno}.*`}
        }

        if (data0.id_goods) { // 房型
            data1.id_goods = data0.id_goods
        }

        if (data0.status_code) { // 状态
            data1.status_code = data0.status_code
        }

        return data1
}

// 分页查询
async function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query,id_hotel
    // data.query.roomplace_text
    // data.query.roomno
    // data.query.id_goods
    // data.query.status_code
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
        tblName: 'ly0d4room',
        operator: 'find',
        query,
        sort: {roomno: 1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d4room',
        operator: 'countDocuments',
        query
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
    if (!data.roomno) {
        return {code: 1, message: '房号：必填项'}
    }
    if (!data.id_goods) {
        return {code: 1, message: '房型：必选项'}
    }
    if (!data.status_code) {
        return {code: 1, message: '房态：必选项'}
    }

    const objHotel = (await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })).data
    const objRoomplace = (await GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'findOne',
        query: {_id: data.id_roomplace}
    })).data
    const objGoods = (await GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data.id_goods}
    })).data
    const objStatus = ly0d4.busicode.roomStatus.find(i=>{
        return i.code === data.status_code
    })
    return {code: 0, message: '可以提交',
        appendix: {
            objHotel,
            objRoomplace,
            objGoods,
            objStatus
        }
    }
}

// 插入一条记录
async function insertOne (data) {
    // data.id_hotel
    // data.id_roomplace
    // data.roomno
    // data.id_goods
    // data.status_code

    // 数据约束
    let resultDataRule = await dataRule(data)
    if (resultDataRule.code !== 0) {
        return resultDataRule
    }

    // 提交
    const result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'insertOne',
        update: {
            id_dataunit: resultDataRule.appendix.objHotel.id_dataunit,
            dataunit_name: resultDataRule.appendix.objHotel.dataunit_name,
            id_hotel: data.id_hotel,
            hotel_name: resultDataRule.appendix.objHotel.name,
            id_roomplace: data.id_roomplace ? data.id_roomplace : null,
            roomplace_text: resultDataRule.appendix.objRoomplace ? resultDataRule.appendix.objRoomplace.text : "",
            roomno: data.roomno,
            id_goods: data.id_goods,
            goods_name: resultDataRule.appendix.objGoods.name,
            status_code: data.status_code,
            status_text: resultDataRule.appendix.objStatus.text
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
    // data.id_roomplace
    // data.roomno
    // data.id_goods
    // data.status_code

    // 数据约束
    let resultDataRule = await dataRule(data)
    if (resultDataRule.code !== 0) {
        return resultDataRule
    }

    // 提交
    await GQuery({
        tblName: 'ly0d4room',
        operator: 'updateOne',
        query: {_id: data._id} ,
        update: {
            id_dataunit: resultDataRule.appendix.objHotel.id_dataunit,
            dataunit_name: resultDataRule.appendix.objHotel.dataunit_name,
            id_hotel: data.id_hotel,
            hotel_name: resultDataRule.appendix.objHotel.name,
            id_roomplace: data.id_roomplace ? data.id_roomplace : null,
            roomplace_text: resultDataRule.appendix.objRoomplace ? resultDataRule.appendix.objRoomplace.text : "",
            roomno: data.roomno,
            id_goods: data.id_goods,
            goods_name: resultDataRule.appendix.objGoods.name,
            status_code: data.status_code,
            status_text: resultDataRule.appendix.objStatus.text
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne (data) {
    let _id = data._id

    let result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {id_room: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4b_goods'}
    }
    result = await GQuery({
        tblName: 'ly0d4guest',
        operator: 'findOne',
        query: {id_room: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4guest'}
    }
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {_id}
    })
    await GQuery({
        tblName: 'ly0d4htlock_room',
        operator: 'deleteMany',
        query: {
            id_hotel: result.data.id_hotel,
            room_name: result.data.roomno
        }
    })
    await GQuery({
        tblName: 'ly0d4room',
        operator: 'deleteOne',
        query: {_id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 获取页面初始化数据
async function getPgData (data) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    let q = {id_dataunit: data.id_dataunit}
    let q0 = JSON.parse(JSON.stringify(q))
    if (data.id_hotel) {
        q._id = data.id_hotel
        q0.id_hotel = data.id_hotel
    }

    let result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: q
    })
    const arrHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'find',
        query: q0,
        sort: {text: 1}
    })
    const arrRoomplace = result.data
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: q0,
        sort: {name: 1}
    })
    const arrGoods = result.data
    return {code: 0, message: "",
        data:{
            arrHotel,
            arrRoomplace,
            arrGoods,
            arrStatus: ly0d4.busicode.roomStatus
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
