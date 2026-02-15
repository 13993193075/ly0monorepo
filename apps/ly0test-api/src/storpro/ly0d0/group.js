import {GQuery} from '../../main/GQuery.js'
import {imageDomain} from '../../main/config.js'
import ImageSave from '../../main/image-save.js'

// 内部模块：查询修正
async function queryRevise(data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return (data1)
    }

    // 数据单元
    if (data0.id_dataunit) {
        data1.id_dataunit = data0.id_dataunit
    }
    // 用户组名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 应用路由 模糊匹配
    if (data0.route) {
        data1.route = {'$regex': `.*${data0.route}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit
    // data.query.name
    // data.query.route
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = await queryRevise(data.query) // 查询修正
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
        tblName: 'ly0d0group',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d0group',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data.map(i=>{
            return Object.assign(i, {
                icon: [i.icon && i.icon.length > 0 ? imageDomain.domain + i.icon[0] : '']
            })
        }),
        total: resultTotal.count
    }
}

// 内部模块：数据约束
async function dataRule(data) {
    if (!data.id_dataunit) {
        return {code: 1, message: '数据单元：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '用户组名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne(data) {
    // data.id_dataunit
    // data.name
    // data.route_type
    // data.route
    // data.icon
    const data_icon = []
    data.icon.forEach(i=>{
        try{
            data_icon.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    // 提交约束
    const message = await dataRule(data)
    if (message.code === 1) {
        return message
    }
    // 提交
    let result = await GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data
    result = await GQuery({
        tblName: 'ly0d0group',
        operator: 'insertOne',
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            route_type: data.route_type ? data.route_type : '0',
            route: data.route ? data.route : null
        }
    })
    const dataNew = result.dataNew
    if(data_icon.length > 0){
        const icon = await ImageSave.imageAppend({
            uploaded: data_icon[0],
            dataunitId: objDataunit._id,
            tblName: 'ly0d0group',
            fieldName: 'icon',
            dataId: dataNew._id
        })
        await GQuery({
            tblName: 'ly0d0group',
            operator: 'updateOne',
            query: {_id: dataNew._id},
            update: {icon: icon ? [icon] : []}
        })
    }
    return {code: 0, message: '插入一条记录成功',
        _id: dataNew._id,
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_dataunit
    // data.name
    // data.route_type
    // data.route
    // data.icon
    const data_icon = []
    data.icon.forEach(i=>{
        try{
            data_icon.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    // 提交约束
    const message = await dataRule(data)
    if (message.code === 1) {
        return message
    }
    // 提交
    let result= await GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data
    let upd = {
        id_dataunit: objDataunit._id,
        dataunit_name: objDataunit.name,
        name: data.name,
        route_type: data.route_type ? data.route_type : '0',
        route: data.route ? data.route : null,
    }
    if(data_icon.length > 0){
        result = await GQuery({
            tblName: 'ly0d0group',
            operator: 'findOne',
            query: {_id: data._id}
        })
        const dataOld = result.data
        const icon = await ImageSave.imageUpdate({
            uploaded: data_icon[0],
            old: dataOld.icon && dataOld.icon.length > 0 ? dataOld.icon[0] : '',
            dataunitId: data.id_dataunit,
            tblName: 'ly0d0group',
            fieldName: 'icon',
            dataId: dataOld._id
        })
        upd.icon = [icon]
    }
    await GQuery({
        tblName: 'ly0d0group',
        operator: 'updateOne',
        query: {_id: data._id},
        update: upd
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne(data) {
    // data._id

    let result = await GQuery({
        tblName: 'ly0d0user',
        operator: 'findOne',
        query: {id_group: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d0user'}
    }
    result = await GQuery({
        tblName: 'ly0d0session',
        operator: 'findOne',
        query: {id_group: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d0session'}
    }
    result = await GQuery({
        tblName: 'ly0d0group',
        operator: 'findOne',
        query: {_id: data._id}
    })
    const dataOld = result.data
    if(dataOld.icon && dataOld.icon.length > 0){
        await ImageSave.imageDelete({url: dataOld.icon[0]})
    }
    await GQuery({
        tblName: 'ly0d0group',
        operator: 'deleteOne',
        query: {_id: dataOld._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 获取页面初始化数据
async function getPgData(data) {
    // data: null

    const result = await GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'find',
        query: {},
        sort: {_id: -1}
    })
    const arrDataunit = result.data
    return {code: 0, message: "",
        data: {
            arrDataunit
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
