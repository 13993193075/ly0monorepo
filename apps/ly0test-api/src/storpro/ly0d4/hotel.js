// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data0.id_dataunit

    if (data0.name) { // 名称，模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.name
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const query = queryRevise(data.query)
    // 排序
    const sort = {}
    if(data.sort && data.sort.label && data.sort.order){
        if(data.sort.order === "ascending"){
            sort[data.sort.label] = 1
        }else if(data.sort.order === "descending"){
            sort[data.sort.label] = -1
        }else{
            sort[data.sort.label] = 1
        }
    }else{
        sort._id = -1
    }

    const resultData = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.name) {
        return {code: 1, message: '名称：必填项'}
    }
    if (!(/^[0-9]*$/.test(data.checkout_hours) && data.checkout_hours >= 0 && data.checkout_hours <= 23)) {
        return {code: 1, message: '结算时间：时：必填项，数值，0-23'}
    }
    if (!(/^[0-9]*$/.test(data.checkout_minutes) && data.checkout_minutes >= 0 && data.checkout_minutes <= 59)) {
        return {code: 1, message: '结算时间：分：必填项，数值，0-59'}
    }
    if (data.checkout0_hours && !(/^[0-9]*$/.test(data.checkout0_hours) && data.checkout0_hours >= 0 && data.checkout0_hours <= 23)) {
        return {code: 1, message: '半日计价：时：数值，0-23'}
    }
    if (data.checkout0_minutes && !(/^[0-9]*$/.test(data.checkout0_minutes) && data.checkout0_minutes >= 0 && data.checkout0_minutes <= 59)) {
        return {code: 1, message: '半日计价：分：数值，0-59'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.checkout_hours
    // data.checkout_minutes
    // data.checkout0_hours
    // data.checkout0_minutes
    // data.wx_appid
    // data.wx_mchid
    // data.doorlock_sys

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'findOne',
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'insertOne',
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            checkout_hours: data.checkout_hours ? data.checkout_hours : 0,
            checkout_minutes: data.checkout_minutes ? data.checkout_minutes : 0,
            checkout0_hours: data.checkout0_hours ? data.checkout0_hours : null,
            checkout0_minutes: data.checkout0_minutes ? data.checkout0_minutes : null,
            wx_appid: data.wx_appid ? data.wx_appid : '',
            wx_mchid: data.wx_mchid ? data.wx_mchid : '',
            doorlock_sys: data.doorlock_sys ? data.doorlock_sys : ''
        }
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.name
    // data.checkout_hours
    // data.checkout_minutes
    // data.checkout0_hours
    // data.checkout0_minutes
    // data.wx_appid
    // data.wx_mchid
    // data.doorlock_sys

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'findOne',
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            checkout_hours: data.checkout_hours ? data.checkout_hours : 0,
            checkout_minutes: data.checkout_minutes ? data.checkout_minutes : 0,
            checkout0_hours: data.checkout0_hours ? data.checkout0_hours : null,
            checkout0_minutes: data.checkout0_minutes ? data.checkout0_minutes : null,
            wx_appid: data.wx_appid ? data.wx_appid : '',
            wx_mchid: data.wx_mchid ? data.wx_mchid : '',
            doorlock_sys: data.doorlock_sys ? data.doorlock_sys : ''
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    const _id = data._id

    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4roomplace',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4roomplace'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4booktype',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4booktype'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4goods'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4price',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4price'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods0',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4goods0'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods1',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4goods1'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4room'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4business',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4business'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4salebook'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4b_goods'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods0',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4b_goods0'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods1',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4b_goods1'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4bill',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4bill'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4memo',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4memo'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4guest',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4guest'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4attendant',
        operator: 'findOne',
        query: {id_hotel: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4attendant'}
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4htlock_hotel',
        operator: 'deleteMany',
        query: {id_hotel: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4htlock_room',
        operator: 'deleteMany',
        query: {id_hotel: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'deleteOne',
        query: {_id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne
}
