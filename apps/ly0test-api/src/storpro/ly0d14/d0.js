// 内部模块：查询修正
function queryRevise(data) {
    let data0 = data ? data : {}, data1 = {}
    if (data0._id) {
        data1._id = data0._id
        return data1
    }
    data1.id_dataunit = data.id_dataunit

    // 数据采样时间
    if (data0.time_start || data0.time_end) {
        data1.time_create = {}
        if (data0.time_start) {
            data1.time_create.$gte = data0.time_start
        }
        if (data0.time_end) {
            data1.time_create.$lte = data0.time_end
        }
    }
    // 姓名 模糊匹配
    if (data0.f0name) {
        data1.f0name = {'$regex': `.*${data0.f0name}.*`}
    }
    // 出生日期
    if (data0.f0birthdate_start || data0.f0birthdate_end) {
        data1.f0birthdate = {}
        if (data0.f0birthdate_start) {
            data1.f0birthdate.$gte = data0.f0birthdate_start
        }
        if (data0.f0birthdate_end) {
            data1.f0birthdate.$lte = data0.f0birthdate_end
        }
    }
    // 身份证号码
    if (data0.f0idnumber) {
        data1.f0idnumber = data0.f0idnumber
    }
    // 民族
    if (data0.f0nation_code) {
        data1.f0nation_code = data0.f0nation_code
    }
    // 籍贯 左匹配
    let str = ""
    if (data0.f0nativeplace_code) {
        if (data0.f0nativeplace_code.endsWith("0000")) {
            str = data0.f0nativeplace_code.slice(0, 2)
            data1.f0nativeplace_code = {'$regex': `^${str}`}
        } else if (data0.f0nativeplace_code.endsWith("00")) {
            str = data0.f0nativeplace_code.slice(0, 4)
            data1.f0nativeplace_code = {'$regex': `^${str}`}
        } else {
            data1.f0nativeplace_code = data0.f0nativeplace_code
        }
    }
    // 文化程度
    if (data0.f0education_code) {
        data1.f0education_code = data0.f0education_code
    }
    // 职业
    if (data0.f0occupation_code) {
        data1.f0occupation_code = data0.f0occupation_code
    }
    // 医保
    if (data0.f0insurance_code) {
        data1.f0insurance_code = data0.f0insurance_code
    }
    // 家庭人均月收入
    if (data0.f0income_code) {
        data1.f0income_code = data0.f0income_code
    }
    // 家庭住址 左匹配
    str = ""
    if (data0.f0address_code) {
        if (data0.f0address_code.endsWith("0000")) {
            str = data0.f0address_code.slice(0, 2)
            data1.f0address_code = {'$regex': `^${str}`}
        } else if (data0.f0address_code.endsWith("00")) {
            str = data0.f0address_code.slice(0, 4)
            data1.f0address_code = {'$regex': `^${str}`}
        } else {
            data1.f0address_code = data0.f0address_code
        }
    }
    // 手机号
    if (data0.f0cellphone) {
        data1.f0cellphone = data0.f0cellphone
    }

    return data1
}

// 分页查询
async function find({data, dependencies}) {
    // data.query
    // data.query._id
    // data.query.id_dataunit 当前用户信息：数据单元
    // data.query.time_start
    // data.query.time_end
    // data.query.f0name
    // data.query.f0birthdate_start
    // data.query.f0birthdate_end
    // data.query.f0idnumber
    // data.query.f0nation_code
    // data.query.f0nativeplace_code
    // data.query.f0education_code
    // data.query.f0occupation_code
    // data.query.f0insurance_code
    // data.query.f0income_code
    // data.query.f0address_code
    // data.query.f0cellphone
    // data.sort.label
    // data.sort.order
    // data.limit
    // data.page

    // 查询修正
    const q = queryRevise(data.query)
    // 排序
    const sort = {}
    if (data.sort && data.sort.label && data.sort.order) {
        if (data.sort.order === "ascending") {
            sort[data.sort.label] = 1
        } else if (data.sort.order === "descending") {
            sort[data.sort.label] = -1
        } else {
            sort[data.sort.label] = 1
        }
    } else {
        sort._id = -1
    }

    const resData = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "find",
        query: q,
        sort,
        skip: (data.page - 1) * data.limit,
        limit: Number(data.limit)
    })
    const resTotal = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "countDocuments",
        query: q
    })
    return {code: 0, message: '',
        data: resData.data,
        total: resTotal.count
    }
}

// 内部模块：数据约束
function dataRule(data) {
    if (!data.f0name) {
        return {code: 1, message: "姓名：必填项"}
    }
    return {code: 0, message: "可以提交"}
}

// 插入一条记录
async function insertOne({data, dependencies, storproRun}) {
    // data.id_dataunit 当前用户信息：数据单元
    // data.f0name
    // data.f0birthdate
    // data.f0idnumber
    // data.f0nation_code
    // data.f0nativeplace_code
    // data.f0education_code
    // data.f0occupation_code
    // data.f0insurance_code
    // data.f0income_code
    // data.f0address_code
    // data.f0cellphone

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'findOne',
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data

    let f0nativeplace = ''
    if(data.f0nativeplace_code){
        result = await storproRun({
            storproName: 'ly0d3.gbt2260code6',
            data: {code6: data.f0nativeplace_code}
        })
        f0nativeplace = result.itemCode6
    }
    let f0address = ''
    if(data.f0address_code){
        result = await storproRun({
            storproName: 'ly0d3.gbt2260code6',
            data: {code6: data.f0address_code}
        })
        f0address = result.itemCode6
    }

    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,

            f0name: data.f0name,
            f0birthdate: data.f0birthdate || null,
            f0idnumber: data.f0idnumber || "",
            f0nation_code: data.f0nation_code || "",
            // 民族
            f0nation: data.f0nation_code
                ? dependencies.ly0utils.GBT.gbt3304.find(i=>{
                    return i.code === data.f0nation_code
                }).text : "",
            f0nativeplace_code: data.f0nativeplace_code || "",
            f0nativeplace,
            f0education_code: data.f0education_code || "",
            f0education: data.f0education_code
                ? dependencies.ly0utils.GBT.gbt4658.find(i=>{
                    return i.code === data.f0education_code
                }).text : "",
            f0occupation_code: data.f0occupation_code || "",
            f0occupation: data.f0occupation_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0occupation.find(i=>{
                    return i.code === data.f0occupation_code
                }).text : "",
            f0insurance_code: data.f0insurance_code || "",
            f0insurance: data.f0insurance_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0insurance.find(i=>{
                    return i.code === data.f0insurance_code
                }).text : "",
            f0income_code: data.f0income_code || "",
            f0income: data.f0income_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0income.find(i=>{
                    return i.code === data.f0income_code
                }).text : "",
            f0address_code: data.f0address_code || "",
            f0address,
            f0cellphone: data.f0cellphone || ""
        }
    })
    return {code: 0, message: "插入一条记录成功",
        _id: result.dataNew._id
    }
}

// 修改一条记录
async function updateOne({data, dependencies, storproRun}) {
    // data._id
    // data.id_dataunit 当前用户信息：数据单元
    // data.f0name
    // data.f0birthdate
    // data.f0idnumber
    // data.f0nation_code
    // data.f0nativeplace_code
    // data.f0education_code
    // data.f0occupation_code
    // data.f0insurance_code
    // data.f0income_code
    // data.f0address_code
    // data.f0cellphone

    // 数据约束
    let result = dataRule(data);
    if (result.code === 1) {
        return result
    }

    // 提交
    const thisTime = new Date()
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d0dataunit',
        operator: 'findOne',
        query: {_id: data.id_dataunit}
    })
    const objDataunit = result.data

    let f0nativeplace = ''
    if(data.f0nativeplace_code){
        result = await storproRun({
            storproName: 'ly0d3.gbt2260code6',
            data: {code6: data.f0nativeplace_code}
        })
        f0nativeplace = result.itemCode6
    }
    let f0address = ''
    if(data.f0address_code){
        result = await storproRun({
            storproName: 'ly0d3.gbt2260code6',
            data: {code6: data.f0address_code}
        })
        f0address = result.itemCode6
    }

    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            id_dataunit: objDataunit._id,
            dataunit_name: objDataunit.name,

            f0name: data.f0name,
            f0birthdate: data.f0birthdate || null,
            f0idnumber: data.f0idnumber || "",
            f0nation_code: data.f0nation_code || "",
            // 民族
            f0nation: data.f0nation_code
                ? dependencies.ly0utils.GBT.gbt3304.find(i=>{
                    return i.code === data.f0nation_code
                }).text : "",
            f0nativeplace_code: data.f0nativeplace_code || "",
            f0nativeplace,
            f0education_code: data.f0education_code || "",
            f0education: data.f0education_code
                ? dependencies.ly0utils.GBT.gbt4658.find(i=>{
                    return i.code === data.f0education_code
                }).text : "",
            f0occupation_code: data.f0occupation_code || "",
            f0occupation: data.f0occupation_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0occupation.find(i=>{
                    return i.code === data.f0occupation_code
                }).text : "",
            f0insurance_code: data.f0insurance_code || "",
            f0insurance: data.f0insurance_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0insurance.find(i=>{
                    return i.code === data.f0insurance_code
                }).text : "",
            f0income_code: data.f0income_code || "",
            f0income: data.f0income_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0income.find(i=>{
                    return i.code === data.f0income_code
                }).text : "",
            f0address_code: data.f0address_code || "",
            f0address,
            f0cellphone: data.f0cellphone || ""
        }
    })
    return {code: 0, message: "修改一条记录成功"}
}

// 删除一条记录
async function deleteOne({data, dependencies}) {
    let _id = data._id

    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d1",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d2",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d3",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d4",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d5",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d6",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d7",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d8",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d9",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d10",
        operator: "deleteMany",
        query: {id_ly0d14d0: _id}
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "deleteOne",
        query: {_id}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 查询一条记录
async function id_ly0d14d0({data, dependencies}) {
    // data.id_ly0d14d0

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "findOne",
        query: {_id: data.id_ly0d14d0}
    })
    const d0 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d1",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d1 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d2",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d2 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d3",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d3 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d4",
        operator: "findOne",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d4 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d5",
        operator: "findOne",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d5 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d6",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d6 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d7",
        operator: "findOne",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d7 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d8",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d8 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d9",
        operator: "find",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d9 = result.data
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d14d10",
        operator: "findOne",
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    const d10 = result.data
    const doc = JSON.parse(JSON.stringify(d0))
    doc.appendix = {
        d0,
        d1,
        d2,
        d3,
        d4: d4 ? d4 : {},
        d5: d5 ? d5 : {},
        d6,
        d7: d7 ? d7 : {} ,
        d8,
        d9,
        d10: d10 ? d10 : {}
    }
    return {code: 0, message: "",
        doc
    }
}

// 修改：配偶信息
async function updateOneF1({data, dependencies}) {
    // data._id
    // data.f1name
    // data.f1birthdate
    // data.f1education_code
    // data.f1occupation_code
    // data.f1cellphone

    const thisTime = new Date()
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            f1name: data.f1name || "",
            f1birthdate: data.f1birthdate || null,
            f1education_code: data.f1education_code || "",
            f1education: data.f1education_code
                ? dependencies.ly0utils.GBT.gbt4658.find(i=>{
                    return i.code === data.f1education_code
                }).text : "",
            f1occupation_code: data.f1occupation_code || "",
            f1occupation: data.f1occupation_code
                ? dependencies.ly0utils.ly0d14.busicode.d0f0occupation.find(i=>{
                    return i.code === data.f1occupation_code
                }).text : "",
            f1cellphone: data.f1cellphone || ""
        }
    })
    return {code: 0, message: "修改成功"}
}

// 修改：孕产信息
async function updateOneF2({data, dependencies}) {
    // data._id
    // data.f2height
    // data.f2weight
    // data.f2pregnancies
    // data.f2births
    // data.f2menstruation_last
    // data.f2menstruation_first
    // data.f2menstruation_cycle_code
    // data.f2abnormal
    // data.f2abnormal0
    // data.f2abnormal1
    // data.f2abnormal2

    const thisTime = new Date()
    await dependencies.GQuery.GQuery({
        tblName: "ly0d14d0",
        operator: "updateOne",
        query: {_id: data._id},
        update: {
            time_update: thisTime,
            f2height: data.f2height || null,
            f2weight: data.f2weight || null,
            f2pregnancies: data.f2pregnancies || null,
            f2births: data.f2births || null,
            f2menstruation_last: data.f2menstruation_last || null,
            f2menstruation_first: data.f2menstruation_first || null,
            f2menstruation_cycle_code: data.f2menstruation_cycle_code || "",
            f2menstruation_cycle: data.f2menstruation_cycle_code
                ? dependencies.ly0d14.busicode.d0f2menstruation_cycle.find(i=>{
                    return i.code === data.f2menstruation_cycle_code
                }).text : "",
            f2abnormal: data.f2abnormal,
            f2abnormal0: data.f2abnormal0 || "",
            f2abnormal1: data.f2abnormal1 || null,
            f2abnormal2: data.f2abnormal2 || null
        }
    })
    return {code: 0, message: "修改成功"}
}

export default {
    find,
    insertOne,
    updateOne,
    deleteOne,
    id_ly0d14d0,
    updateOneF1,
    updateOneF2
}
