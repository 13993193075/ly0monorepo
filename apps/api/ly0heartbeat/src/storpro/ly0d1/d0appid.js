import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.note) { // 备注 模糊匹配
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    // 用于本站微信登录
    if (data0.with_thiswebsite_login === "true") {
        data1.with_thiswebsite_login = true
    } else if (data0.with_thiswebsite_login === "false") {
        data1.with_thiswebsite_login = false
    }

    // 用于系统年费
    if (data0.with_annual === "true") {
        data1.with_annual = true
    } else if (data0.with_annual === "false") {
        data1.with_annual = false
    }

    return data1
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.note
    // data.query.with_thiswebsite_login
    // data.query.with_annual
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    return new Promise((resolve, reject) => {
        let query = queryRevise(data.query) // 查询修正
        //  排序
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

        Promise.all([
            GQuery({
                tblName: "ly0d1d0appid",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: "ly0d1d0appid",
                operator: "countDocuments",
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
function dataRule(data) {
    // 不能提交
    if (!data.appid) {
        return {code: 1, message: "应用ID：必填项"}
    }
    if (!data.secret) {
        return {code: 1, message: "应用密钥：必填项"}
    }
    return {code: 0, message: "可以提交"};
}

// 插入一条记录
function insertOne(data) {
    // data.appid
    // data.secret
    // data.note
    // data.with_thiswebsite_login
    // data.with_annual

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d1d0appid",
            operator: "insertOne",
            update: {
                appid: data.appid,
                secret: data.secret,
                note: data.note ? data.note : null,
                with_thiswebsite_login: data.with_thiswebsite_login === true || data.with_thiswebsite_login === "true",
                with_annual: data.with_annual === true || data.with_annual === "true"
        }
        }).then(result => {
            resolve({code: 0, message: "插入一条记录成功",
                _id: result.dataNew._id
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data.appid
    // data.secret
    // data.note
    // data.with_thiswebsite_login
    // data.with_annual

    return new Promise((resolve, reject) => {
        let message = dataRule(data); // 提交约束
        if (message.code === 1) {
            return resolve(message);
        }

        GQuery({
            tblName: "ly0d1d0appid",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                appid: data.appid,
                secret: data.secret,
                note: data.note ? data.note : null,
                with_thiswebsite_login: data.with_thiswebsite_login === true || data.with_thiswebsite_login === "true",
                with_annual: data.with_annual === true || data.with_annual === "true"
            }
        }).then(() => {
            resolve({code: 0, message: "修改一条记录成功"})
        })
    })
}

// 删除一条记录
function deleteOne(data) {
    // data._id

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d1d0appid",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除一条记录成功"})
        })
    })
}

// 获取更多appid凭据信息
function getAppidMore (data) {
    // data.appid

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d1d0appid',
            operator: 'findOne',
            query: {appid: data.appid}
        }).then(result => {
            if (!result.data) {
                return resolve({code: 1, message: '获取更多appid凭据信息失败'})
            }
            resolve({code: 0, message: '获取更多appid凭据信息成功',
                objAppid: result.data
            })
        })
    })
}

function withThiswebsiteLogin(data) { // 用于本站微信登录
    // data._id
    // data.with_thiswebsite_login

    return new Promise((resolve, reject) => {
        // 排他性处理
        GQuery({
            tblName: "ly0d1d0appid",
            operator: "updateMany",
            query: {with_thiswebsite_login: true},
            update: {with_thiswebsite_login: false}
        }).then(() => {
            GQuery({
                tblName: "ly0d1d0appid",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    $set: {
                        with_thiswebsite_login: data.with_thiswebsite_login === true || data.with_thiswebsite_login === "true"
                    }
                }
            }).then(() => {
                resolve({code: 0, message: "修改成功"})
            })
        })
    })
}

function withAnnual(data) { // 用于系统年费
    // data._id
    // data.with_annual

    return new Promise((resolve, reject) => {
        // 排他性处理
        GQuery({
            tblName: "ly0d1d0appid",
            operator: "updateMany",
            query: {with_annual: true},
            update: {with_annual: false}
        }).then(() => {
            GQuery({
                tblName: "ly0d1d0appid",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    $set: {
                        with_annual: data.with_annual === true || data.with_annual === "true"
                    }
                }
            }).then(() => {
                resolve({code: 0, message: "修改成功"})
            })
        })
    })
}

// 获取用于本站微信登录的appid凭据信息
function getAppidWithThiswebsiteLogin (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d1d0appid',
            operator: 'findOne',
            query: {with_thiswebsite_login: 'true'}
        }).then(result => {
            if (!result.data) {
                return resolve({code: 1, message: '获取appid失败'})
            }

            resolve({code: 0, message: '获取appid成功',
                objAppid: result.data
            })
        })
    })
}

// 获取用于系统年费的appid凭据信息
function getAppidWithAnnual (data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d1d0appid',
            operator: 'findOne',
            query: {with_annual: 'true'}
        }).then(result => {
            if (!result.data) {
                return resolve({code: 1, message: '获取appid失败'})
            }

            resolve({code: 0, message: '获取appid成功',
                objAppid: result.data
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    getAppidMore,
    withThiswebsiteLogin,
    withAnnual,
    getAppidWithThiswebsiteLogin,
    getAppidWithAnnual
}
