import {crypto} from '@yoooloo42/ly0nodejs'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
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
    // 用户组
    if (data0.id_group) {
        data1.id_group = data0.id_group
    }
    // 用户名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit
    // data.query.id_group
    // data.query.name
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

    const resultData = await GQuery({
        tblName: 'ly0d0user',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d0user',
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
    if (!data.id_group) {
        return {code: 1, message: '用户组：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '用户名称：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 新增一条记录
async function insertOne(data) {
    // data.id_group
    // data.name
    // data.icon
    const data_icon = []
    data.icon.forEach(i=>{
        try{
            data_icon.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    // 提交约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }
    // 提交
    let result = await GQuery({
        tblName: "ly0d0group",
        operator: "findOne",
        query: {_id: data.id_group}
    })
    const objGroup = result.data
    result = await GQuery({
        tblName: 'ly0d0user',
        operator: 'insertOne',
        update: {
            id_dataunit: objGroup.id_dataunit,
            dataunit_name: objGroup.name,
            id_group: objGroup._id,
            group_name: objGroup.name,
            name: data.name
        }
    })
    const dataNew = result.dataNew
    if(data_icon.length > 0){
        const icon = await ImageSave.imageAppend({
            uploaded: data_icon[0],
            dataunitId: objGroup.id_dataunit,
            tblName: 'ly0d0user',
            fieldName: 'icon',
            dataId: dataNew._id
        })
        await GQuery({
            tblName: 'ly0d0user',
            operator: 'updateOne',
            query: {_id: dataNew._id},
            update: {icon: icon ? [icon] : []}
        })
    }
    return {code: 0, message: '插入一条记录成功',
        _id: dataNew._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_group
    // data.name
    // data.icon
    const data_icon = []
    data.icon.forEach(i=>{
        try{
            data_icon.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    // 提交约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }
    // 提交
    let result = await GQuery({
        tblName: "ly0d0group",
        operator: "findOne",
        query: {_id: data.id_group}
    })
    const objGroup = result.data
    let upd = {
        id_dataunit: objGroup.id_dataunit,
        dataunit_name: objGroup.dataunit_name,
        id_group: objGroup._id,
        group_name: objGroup.name,
        name: data.name,
    }
    if(data_icon.length > 0){
        result = await GQuery({
            tblName: 'ly0d0user',
            operator: 'findOne',
            query: {_id: data._id}
        })
        const dataOld = result.data
        // 图片处理
        const icon = await ImageSave.imageUpdate({
            uploaded: data_icon[0],
            old: dataOld.icon && dataOld.icon.length > 0 ? dataOld.icon[0] : '',
            dataunitId: objGroup.id_dataunit,
            tblName: 'ly0d0user',
            fieldName: 'icon',
            dataId: dataOld._id,
        })
        upd.icon = [icon]
    }
    await GQuery({
        tblName: 'ly0d0user',
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
        tblName: 'ly0d0session',
        operator: 'findOne',
        query: {id_user: data._id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d0session'}
    }
    result = await GQuery({
        tblName: 'ly0d0user',
        operator: 'findOne',
        query: {_id: data._id}
    })
    const dataOld = result.data
    if(dataOld.icon && dataOld.icon.length > 0){
        await ImageSave.imageDelete({url: dataOld.icon[0]})
    }
    await GQuery({
        tblName: 'ly0d0user',
        operator: 'deleteOne',
        query: {_id: dataOld._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 获取页面初始化数据
async function getPgData(data) {
    // data: null

    let result = await GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'find',
        query: {},
        sort: {_id: -1}
    })
    const arrDataunit = result.data
    result = await GQuery({
        tblName: 'ly0d0group',
        operator: 'find',
        query: {},
        sort: {_id: -1}
    })
    const arrGroup = result.data
    return {code: 0, message: "",
        data: {
            arrDataunit,
            arrGroup
        }
    }
}

// 注册新账号
async function newLogin(data){
    // data.number
    // data.password
    // data.id_user
    // data.usertbl

    if(!data.number){
        return {code: 1, message: "没有工号"}
    }
    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 登录密码格式
    if (!ly0utils.regexp.password(data.password)) {
        return {code: 1, message: '登录密码格式错误'}
    }
    // 登录密码加密
    const passwordCipherText = crypto.Hash.sha256(data.password)
    if(!data.id_user){
        return {code: 1, message: "没有用户id"}
    }
    // 用户表名
    const usertbl = data.usertbl ? data.usertbl : "ly0d0user"

    // 判断工号是否已存在
    let result = await GQuery({
        tblName: "ly0d0number",
        operator: "findOne",
        query: {number: data.number}
    })
    const objNumber = result.data
    if(!!objNumber){
        return {code: 1, message: "工号已存在，不能注册"}
    }

    // 新建登录账号
    result = await GQuery({
        tblName: "ly0d0login",
        operator: "insertOne"
    })
    const objLogin = result.data
    // 注册新工号
    await GQuery({
        tblName: "ly0d0number",
        operator: "insertOne",
        update: {
            id_login: objLogin._id,
            number: data.number,
            password: passwordCipherText
        }
    })
    // 账号关联
    await GQuery({
        tblName: usertbl,
        operator: "updateOne",
        query: {_id: data.id_user},
        update: {
            id_login: objLogin._id
        }
    })
    return {code: 0, message: "注册新账号成功"}
}

// 注册 - 使用已有账号
async function oldLogin(data){
    // data.number
    // data.password
    // data.id_user
    // data.usertbl

    if(!data.number){
        return {code: 1, message: "没有工号"}
    }
    if(!data.password){
        return {code: 1, message: "没有登录密码"}
    }
    // 登录密码格式
    if (!ly0utils.regexp.password(data.password)) {
        return {code: 1, message: '登录密码格式错误'}
    }
    // 登录密码加密
    const passwordCipherText = crypto.Hash.sha256(data.password)
    if(!data.id_user){
        return {code: 1, message: "没有用户id"}
    }
    // 用户表名
    const usertbl = data.usertbl ? data.usertbl : "ly0d0user"

    // 判断工号是否已存在
    let result = await GQuery({
        tblName: "ly0d0number",
        operator: "findOne",
        query: {number: data.number}
    })
    const objNumber = result.data
    if(!objNumber){
        return {code: 1, message: "工号不存在，不能注册"}
    }

    if(objNumber.password !== passwordCipherText){
        return {code: 1, message: "密码错误，不能注册"}
    }

    // 账号关联
    await GQuery({
        tblName: usertbl,
        operator: "updateOne",
        query: {_id: data.id_user},
        update: {
            id_login: objNumber.id_login
        }
    })
    return {code: 0, message: "注册成功 - 使用已有账号"}
}

// 用户登录账号取关
async function id_loginSetNull(data){
    // data.id_user
    // data.usertbl

    // 用户表名
    const usertbl = data.usertbl ? data.usertbl : "ly0d0user"
    await GQuery({
        tblName: usertbl,
        operator: "updateOne",
        query: {_id: data.id_user},
        update: {
            id_login: null
        }
    })
    return {code: 0, message: "用户登录账号已取关"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData,
    newLogin,
    oldLogin,
    id_loginSetNull
}
