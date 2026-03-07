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

    if (data0.name) { // 房型 模糊匹配
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    if (data0.price_name) { // 计价名称 模糊匹配
        data1.price_name = {'$regex': `.*${data0.price_name}.*`}
    }

    return data1
}

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.id_hotel
    // data.query.name
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

    const resultData = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'find',
        query,
        sort: {name: 1}, // 指定排序
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit) // 分页处理
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: dependencies.ly0utils.utils.imageAddr.dataSet({
            data: resultData.data,
            domain: dependencies.config.imageDomain,
            fieldNames: ['thumb']
        }),
        total: resultTotal.count
    }
}

// 内部模块：数据约束
async function dataRule (data) {
    // 不能提交
    if (!data.id_hotel) {
        return {code: 1, message: '旅店：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '房型名称：必填项'}
    }

    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
    // data.id_hotel
    // data.name
    // data.price_name
    // data.price
    // data.thumb
    // 剔除图片地址中的域名
    const data_thumb = []
    data.thumb.forEach(i=>{data_thumb.push(new URL(i).pathname)})

    // 数据约束
    let result = await dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 获取旅店信息
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })
    const objHotel = result.data
    // 发生新记录
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'insertOne',
        update: {
            id_dataunit: objHotel.id_dataunit,
            dataunit_name: objHotel.dataunit_name,
            id_hotel: objHotel._id,
            hotel_name: objHotel.name,
            name: data.name,
        }
    })
    const objGoods = result.dataNew
    // 图片处理
    if(data_thumb.length > 0){
        const thumb = [await dependencies.imageSave.imageAppend({
            uploaded: data_thumb[0],
            dataunitId: data.id_dataunit,
            tblName: 'ly0d4goods',
            fieldName: 'thumb',
            dataId: objGoods._id
        })]
        await dependencies.GQuery.GQuery({
            tblName: 'ly0d4goods',
            operator: 'updateOne',
            query: {_id: objGoods._id},
            update: {thumb}
        })
    }
    return {code: 0, message: '提交成功',
        _id: objGoods._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) {
    // data._id
    // data.id_hotel
    // data.name
    // data.price_name
    // data.price
    // data.thumb
    // 剔除图片地址中的域名
    const data_thumb = []
    data.thumb.forEach(i=>{data_thumb.push(new URL(i).pathname)})

    // 数据约束
    let result = await dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 获取旅店信息
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4hotel',
        operator: 'findOne',
        query: {_id: data.id_hotel}
    })
    let objHotel = result.data
    // 获取房型信息
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data._id}
    })
    const objGoods = result.data
    // 预置提交项目
    let upd = {
        id_dataunit: objHotel.id_dataunit,
        dataunit_name: objHotel.dataunit_name,
        id_hotel: objHotel._id,
        hotel_name: objHotel.name,
        name: data.name,
    }
    // 图片处理
    if(data_thumb.length > 0){
        upd.thumb = [await dependencies.imageSave.imageUpdate({
            uploaded: data_thumb[0],
            old: objGoods.thumb && objGoods.thumb.length > 0 ? objGoods.thumb[0] : '',
            dataunitId: data.id_dataunit,
            tblName: 'ly0d4goods',
            fieldName: 'thumb',
            dataId: objGoods._id
        })]
    }
    // 提交
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'updateOne',
        query: {_id: objGoods._id},
        update: upd
    })
    return {code: 0, message: '修改成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    // data._id

    let result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4price',
        operator: 'findOne',
        query: {id_goods: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4price'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4room',
        operator: 'findOne',
        query: {id_goods: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4room'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: {id_goods: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d4b_goods'}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4salebook',
        operator: 'findOne',
        query: {id_goods: data._id}
    })
    if (result.data) {
        return {code: 1,message: '不能删除，存在关联信息：ly0d4salebook'}
    }

    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'findOne',
        query: {_id: data._id}
    })
    const dataOld = result.data
    if(dataOld.thumb && dataOld.thumb.length > 0){
        await dependencies.imageSave.imageDelete({url: dataOld.thumb[0]})
    }

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4goods',
        operator: 'deleteOne',
        query: {_id: dataOld._id}
    })
    return {code: 0, message: '删除成功'}
}

// 获取页面渲染数据
async function getPgData ({data, dependencies}) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.id_hotel 当前用户信息：旅店id

    let q = {id_dataunit: data.id_dataunit}
    if (data.id_hotel) {
        q._id = data.id_hotel
    }

    const result = await dependencies.GQuery.GQuery({
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
    getPgData,
}
