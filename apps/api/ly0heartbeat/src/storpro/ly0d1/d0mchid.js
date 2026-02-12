import {FileDB} from '@yoooloo42/ihavebacking'
import {imageDomain, upload} from '../../main/config.js'
import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise (data) {
    let data0 = data ? data : {},
        data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.note) { // 备注 模糊匹配
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    // 用于系统年费
    if (data0.with_annual === true || data0.with_annual === "true") {
        data1.with_annual = true
    } else if (data0.with_annual === false || data0.with_annual === "false") {
        data1.with_annual = false
    }

    return data1
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.mchid) {
        return {code: 1, message: 'MCHID：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 分页查询
function find (data) {
    // data.query
    // data.query._id
    // data.query.note
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
                tblName: 'ly0d1d0mchid',
                operator: 'find',
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit)
            }),
            GQuery({
                tblName: 'ly0d1d0mchid',
                operator: 'countDocuments',
                query
            })
        ]).then(result => {
            resolve({code: 0, message: '',
                data: result [0].data.map(i=>{
                    return Object.assign(i, {
                        private_key_url: [i.private_key_url && i.private_key_url.length > 0 ? imageDomain.domain + i.private_key_url[0] : '']
                    })
                }),
                total: result [1].count
            })
        })
    })
}

// 插入一条记录
function insertOne (data) {
    // data.mchid
    // data.v2apikey
    // data.v3apikey
    // data.serial_no
    // data.private_key_url
    // data.with_annual
    // data.note
    const data_private_key_url = []
    data.private_key_url.forEach(i=>{
        try{
            data_private_key_url.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }
        // 读取私钥文件内容
        FileDB.utf8.readFileAsync(
            upload.uploadFolder + data_private_key_url[0].slice(upload.uploadUrl.length)
        ).then(res=>{
            GQuery({
                tblName: 'ly0d1d0mchid',
                operator: 'insertOne',
                update: {
                    mchid: data.mchid,
                    v2apikey: data.v2apikey ? data.v2apikey : "",
                    v3apikey: data.v3apikey ? data.v3apikey : "",
                    serial_no: data.serial_no ? data.serial_no : "",
                    private_key: data.private_key_url ? res.data : "",
                    note: data.note ? data.note : '',
                    with_annual: data.with_annual === true || data.with_annual === "true"
                }
            }).then(result => {
                return resolve({code: 0, message: '插入一条记录成功',
                    _id: result.dataNew._id
                })
            })
        })
    })
}

// 修改一条记录
function updateOne (data) { // 修改：数据提交
    // data._id
    // data.mchid
    // data.v2apikey
    // data.v3apikey
    // data.serial_no
    // data.note
    // data.private_key_url
    // data.with_annual
    const data_private_key_url = []
    data.private_key_url.forEach(i=>{
        try{
            data_private_key_url.push(new URL(i).pathname)
        }catch (err) {
        }
    })

    console.log('测试 000', data);

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }
        // 读取私钥文件内容
        FileDB.utf8.readFileAsync(
            upload.uploadFolder + data_private_key_url[0].slice(upload.uploadUrl.length)
        ).then(res=>{
            GQuery({
                tblName: 'ly0d1d0mchid',
                operator: 'updateOne',
                query: {_id: data._id},
                update: {
                    mchid: data.mchid,
                    v2apikey: data.v2apikey ? data.v2apikey : "",
                    v3apikey: data.v3apikey ? data.v3apikey : "",
                    serial_no: data.serial_no ? data.serial_no : "",
                    private_key: data.private_key_url ? res.data : "",
                    note: data.note ? data.note : '',
                    with_annual: data.with_annual === true || data.with_annual === "true"
                }
            }).then(() => {
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
            tblName: 'ly0d1d0mchid',
            operator: 'deleteOne',
            query: {_id}
        }).then(() => {
            resolve({code: 0, message: '删除一条记录成功'})
        })
    })
}

// 获取更多商户应用凭据(MCHID)信息
function getMchidMore(data){
    let mchid = data.mchid;

    return new Promise(function(resolve, reject){
        GQuery({
            tblName: "ly0d1d0mchid",
            operator: "findOne",
            query: {mchid}
        }).then(result=>{
            let objMchid = JSON.parse(JSON.stringify(result.data));
            if(! objMchid){
                return resolve({code: 1, message: "获取更多商户应用凭据(MCHID)信息失败"});
            }

            return resolve({
                code: 0, message: "获取更多商户应用凭据(MCHID)信息成功",
                objMchid: {
                    mchid,
                    v2apikey: objMchid.v2apikey ? objMchid.v2apikey : "",
                    v3apikey: objMchid.v3apikey ? objMchid.v3apikey : "",
                    serial_no: objMchid.serial_no ? objMchid.serial_no : "",
                    private_key: objMchid.private_key ? objMchid.private_key : ""
                }
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
            tblName: "ly0d1d0mchid",
            operator: "updateMany",
            query: {with_annual: true},
            update: {with_annual: false}
        }).then(() => {
            GQuery({
                tblName: "ly0d1d0mchid",
                operator: "updateOne",
                query: {_id: data._id},
                update: {
                    $set: {
                        with_annual: data.with_annual === "true"
                    }
                }
            }).then(() => {
                resolve({code: 0, message: "修改成功"})
            })
        })
    })
}

// 获取用于系统年费的商户号
function getMchidWithAnnual(data) {
    // data: null

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: "ly0d1d0mchid",
            operator: "findOne",
            query: {with_annual: "true"}
        }).then(result => {
            let objMchid = JSON.parse(JSON.stringify(result.data));
            if(! objMchid){
                return resolve({code: 1, message: "获取商户号失败"});
            }

            return resolve({
                code: 0, message: "获取商户号成功",
                objMchid: {
                    mchid: objMchid.mchid,
                    v2apikey: objMchid.v2apikey ? objMchid.v2apikey : "",
                    v3apikey: objMchid.v3apikey ? objMchid.v3apikey : "",
                    serial_no: objMchid.serial_no ? objMchid.serial_no : "",
                    private_key: objMchid.private_key ? objMchid.private_key : ""
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
    getMchidMore,
    withAnnual,
    getMchidWithAnnual
}
