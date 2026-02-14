import {GQuery} from '../../main/GQuery.js'
import ly0d2code from "../ly0d2/code.js"

// 内部模块：查询修正
function queryRevise (data) {
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

    return data1
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.id_dataunit
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
                tblName: 'ly0d0annual',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: 'ly0d0annual',
                operator: 'countDocuments',
                query
            })
        ]).then(function (result) {
            resolve({code: 0, message: '',
                data: result [0].data,
                total: result [1].count
            })
        })
    })
}

// 内部模块：数据约束
function dataRule (data) {
    if (!data.id_dataunit) {
        return {code: 1, message: '数据单元：必选项'}
    }
    if(!data.from){
        return {code: 1, message: '起始日期：必填项'}
    }
    if(!data.to){
        return {code: 1, message: '截止日期：必填项'}
    }
    if (!(data.fee >= 0)) {
        return {code: 1, message: '年费金额：必填项，大于等于零'}
    }
    if (!data.status_code) {
        return {code: 1, message: '支付状态：必选项'}
    }

    return {code: 0,message: '可以提交'}
}

// 插入一条记录
function insertOne (data) {
    // data.id_dataunit
    // data.fee
    // data.from
    // data.to
    // data.status_code

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }
        // 数据提交
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d0annual',
                operator: 'insertOne',
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    from: new Date(data.from),
                    to: new Date(data.to),
                    fee: data.fee,
                    status_code: data.status_code,
                    status_text: ly0d2code.paymentStatus.find(i=>{
                        return i.code === data.status_code
                    }).text
                }
            }).then(result => {
                resolve({code: 0, message: '插入一条记录成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) {
    // data._id
    // data.id_dataunit
    // data.fee
    // data.from
    // data.to
    // data.status_code

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'findOne',
            query: {_id: data.id_dataunit}
        }).then(result => {
            let objDataunit = result.data
            GQuery({
                tblName: 'ly0d0annual',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    id_dataunit: objDataunit._id,
                    dataunit_name: objDataunit.name,
                    from: new Date(data.from),
                    to: new Date(data.to),
                    fee: data.fee,
                    status_code: data.status_code,
                    status_text: ly0d2code.paymentStatus.find(i=>{
                        return i.code === data.status_code
                    }).text
                }
            }).then(result => {
                resolve({code: 0, message: '修改一条记录成功'})
            })
        })
    })
}

// 删除一条记录
function deleteOne (data) {
    let _id = data._id
    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d0annual',
            operator: 'deleteOne',
            query: {_id}
        }).then(result => {
            resolve({code: 0, message: '删除一条记录成功'})
        })
    })
}

// 获取页面初始化数据
function getPgData (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d0dataunit',
            operator: 'find',
            query: {},
            sort: {_id: -1}
        }).then(result => {
            resolve({code: 0 , message: "",
                data: {
                    arrDataunit: result.data,
                    arrPaymentStatus: ly0d2code.paymentStatus
                }
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getPgData
}
