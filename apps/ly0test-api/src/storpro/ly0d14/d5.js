// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if (data.f0uncertain !== 'true' && !(/^[0-9]{0,2}$/.test(data.f0) && Number(data.f0) <= 23)) {
        return {code: 1, message: '1. 取值范围：0-23'}
    }
    if (data.f1uncertain !== 'true' && !(/^[0-9]*$/.test(data.f1) && Number(data.f1) <= 1440)) {
        return {code: 1, message: '2. 取值范围(24*60)：0-1440'}
    }
    if (data.f2uncertain !== 'true' && !(/^[0-9]*$/.test(data.f2) && Number(data.f2) <= 23)) {
        return {code: 1, message: '3. 取值范围：0-23'}
    }
    if (data.f3uncertain !== 'true' && !(/^[0-9]{0,2}$/.test(data.f3) && Number(data.f3) <= 24)) {
        return {code: 1, message: '4. 取值范围：0-24'}
    }
    return {code: 0, message: '可以提交'}
}

// 修改：睡眠篇
async function updateOne ({data, dependencies}) {
    // data.id_ly0d14d0
    // data.f0uncertain,
    // data.f0
    // data.f1uncertain,
    // data.f1
    // data.f2uncertain,
    // data.f2
    // data.f3uncertain,
    // data.f3
    // data.f4uncertain,
    // data.f4f0code
    // data.f4f1
    // data.f4f2code
    // data.f5uncertain,
    // data.f5code

    // 数据约束
    let result = dataRule(data)
    if (result.code === 1) {
        return result // 不能提交
    }

    // 提交
    const thisTime = new Date()
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d5',
        operator: 'deleteMany',
        query: {id_ly0d14d0: data.id_ly0d14d0}
    })
    result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d0',
        operator: 'findOne',
        query: {_id: data.id_ly0d14d0}
    })
    const ly0d14d0 = result.data
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d5',
        operator: 'insertOne',
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: ly0d14d0.id_dataunit,
            dataunit_name: ly0d14d0.dataunit_name,
            id_ly0d14d0: ly0d14d0._id,

            f0uncertain: data.f0uncertain,
            f0: data.f0uncertain !== "true" ? Number(data.f0) : 0,
            f1uncertain: data.f1uncertain,
            f1: data.f1uncertain !== "true" ? Number(data.f1) : 0,
            f2uncertain: data.f2uncertain,
            f2: data.f2uncertain !== "true" ? Number(data.f2) : 0,
            f3uncertain: data.f3uncertain,
            f3: data.f3uncertain !== "true" ? Number(data.f3) : 0,
            f4uncertain: data.f4uncertain,
            f4f0code: data.f4uncertain !== "true" ? (data.f4f0code ? data.f4f0code : "") : "",
            f4f0: data.f4uncertain !== "true"
                ? (data.f4f0code
                    ? dependencies.ly0utils.ly0d14.busicode.d5f4f0.find(i=>{
                        return i.code === data.f4f0code
                    }).text
                    : "")
                : "",
            f4f1: data.f4uncertain !== "true" ? (data.f4f1 ? data.f4f1 : "") : "",
            f4f2code: data.f4uncertain !== "true" ? (data.f4f2code ? data.f4f2code : "") : "",
            f4f2: data.f4uncertain !== "true"
                ? (data.f4f2code
                    ? dependencies.ly0utils.ly0d14.busicode.d5f4f2.find(i=>{
                        return i.code === data.f4f2code
                    }).text
                    : "")
                : "",
            f5uncertain: data.f5uncertain,
            f5code: data.f5uncertain !== "true" ? (data.f5code ? data.f5code : "") : "",
            f5: data.f5uncertain !== "true"
                ? (data.f5code
                    ? dependencies.ly0utils.ly0d14.busicode.d5f5.find(i=>{
                        return i.code === data.f5code
                    }).text
                    : "")
                : "",
        },
        upsert: true
    })
    return {code: 0, message: '修改成功'}
}

export default {
    updateOne
}
