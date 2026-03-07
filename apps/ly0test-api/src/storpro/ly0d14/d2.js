// 修改：饮食篇
async function updateMany ({data, dependencies}) {
    // data
    // data.id_ly0d14d0
    // data.data
    // data.data[i].food_code
    // data.data[i].times_code
    // data.data[i].weight_code

    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d0',
        operator: 'findOne',
        query: {_id: data.id_ly0d14d0}
    })
    const ly0d14d0 = result.data
    const thisTime = new Date(),
        ly0d14d2 = data.data.map(function (i) {
            let i0 = JSON.parse(JSON.stringify(i))
            i0.time_create = thisTime
            i0.time_update = thisTime
            i0.id_dataunit = ly0d14d0.id_dataunit
            i0.dataunit_name = ly0d14d0.dataunit_name
            i0.id_ly0d14d0 = ly0d14d0._id
            i0.food = i.food_code
                ? dependencies.ly0utils.ly0d14.busicode.d2food.find(i1=>{
                    return i1.code === i.food_code
                }).text : ""
            i0.times = i.times_code
                ? dependencies.ly0utils.ly0d14.busicode.d2times.find(i1=>{
                    return i1.code === i.times_code
                }).text : ""
            i0.weight = i.weight_code
                ? dependencies.ly0utils.ly0d14.busicode.d2weight.find(i1=>{
                    return i1.code === i.weight_code
                }).text : ""
            return i0
        })

    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d2',
        operator: 'deleteMany',
        query: {id_ly0d14d0: ly0d14d0._id}
    })
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d14d2',
        operator: 'insertMany',
        update: ly0d14d2
    })
    return {code: 0, message: '修改成功'}
}

export default {
    updateMany
}
