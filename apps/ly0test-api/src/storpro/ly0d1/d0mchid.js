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

// 分页查询
async function find ({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.note
    // data.query.with_annual
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    const query = queryRevise(data.query) // 查询修正
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
        tblName: 'ly0d1d0mchid',
        operator: 'find',
        query,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resultTotal = await dependencies.GQuery.GQuery({
        tblName: 'ly0d1d0mchid',
        operator: 'countDocuments',
        query
    })
    return {code: 0, message: '',
        data: resultData.data.map(i=>{
            return Object.assign(i, {
                private_key_url: [i.private_key_url && i.private_key_url.length > 0 ? dependencies.config.imageDomain.domain + i.private_key_url[0] : '']
            })
        }),
        total: resultTotal.count
    }
}

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (!data.mchid) {
        return {code: 1, message: 'MCHID：必填项'}
    }
    return {code: 0, message: '可以提交'}
}

// 插入一条记录
async function insertOne ({data, dependencies}) {
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

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }
    // 读取私钥文件内容
    const res = await dependencies.ly0nodejs.FileDB.utf8.readFileAsync(
        dependencies.config.upload.uploadFolder +
            data_private_key_url[0].slice(dependencies.config.upload.uploadUrl.length)
    )
    const result = await dependencies.GQuery.GQuery({
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
    })
    return {code: 0, message: '插入一条记录成功',
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne ({data, dependencies}) { // 修改：数据提交
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

    const message = dataRule(data) // 提交约束
    if (message.code === 1) {
        return message
    }
    // 读取私钥文件内容
    const res = await dependencies.ly0nodejs.FileDB.utf8.readFileAsync(
        dependencies.config.upload.uploadFolder +
        data_private_key_url[0].slice(dependencies.config.upload.uploadUrl.length)
    )
    await dependencies.GQuery.GQuery({
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
    })
    return {code: 0, message: '修改一条记录成功'}
}

// 删除一条记录
async function deleteOne ({data, dependencies}) {
    // data._id

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d1d0mchid',
        operator: 'deleteOne',
        query: {_id: data._id}
    })
    return {code: 0, message: '删除一条记录成功'}
}

// 获取更多商户应用凭据(MCHID)信息
async function getMchidMore({data, dependencies}) {
    // data.mchid

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d0mchid",
        operator: "findOne",
        query: {mchid: data.mchid}
    })
    const objMchid = result.data
    if(! objMchid){
        return {code: 1, message: "获取更多商户应用凭据(MCHID)信息失败"}
    }

    return {code: 0, message: "获取更多商户应用凭据(MCHID)信息成功",
        objMchid: {
            mchid: data.mchid,
            v2apikey: objMchid.v2apikey || "",
            v3apikey: objMchid.v3apikey || "",
            serial_no: objMchid.serial_no || "",
            private_key: objMchid.private_key || ""
        }
    }
}

async function withAnnual({data, dependencies}) { // 用于系统年费
    // data._id
    // data.with_annual

    // 排他性处理
    await dependencies.GQuery.GQuery({
        tblName: "ly0d1d0mchid",
        operator: "updateMany",
        query: {with_annual: true},
        update: {with_annual: false}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d1d0mchid",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            $set: {
                with_annual: data.with_annual === "true"
            }
        }
    })
    return {code: 0, message: "修改成功"}
}

// 获取用于系统年费的商户号
async function getMchidWithAnnual({data, dependencies}) {
    // data: null

    const result = await dependencies.GQuery.GQuery({
        tblName: "ly0d1d0mchid",
        operator: "findOne",
        query: {with_annual: "true"}
    })
    const objMchid = result.data
    if(! objMchid){
        return {code: 1, message: "获取商户号失败"}
    }

    return {
        code: 0, message: "获取商户号成功",
        objMchid: {
            mchid: objMchid.mchid,
            v2apikey: objMchid.v2apikey || "",
            v3apikey: objMchid.v3apikey || "",
            serial_no: objMchid.serial_no || "",
            private_key: objMchid.private_key || ""
        }
    }
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
