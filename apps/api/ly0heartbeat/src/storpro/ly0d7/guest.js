import {GQuery} from '../../main/GQuery.js'
import {GBT} from '@yoooloo42/blindboxes'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {},
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
function find(data) {
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

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
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

        Promise.all([
            GQuery({
                tblName: 'ly0d7guest',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: 'ly0d7guest',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({
                data: result [0].data,
                count: result [1].count
            })
        })
    })
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
function insertOne(data) {
    // data.id_dataunit
    // data.name
    // data.gbt2260code
    // data.address
    // data.tel
    // data.postal

    return new Promise((resolve, reject) => {
        // 提交约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }
        // 提交
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {_id: data.id_dataunit}
        }).then(result=>{
            let objDataunit = result.data
            let gbt2260 = GBT.gbt2260code6.find(i=>{
                return i.code6 === data.gbt2260code
            })
            GQuery({
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
            }).then(result => {
                resolve({
                    code: 0, message: '新增成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 查询一条记录
function findOne(data) {
    // data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d7guest',
            operator: 'findOne',
            query: {_id: data._id},
        }).then(result => {
            resolve({code: 0, message: "",
                doc: result.data
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_dataunit
    // data.name
    // data.gbt2260code
    // data.address
    // data.tel
    // data.postal

    return new Promise((resolve, reject) => {
        // 提交约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message)
        }
        // 提交
        GQuery({
            tblName: "ly0d0dataunit",
            operator: "findOne",
            query: {_id: data.id_dataunit}
        }).then(result=>{
            let objDataunit = result.data
            let gbt2260 = GBT.gbt2260code6.find(i=>{
                return i.code6 === data.gbt2260code
            })
            GQuery({
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
            }).then(() => {
                resolve({code: 0, message: '修改成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    let _id = data._id

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d0session',
            operator: 'findOne',
            query: {id_user: _id}
        }).then(result => {
            if (result.data) {
                return resolve({code: 1, message: '不能删除，存在关联信息：ly0d0session'})
            }

            GQuery({
                tblName: 'ly0d7guest',
                operator: 'deleteOne',
                query: {_id}
            }).then(() => {
                resolve({code: 0, message: '删除成功'})
            })
        })
    })
}

export default {
    find,
    insertOne,
    findOne,
    updateOne,
    deleteOne
}
