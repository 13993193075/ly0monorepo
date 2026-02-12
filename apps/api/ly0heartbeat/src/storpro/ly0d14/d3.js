import {GQuery} from '../../main/GQuery.js'
import code from './code/index.js'

// 修改：饮食篇 - 膳食补充剂
function updateMany (data) {
    // data
    // data.id_ly0d14d0
    // data.data
    // data.data[i].food_code
    // data.data[i].times_code
    // data.data[i].weight_code
    // data.data[i].nw
    // data.data[i].nwunit_code
    // data.data[i].brand

    return new Promise(function (resolve, reject) {
        GQuery({
            tblName: 'ly0d14d0',
            operator: 'findOne',
            query: {_id: data.id_ly0d14d0}
        }).then(result => {
            let ly0d14d0 = result.data
            let thisTime = new Date(),
                ly0d14d3 = data.data.map(function (i) {
                    let i0 = JSON.parse(JSON.stringify(i))
                    i0.time_create = thisTime
                    i0.time_update = thisTime
                    i0.id_dataunit = ly0d14d0.id_dataunit
                    i0.dataunit_name = ly0d14d0.dataunit_name
                    i0.id_ly0d14d0 = ly0d14d0._id
                    i0.food = i.food_code
                        ? code.d14d3food.find(i1=>{
                            return i1.code === i.food_code
                        }).text
                        : ""
                    i0.times = i.times_code
                        ? code.d14d3times.find(i1=>{
                            return i1.code === i.times_code
                        }).text
                        : ""
                    i0.weight = i.weight_code
                        ? code.d14d3weight.find(i1=>{
                            return i1.code === i.weight_code
                        }).text
                        : ""
                    i0.nw = isNaN(Number(i.nw)) ? null : i.nw
                    i0.nwunit = i.nwunit_code
                        ? code.d14d3nwunit.find(i1=>{
                            return i1.code === i.nwunit_code
                        }).text
                        : ""
                    return i0
                })

            GQuery({
                tblName: 'ly0d14d3',
                operator: 'deleteMany',
                query: {id_ly0d14d0: ly0d14d0._id}
            }).then(() => {
                GQuery({
                    tblName: 'ly0d14d3',
                    operator: 'insertMany',
                    update: ly0d14d3
                }).then(() => {
                    resolve({code: 0, message: '修改成功'})
                })
            })
        })
    })
}

export default {
    updateMany
}
