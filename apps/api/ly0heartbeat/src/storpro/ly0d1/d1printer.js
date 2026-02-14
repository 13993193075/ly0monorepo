import {Feie} from 'packages/ly0libs'
import {GQuery} from '../../main/GQuery.js'

// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }

    if (data0.id_ukey) { // 开发者账号 模糊匹配
        data1.id_ukey = {'$regex': `.*${data0.id_ukey}.*`}
    }

    if (data0.ukey_note) { // 开发者账号备注 模糊匹配
        data1.ukey_note = {'$regex': `.*${data0.ukey_note}.*`}
    }

    if (data0.sn) { // 打印机厂商识别编号 模糊匹配
        data1.sn = {'$regex': `.*${data0.sn}.*`}
    }

    if (data0.key) { // 打印机厂商识别密钥 模糊匹配
        data1.key = {'$regex': `.*${data0.key}.*`}
    }

    if (data0.note) { // 备注（注册使用） 模糊匹配
        data1.note = {'$regex': `.*${data0.note}.*`}
    }

    if (data0.carnum) { // 流量卡号码 模糊匹配
        data1.carnum = {'$regex': `.*${data0.carnum}.*`}
    }

    if (data0.id_dataunit) { // 数据单元._id，模糊匹配
        data1.id_dataunit = {'$regex': `.*${data0.id_dataunit}.*`}
    }

    if (data0.dataunit_name) { // 数据单元.名称 模糊匹配
        data1.dataunit_name = {'$regex': `.*${data0.dataunit_name}.*`}
    }

    if (data0.busiunit_tblName) { // 业务单位.数据库表名 模糊匹配
        data1.busiunit_tblName = {'$regex': `.*${data0.busiunit_tblName}.*`}
    }

    if (data0.id_busiunit) { // 业务单位._id，模糊匹配
        data1.id_busiunit = {'$regex': `.*${data0.id_busiunit}.*`}
    }

    if (data0.busiunit_name) { // 业务单位.名称 模糊匹配
        data1.busiunit_name = {'$regex': `.*${data0.busiunit_name}.*`}
    }

    if (data0.printername) { // 打印机名称 模糊匹配
        data1.printername = {'$regex': `.*${data0.printername}.*`}
    }

    if (data0.scene) { // 使用场景 模糊匹配
        data1.scene = {'$regex': `.*${data0.scene}.*`}
    }

    if (data0.sceneNote) { // 使用场景备注 模糊匹配
        data1.sceneNote = {'$regex': `.*${data0.sceneNote}.*`}
    }

    return data1
}

// 内部模块：数据约束
function dataRule(data) {
    // 不能提交
    if (!data.sn) {
        return {code: 1, message: "打印机厂商识别编号：必填项"}
    }
    if (!data.key) {
        return {code: 1, message: "打印机厂商识别密钥：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 分页查询
function find(data) {
    // data.query
    // data.query._id
    // data.query.id_ukey
    // data.query.ukey_note
    // data.query.sn
    // data.query.key
    // data.query.note
    // data.query.carnum
    // data.query.id_dataunit
    // data.query.dataunit_name
    // data.query.busiunit_tblName
    // data.query.id_busiunit
    // data.query.busiunit_name
    // data.query.printername
    // data.query.scene
    // data.query.sceneNote
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
                tblName: "ly0d1d1printer",
                operator: "find",
                query,
                sort,
                skip: (data.page - 1) * data.limit,
                limit: Number(data.limit),
                populate: ["id_ukey"] // mongoose
            }),
            GQuery({
                tblName: "ly0d1d1printer",
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

// 插入一条记录
function insertOne(data) {
    // data.id_ukey
    // data.ukey_note
    // data.sn
    // data.key
    // data.note
    // data.carnum
    // data.id_dataunit
    // data.dataunit_name
    // data.busiunit_tblName
    // data.id_busiunit
    // data.busiunit_name
    // data.printername
    // data.scene
    // data.sceneNote

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d1d1printer",
            operator: "insertOne",
            update: {
                id_ukey: data.id_ukey ? data.id_ukey : "",
                ukey_note: data.ukey_note ? data.ukey_note : "",
                sn: data.sn,
                key: data.key,
                note: data.note ? data.note : "",
                carnum: data.carnum ? data.carnum : "",
                id_dataunit: data.id_dataunit ? data.id_dataunit : "",
                dataunit_name: data.dataunit_name ? data.dataunit_name : "",
                busiunit_tblName: data.busiunit_tblName ? data.busiunit_tblName : "",
                id_busiunit: data.id_busiunit ? data.id_busiunit : "",
                busiunit_name: data.busiunit_name ? data.busiunit_name : "",
                printername: data.printername ? data.printername : "",
                scene: data.scene ? data.scene : "",
                sceneNote: data.sceneNote ? data.sceneNote : ""
            }
        }).then(result => {
            resolve({
                code: 0, message: "插入一条记录成功",
                _id: result.dataNew._id
            })
        })
    })
}

// 修改一条记录
function updateOne(data) {
    // data._id
    // data.id_ukey
    // data.ukey_note
    // data.sn
    // data.key
    // data.note
    // data.carnum
    // data.id_dataunit
    // data.dataunit_name
    // data.busiunit_tblName
    // data.id_busiunit
    // data.busiunit_name
    // data.printername
    // data.scene
    // data.sceneNote

    return new Promise((resolve, reject) => {
        let message = dataRule(data) // 提交约束
        if (message.code === 1) {
            return resolve(message)
        }

        GQuery({
            tblName: "ly0d1d1printer",
            operator: "updateOne",
            query: {_id: data._id},
            update: {
                id_ukey: data.id_ukey ? data.id_ukey : "",
                ukey_note: data.ukey_note ? data.ukey_note : "",
                sn: data.sn,
                key: data.key,
                note: data.note ? data.note : "",
                carnum: data.carnum ? data.carnum : "",
                id_dataunit: data.id_dataunit ? data.id_dataunit : "",
                dataunit_name: data.dataunit_name ? data.dataunit_name : "",
                busiunit_tblName: data.busiunit_tblName ? data.busiunit_tblName : "",
                id_busiunit: data.id_busiunit ? data.id_busiunit : "",
                busiunit_name: data.busiunit_name ? data.busiunit_name : "",
                printername: data.printername ? data.printername : "",
                scene: data.scene ? data.scene : "",
                sceneNote: data.sceneNote ? data.sceneNote : ""
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
            tblName: "ly0d1d1printer",
            operator: "deleteOne",
            query: {_id: data._id}
        }).then(() => {
            resolve({code: 0, message: "删除一条记录成功"})
        })
    })
}

// 注册打印机
function register(data) {
    // data.id_ukey
    // data.sn
    // data.key
    // data.note
    // data.carnum

    return new Promise((resolve, reject) => {
        if (!data || !data.id_ukey) {
            return resolve({code: 1, message: "请求参数错误"})
        }

        GQuery({
            tblName: "ly0d1d1ukey",
            operator: "findOne",
            query: {_id: data.id_ukey}
        }).then(result => {
            let objUkey = result.data
            let user = objUkey.user,
                snList = data.sn + "#"
                    + data.key + "#"
                    + (data.note ? data.note : "") + "#"
                    + (data.carnum ? data.carnum : "")
            Feie.Open_printerAddlist({user, ukey: objUkey.ukey, snList}).then(function (result) {
                let code = result.code === 0 ? 0 : 1,
                    message = result.code === 0 ? "注册打印机成功" : "注册打印机失败"
                resolve({code, message})
            })
        })
    })
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    register
}
