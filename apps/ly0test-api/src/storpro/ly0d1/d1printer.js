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

// 分页查询
async function find({data, dependencies}) {
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

    // 查询修正
    const query = queryRevise(data.query)
    //  排序
    const sort = {}
    if (data.sort && data.sort.label && data.sort.order) {
        if (data.sort.order === 'ascending') {
            sort[data.sort.label] = 1
        } else if (data.sort.order === 'descending') {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort._id = -1
    }

    const resultData = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1printer",
        operator: "find",
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit),
        populate: ["id_ukey"] // mongoose
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1printer",
        operator: "countDocuments",
        query
    })
    return {code: 0, message: '',
        data: resultData.data,
        total: resultTotal.count
    }
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

// 插入一条记录
async function insertOne({data, dependencies}) {
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

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }

    const result = await dependencies.GQuery.GQuery({
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
    })
    return {
        code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne({data, dependencies}) {
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

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }

    await dependencies.GQuery.GQuery({
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
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({data, dependencies}) {
    // data._id

    await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1printer",
        operator: "deleteOne",
        query: {_id: data._id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 注册打印机
async function register({data, dependencies}) {
    // data.id_ukey
    // data.sn
    // data.key
    // data.note
    // data.carnum

    if (!data || !data.id_ukey) {
        return {code: 1, message: "请求参数错误"}
    }

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d1ukey",
        operator: "findOne",
        query: {_id: data.id_ukey}
    })
    const objUkey = result.data
    const user = objUkey.user,
        snList = data.sn + "#"
            + data.key + "#"
            + (data.note ? data.note : "") + "#"
            + (data.carnum ? data.carnum : "")
    result = await dependencies.ly0nodejs.Feie.Open_printerAddlist({user, ukey: objUkey.ukey, snList})
    const code = result.code === 0 ? 0 : 1,
        message = result.code === 0 ? "注册打印机成功" : "注册打印机失败"
    return {code, message}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    register
}
