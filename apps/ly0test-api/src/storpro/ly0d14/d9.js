// 修改：环境暴露
async function updateMany ({data, dependencies}) {
    // data
    // data.id_ly0d14d0
    // data.data
    // data.data[i].environment_code
    // data.data[i].times_code
    // data.data[i].smoke_code

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d0',
        operator: 'findOne',
        query: {_id: data.id_ly0d14d0}
    })
    const ly0d14d0 = result.data
    const thisTime = new Date(),
        ly0d14d9 = data.data.map(function (i) {
            let i0 = JSON.parse(JSON.stringify(i))
            i0.time_create = thisTime
            i0.time_update = thisTime
            i0.id_dataunit = ly0d14d0.id_dataunit
            i0.dataunit_name = ly0d14d0.dataunit_name
            i0.id_ly0d14d0 = ly0d14d0._id
            i0.environment = i.environment_code
                ? dependencies.ly0utils.ly0d14.busicode.d9environment.find(i1=>{
                    return i1.code === i.environment_code
                }).text : ""
            i0.times = i.times_code
                ? dependencies.ly0utils.ly0d14.busicode.d9times.find(i1=>{
                    return i1.code === i.times_code
                }).text : ""
            i0.smoke = i.smoke_code
                ? dependencies.ly0utils.ly0d14.busicode.d9smoke.find(i1=>{
                    return i1.code === i.smoke_code
                }).text : ""
            return i0
        })

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d9',
        operator: 'deleteMany',
        query: {id_ly0d14d0: ly0d14d0._id}
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d9',
        operator: 'insertMany',
        update: ly0d14d9
    })
    return {code: 0, message: '修改成功'}
}

export default {
    updateMany
}
