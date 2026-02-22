import {GQuery} from '../../main/GQuery.js'
import {GBT} from 'packages/ly0utils/src/index.js'

// 内部模块：查询修正
function queryRevise(data) {
    const data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return (data1)
    }

    // 数据单元
    data1.id_dataunit = data0.id_dataunit
    // 用户名称 模糊匹配
    if (data0.name) {
        data1.name = {'$regex': `.*${data0.name}.*`}
    }
    // 国内行政区划 左匹配
    let str = ""
    if (data0.gbt2260code) {
        if (data0.gbt2260code.endsWith("0000")) {
            str = data0.gbt2260code.slice(0, 2)
            data1.gbt2260code = {'$regex': `^${str}`}
        } else if (data0.gbt2260code.endsWith("00")) {
            str = data0.gbt2260code.slice(0, 4)
            data1.gbt2260code = {'$regex': `^${str}`}
        } else {
            data1.gbt2260code = data0.gbt2260code
        }
    }
    // 详细地址 模糊匹配
    if (data0.address) {
        data1.address = {'$regex': `.*${data0.address}.*`}
    }
    // 联系电话 模糊匹配
    if (data0.tel) {
        data1.tel = {'$regex': `.*${data0.tel}.*`}
    }

    return data1
}

// 分页查询
async function find(data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit
    // data.query.name
    // data.query.gbt2260code
    // data.query.address
    // data.query.tel
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
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
        sort['_id'] = -1
    }

    const resultData = await GQuery({
        tblName: 'ly0d7guest',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await GQuery({
        tblName: 'ly0d7guest',
        operator: 'countDocuments',
        query
    })
    return {
        data: resultData.data,
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule(data) {
    if (!data.id_dataunit) {
        return {code: 1, message: '数据单元：必选项'}
    }
    if (!data.name) {
        return {code: 1, message: '用户名称：必填项'}
    }
    if (!data.gbt2260code) {
        return {code: 1, message: '国内行政区划：必选项'}
    }
    if (!data.address) {
        return {code: 1, message: '详细地址：必填项'}
    }
    if (!data.tel) {
        return {code: 1, message: '联系电话：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 新增一条记录
async function insertOne(data) {
    // data.id_dataunit
    // data.name
    // data.gbt2260code
    // data.address
    // data.tel
    // data.postal

    // 提交约束
    const message = dataRule(data)
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
    const gbt2260 = GBT.gbt2260code6.find(i=>{
        return i.code6 === data.gbt2260code
    })
    result = await GQuery({
        tblName: 'ly0d7guest',
        operator: 'insertOne',
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            gbt2260code: data.gbt2260code,
            gbt2260text: gbt2260.text2 + "-" + gbt2260.text4 + "-" + gbt2260.text6,
            address: data.address,
            tel: data.tel,
            postal: data.postal && data.postal.length > 0 ? data.postal : []
        }
    })
    return {code: 0, message: '新增一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne(data) {
    // data._id
    // data.id_dataunit
    // data.name
    // data.gbt2260code
    // data.address
    // data.tel
    // data.postal

    // 提交约束
    const message = dataRule(data)
    if (message.code === 1) {
        return message
    }
    // 提交
    const result= await GQuery({
        tblName: "ly0d0dataunit",
        operator: "findOne",
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data
    const gbt2260 = GBT.gbt2260code6.find(i=>{
        return i.code6 === data.gbt2260code
    })
    await GQuery({
        tblName: 'ly0d7guest',
        operator: 'updateOne',
        query: {_id: data._id},
        update: {
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,
            name: data.name,
            gbt2260code: data.gbt2260code,
            gbt2260text: gbt2260.text2 + "-" + gbt2260.text4 + "-" + gbt2260.text6,
            address: data.address,
            tel: data.tel,
            postal: data.postal && data.postal.length > 0 ? data.postal : []
        }
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne({_id}) {
    const result = await GQuery({
        tblName: 'ly0d0session',
        operator: 'findOne',
        query: {id_user: _id}
    })
    if (result.data) {
        return {code: 1, message: '不能删除，存在关联信息：ly0d0session'}
    }

    await GQuery({
        tblName: 'ly0d7guest',
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
