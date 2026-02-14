import utils from './utils/index.js'
import code from './code.js'
import {GQuery} from '../../main/GQuery.js'
import {blindboxes, ly0d4 as beanLy0d4} from 'packages/ly0utils'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_business = data0.id_business

    if (data0.roomno) { // 房号，模糊匹配
        data1.roomno = {'$regex': `.*${data0.roomno}.*`}
    }
    return data1
}

// 分页查询
async function find (data) {
    // data.query
    // data.query._id
    // data.query.id_business
    // data.query.roomno
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
    if (!query._id && !query.id_business) {
        return {data: [], total: 0}
    }

    // 排序
    let sort
    if (data.sort && data.sort.label && data.sort.order) {
        sort = {}
        if (data.sort.order === 'ascending') {
            sort[data.sort.label] = 1
        } else if (data.sort.order === 'descending') {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort = {_id: -1}
    }

    const result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'find',
        query,
        sort: {roomno: 1},
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const result0 = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: result.data,
        total: result0.count
    }
}

// 内部模块：数据约束
async function dataRule (data, branch) {
    // 不能提交
    if (!data.id_business) {
        return {code: 1, message: '没有订单id'}
    }
    if (!data.id_room) {
        return {code: 1, message: '房号：必选项'}
    }
    if (!data.method_code) {
        return {code: 1, message: '计价方法：必选项'}
    }
    if (!/^[0-9]+/.test(data.price)) {
        return {code: 1, message: '单价：必填项，大于等于 0'}
    }
    if (!data.checkin) {
        return {code: 1, message: '入住时间：必填项'}
    }
    if (!data.checkout) {
        return {code: 1, message: '离开时间：必填项'}
    }
    if (new Date(data.checkin) >= new Date(data.checkout)) {
        return {code: 1, message: '离开时间必须大于入住时间'}
    }

    // 客房使用状态
    return await utils.roomUsed.roomUsed({
        id_b_goods: branch === "updateOne" ? data._id : null,
        id_room: data.id_room,
        checkin: data.checkin,
        checkout: data.checkout
    })
}

// 插入一条记录
async function insertOne (data) {
    // data.id_business
    // data.id_room
    // data.id_price 房型标价
    // data.price_name 标价名称
    // data.method_code 计价方法
    // data.price 单价
    // data.checkin
    // data.checkout
    // data.status_code 用房状态

    // 数据约束
    let result  = await dataRule(data, "insertOne")
    if (result.code !== 0) {
        return result
    }

    // 提交
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {_id: data.id_room}
    })
    const objRoom = result.data

    const thisTime = new Date()
    const status_code = data.status_code ?? objBusiness.status_code
    result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'insertOne',
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: objBusiness._id,
            id_room: objRoom._id,
            roomno: objRoom.roomno,
            id_roomplace: objRoom.id_roomplace ? objRoom.id_roomplace : null,
            roomplace_text: objRoom.roomplace_text ? objRoom.roomplace_text : "",
            id_goods: objRoom.id_goods ? objRoom.id_goods : null,
            goods_name: objRoom.goods_name ? objRoom.goods_name : '',
            id_price: data.id_price ? data.id_price : (objRoom.id_price ? objRoom.id_price : null),
            price_name: data.price_name ? data.price_name : (objRoom.price_name ? objRoom.price_name : ""),
            method_code: data.method_code,
            method_text: code.pricingMethod.find(i=>{
                return i.code === data.method_code
            }).text,
            price: data.price && data.price > 0 ? data.price : (objRoom.price && objRoom.price > 0 ? objRoom.price : 0),
            checkin: data.checkin,
            checkout: data.checkout,
            status_code,
            status_text: code.businessStatus.find(i=>{
                return i.code === status_code
            }).text,
        }
    })
    const objBGoodsNew = result.dataNew
    // 同步房态
    await utils.roomStatus.setRoomStatusWithBusiness({
        id_business: objBusiness._id
    })
    return {code: 0, message: '插入一条记录成功',
        _id: objBGoodsNew._id
    }
}

// 修改一条记录
async function updateOne (data) {
    // data._id
    // data.id_business
    // data.id_room
    // data.id_price 房型标价
    // data.price_name 标价名称
    // data.method_code 计价方法
    // data.price 单价
    // data.checkin
    // data.checkout
    // data.status_code 用房状态

    // 数据约束
    let result = await dataRule(data, "updateOne")
    if (result.code === 1) {
        return result
    }

    // 提交
    result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {_id: data.id_room}
    })
    const objRoom = result.data

    const thisTime = new Date()
    const status_code = data.status_code ?? objBusiness.status_code
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name,
            id_hotel: objBusiness.id_hotel,
            hotel_name: objBusiness.hotel_name,
            id_business: objBusiness._id,
            id_room: objRoom._id,
            roomno: objRoom.roomno,
            id_roomplace: objRoom.id_roomplace ? objRoom.id_roomplace : null,
            roomplace_text: objRoom.roomplace_text ? objRoom.roomplace_text : "",
            id_goods: objRoom.id_goods ? objRoom.id_goods : null,
            goods_name: objRoom.goods_name ? objRoom.goods_name : '',
            id_price: data.id_price ? data.id_price : (objRoom.id_price ? objRoom.id_price : null),
            price_name: data.price_name ? data.price_name : (objRoom.price_name ? objRoom.price_name : ""),
            method_code: data.method_code,
            method_text: code.pricingMethod.find(i=>{
                return i.code === data.method_code
            }).text,
            price: data.price && data.price > 0 ? data.price : (objRoom.price && objRoom.price > 0 ? objRoom.price : 0),
            checkin: data.checkin,
            checkout: data.checkout,
            status_code,
            status_text: code.businessStatus.find(i=>{
                return i.code === status_code
            }).text,
        }
    })
    // 同步房态
    await utils.roomStatus.setRoomStatusWithBusiness({
        id_business: objBusiness._id
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne (data) {
    // data._id

    const result = await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {_id: data._id}
    })
    const objBGoodsOld = result.data
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    // 同步房态
    await utils.roomStatus.setRoomStatusWithBusiness({
        id_business: objBGoodsOld.id_business
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 通过 id_business 获取页面初始化数据
async function getPgData (data) {
    // data.id_business

    let result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data
    result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: objBusiness.id_hotel}
    })
    const objHotel = result.data
    result = await GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'find',
        query: {
            id_hotel: objHotel._id
        }
    })
    const arrRoomplace = result.data
    result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'find',
        query: {
            id_hotel: objHotel._id,
        },
        sort: {roomno: 1}
    })
    const arrRoom = result.data
    result = await GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query: {id_hotel: objHotel._id}
    })
    const arrGoods = result.data
    result = await GQuery({
        tblName: 'ly0d4price',
        operator: 'find',
        query: {id_hotel: objHotel._id}
    })
    const arrPrice = result.data
    return {code: 0, message: "",
        data: {
            objBusiness,
            objHotel,
            arrRoomplace,
            arrRoom,
            arrGoods,
            arrMethod: beanLy0d4.busicode.pricingMethod,
            arrPrice,
            arrStatus: beanLy0d4.busicode.businessStatus
        }
    }
}

// 插入多条记录
async function insertMany (data) {
    // data.id_business
    // data.arrRoom
    // data.checkin
    // data.checkout

    const thisTime = new Date()
    let result = await GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {_id: data.id_business}
    })
    const objBusiness = result.data

    // 数据约束
    if (!data.id_business) {
        return {code: 1, message: '没有订单id'}
    }
    if (!data.arrRoom || data.arrRoom.length === 0) {
        return {code: 1, message: '未选择客房'}
    }
    if (!data.checkin) {
        return {code: 1, message: '必填项：入住时间'}
    }
    if (!data.checkout) {
        return {code: 1, message: '必填项：离开时间'}
    }

    // 获取标价信息
    result = await GQuery({
        tblName: 'ly0d4price',
        operator: 'find',
        query: {id_hotel: objBusiness.id_hotel}
    })
    const arrPrice = result.data
    // 附加标价信息
    const arrRoom = []
    data.arrRoom.forEach(i => {
        const objPrice = arrPrice.find(j => {
            return j.id_goods + '' === i.id_goods + ''
        })
        if(!!objPrice) {
            arrRoom.push(Object.assign(i, {
                id_price: objPrice._id,
                price_name: objPrice.name,
                method_code: objPrice.method_code,
                method_text: objPrice.method_text,
                price: objPrice.price,
            }))
        }else{
            arrRoom.push(Object.assign(i, {
                id_price: null,
                price_name: '未标价',
                method_code: '',
                method_text: '',
                price: 0,
            }))
        }
    })

    // 等待批量插入的数据
    const arrInsert = []
    for (let i = 0; i < arrRoom.length; i++) {
        // 判断客房是否未被使用
        result = await utils.roomUsed.roomUsed({
            id_b_goods: null,
            id_room: arrRoom[i]._id,
            checkin: data.checkin,
            checkout: data.checkout
        })
        if(result.code === 0){
            arrInsert.push({
                time_create: thisTime,
                time_update: thisTime,
                id_dataunit: objBusiness.id_dataunit,
                dataunit_name: objBusiness.dataunit_name,
                id_hotel: objBusiness.id_hotel,
                hotel_name: objBusiness.hotel_name,
                id_business: objBusiness._id,
                checkin: data.checkin,
                checkout: data.checkout,
                status_code: objBusiness.status_code,
                status_text: objBusiness.status_text,
                id_room: arrRoom[i]._id,
                roomno: arrRoom[i].roomno,
                id_goods: arrRoom[i].id_goods,
                goods_name: arrRoom[i].goods_name,
                id_price: arrRoom[i].id_price,
                price_name: arrRoom[i].price_name,
                method_code: arrRoom[i].method_code,
                method_text: arrRoom[i].method_text,
                price: arrRoom[i].price,
            })
        }
    }
    // 插入多条用房记录
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'insertMany',
        update: arrInsert
    })
    // 同步房态
    await utils.roomStatus.setRoomStatusWithBusiness({
        id_business: objBusiness._id
    })

    return {code: 0, message: arrInsert.length + ' 条记录插入成功',
        success: arrInsert.length
    }
}

// 修改多条记录：入住时间
async function updateManyCheckin (data) {
    // data.id_business
    // data.checkin
    // data.arrUpdate

    // 不能提交
    if(!data.arrUpdate || data.arrUpdate.length === 0){
        return {code: 1, message: "没有可修改的记录"}
    }
    if (!data.checkin) {
        return {code: 1, message: '未提交入住时间'}
    }

    // 等待批量修改的用房记录id
    const arrId = []
    for (let i = 0; i < data.arrUpdate.length; i++) {
        const result = await utils.roomUsed.roomUsed({
            id_b_goods: null,
            id_room: data.arrUpdate[i].id_room,
            checkin: data.checkin,
            checkout: data.arrUpdate[i].checkout
        })
        if(result.code === 0){
            arrId.push(data.arrUpdate[i]._id)
        }
    }
    if (arrId.length === 0) {
        return {code: 1, message: '没有可修改的记录'}
    }
    // 批量修改
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateMany',
        query: {
            id_business: data.id_business,
            _id: {$in: arrId}
        },
        update: {checkin: data.checkin}
    })

    return {code: 0, message: arrId.length + ' 条记录修改成功',
        success: arrId.length
    }
}

// 修改多条记录：离开时间
async function updateManyCheckout (data) {
    // data.id_business
    // data.checkout
    // data.arrUpdate

    // 不能提交
    if(!data.arrUpdate || data.arrUpdate.length === 0){
        return {code: 1, message: "没有可修改的记录"}
    }
    if (!data.checkout) {
        return {code: 1, message: '未提交离开时间'}
    }

    // 等待批量修改的用房记录id
    const arrId = []
    for (let i = 0; i < data.arrUpdate.length; i++) {
        const result = await utils.roomUsed.roomUsed({
            id_b_goods: null,
            id_room: data.arrUpdate[i].id_room,
            checkin: data.arrUpdate[i].checkin,
            checkout: data.checkout
        })
        if(result.code === 0){
            arrId.push(data.arrUpdate[i]._id)
        }
    }
    if (arrId.length === 0) {
        return {code: 1, message: '没有可修改的记录'}
    }
    // 批量修改
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateMany',
        query: {
            id_business: data.id_business,
            _id: {$in: arrId}
        },
        update: {checkout: data.checkout}
    })

    return {code: 0, message: arrId.length + ' 条记录修改成功',
        success: arrId.length
    }
}

// 修改多条记录：用房状态
async function updateManyStatus (data) {
    // data.id_business
    // data.status_code
    // data.arrUpdate

    // 不能提交
    if(!data.arrUpdate || data.arrUpdate.length === 0){
        return {code: 1, message: "没有可修改的记录"}
    }
    if (!data.status_code) {
        return {code: 1, message: '未提交新的用房状态'}
    }

    // 等待批量修改的用房记录id
    const arrId = []
    for (let i = 0; i < data.arrUpdate.length; i++) {
        const result = await utils.roomUsed.roomUsed({
            id_b_goods: null,
            id_room: data.arrUpdate[i].id_room,
            checkin: data.arrUpdate[i].checkin,
            checkout: data.arrUpdate[i].checkout
        })
        if(result.code === 0){
            arrId.push(data.arrUpdate[i]._id)
        }
    }
    if (arrId.length === 0) {
        return {code: 1, message: '没有可修改的记录'}
    }
    // 批量修改
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateMany',
        query: {
            id_business: data.id_business,
            _id: {$in: arrId}
        },
        update: {
            status_code: data.status_code,
            status_text: beanLy0d4.busicode.businessStatus.find(i=>{
                return i.code === data.status_code
            }).text
        }
    })

    return {code: 0, message: arrId.length + ' 条记录修改成功',
        success: arrId.length
    }
}

// 修改多条记录：单价
async function updateManyPrice (data) {
    // data.id_business
    // data.price
    // data.arrUpdate

    // 不能提交
    if(!data.arrUpdate || data.arrUpdate.length === 0){
        return {code: 1, message: "没有可修改的记录"}
    }
    if (!data.price) {
        return {code: 1, message: '未提交单价'}
    }

    // 等待批量修改的用房记录id
    const arrId = []
    for (let i = 0; i < data.arrUpdate.length; i++) {
        arrId.push(data.arrUpdate[i]._id)
    }
    // 批量修改
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateMany',
        query: {
            id_business: data.id_business,
            _id: {$in: arrId}
        },
        update: {price: data.price}
    })

    return {code: 0, message: arrId.length + ' 条记录修改成功',
        success: arrId.length
    }
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    allocation: utils.roomUsed.allocation,

    insertMany,
    updateManyCheckin,
    updateManyCheckout,
    updateManyStatus,
    updateManyPrice
}
