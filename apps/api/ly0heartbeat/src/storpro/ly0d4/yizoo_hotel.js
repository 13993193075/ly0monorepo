import {GQuery} from '../../main/GQuery.js'
import {Yizoo} from 'packages/ly0libs'

//内部模块：数据约束
function dataRule (data) {
    //不能提交
    if (!data.url) {
        return {code: 1, message: '接口请求地址：必填项'}
    }
    if (!data.accountname) {
        return {code: 1, message: '登录账号：必填项'}
    }
    if (!data.password) {
        return {code: 1, message: '登录账号密码：必填项'}
    }

    return {code: 0, message: '可以提交'}
}

// 查询全部
async function findAll (data) {
    // data.id_dataunit 当前用户信息：数据单元

    const result = await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'find',
        query: {id_dataunit: data.id_dataunit},
        sort: {_id: -1}
    })
    return {code: 0, message: "",
        data: result.data
    }
}

// 查询一条记录
async function findOne (data) {
    // data._id

    const result = await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'findOne',
        query: {_id: data._id}
    })
    return {
        doc: result.data
    }
}

// 修改一条记录
async function updateOne (data) {
    // data._id
    // data.url
    // data.accountname
    // data.password

    // 数据约束
    const result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            url: data.url,
            accountname: data.accountname,
            password: data.password
        }
    })
    return {code: 0, message: '修改成功'}
}

// 同步旅店信息
async function get (data) {
    // data.id_dataunit

    await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'deleteMany',
        query: {id_dataunit: data.id_dataunit}
    })
    const result = await GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query: {id_dataunit: data.id_dataunit}
    })
    const arrHotel = result.data,
        arrHtlock_hotel = []
    for (let i = 0; i < arrHotel.length; i++) {
        arrHtlock_hotel.push({
            id_dataunit: arrHotel [i].id_dataunit,
            dataunit_name: arrHotel [i].dataunit_name,
            id_hotel: arrHotel [i]._id,
            hotel_name: arrHotel [i].name
        })
    }
    await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'insertMany',
        update: arrHtlock_hotel
    })
    return await findAll({id_dataunit: data.id_dataunit})
}

// 获取最新令牌
async function req (data) {
    // data._id

    let result = GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'findOne',
        query: {_id: data._id}
    })
    if (!result.data) {
        return {code: 1, message: '_id 错误'}
    }
    if (!result.data.url || !result.data.accountname || !result.data.password) {
        return {code: 1, message: '参数错误'}
    }
    result = await Yizoo.openSmartLogin({
        'url': result.data.url,
        'accountName': result.data.accountname,
        'password': result.data.password
    })
    if (result.code !== 0) { // 获取令牌信息失败
        return result
    }

    let expire = new Date(),
        // 天数减 2
        // 原厂文档：获取到的tokenId，有效期为7天，建议在5天时，重新获取新的tokenId
        days = Math.max(0, Math.round(body.data.expireTime / 60 / 60 / 24) - 2)
    expire = new Date(expire.setDate(expire.getDate() + (days)))
    await GQuery({
        tblName: 'ly0d4yizoo_hotel',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            tokenid: result.data.tokenId,
            expire
        }
    })
    return {code: 0, message: '获取令牌信息成功'}
}

export default {
    findAll,
    findOne,
    updateOne,
    get,
    req
}
