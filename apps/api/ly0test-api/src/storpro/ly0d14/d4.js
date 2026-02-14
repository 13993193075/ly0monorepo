import {GQuery} from '../../main/GQuery.js'

// 内部模块：数据约束
function dataRule (data) {
    // 不能提交
    if ((data.f0uncertain !== 'true') && !(/^[0-7]?$/.test(data.f0))) {
        return {code: 1, message: '1.1. 取值范围：0-7'}
    }
    if ((data.f0f0uncertain !== 'true') && !(/^[0-9]*$/.test(data.f0f0) && Number(data.f0f0) <= 1440)) {
        return {code: 1, message: '1.2. 取值范围(24*60)：0-1440'}
    }
    if ((data.f1uncertain !== 'true') && !(/^[0-7]?$/.test(data.f1))) {
        return {code: 1, message: '2.1. 取值范围：0-7'}
    }
    if ((data.f1f0uncertain !== 'true') && !(/^[0-9]*$/.test(data.f1f0) && Number(data.f1f0) <= 1440)) {
        return {code: 1, message: '2.2. 取值范围(24*60)：0-1440'}
    }
    if ((data.f2uncertain !== 'true') && !(/^[0-7]?$/.test(data.f2))) {
        return {code: 1, message: '3.1. 取值范围：0-7'}
    }
    if ((data.f2f0uncertain !== 'true') && !(/^[0-9]*$/.test(data.f2f0) && Number(data.f2f0) <= 1440)) {
        return {code: 1, message: '3.2. 取值范围(24*60)：0-1440'}
    }
    if ((data.f3uncertain !== 'true') && !(/^[0-9]*$/.test(data.f3) && Number(data.f3) <= 1440)) {
        return {code: 1, message: '4. 取值范围(24*60)：0-1440'}
    }
    if ((data.f4uncertain !== 'true') && !(/^[0-9]*$/.test(data.f4) && Number(data.f4) <= 1440)) {
        return {code: 1, message: '5. 取值范围(24*60)：0-1440'}
    }

    return {code: 0, message: '可以提交'}
}

// 修改：运动篇
function updateOne (data) {
    // data.id_ly0d14d0
    // data.f0uncertain
    // data.f0
    // data.f0f0uncertain
    // data.f0f0
    // data.f1uncertain
    // data.f1
    // data.f1f0uncertain
    // data.f1f0
    // data.f2uncertain
    // data.f2
    // data.f2f0uncertain
    // data.f2f0
    // data.f3uncertain
    // data.f3
    // data.f4uncertain
    // data.f4

    return new Promise(function (resolve, reject) {
        // 数据约束
        let message = dataRule(data)
        if (message.code === 1) {
            return resolve(message) // 不能提交
        }

        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d14d4',
            operator: 'deleteMany',
            query: {id_ly0d14d0: data.id_ly0d14d0}
        }).then(() => {
            GQuery({
                tblName: 'ly0d14d0',
                operator: 'findOne',
                query: {_id: data.id_ly0d14d0}
            }).then(result => {
                let ly0d14d0 = result.data
                GQuery({
                    tblName: 'ly0d14d4',
                    operator: 'insertOne',
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: ly0d14d0.id_dataunit,
                        dataunit_name: ly0d14d0.dataunit_name,
                        id_ly0d14d0: ly0d14d0._id,

                        f0uncertain: data.f0uncertain,
                        f0: data.f0uncertain === 'true' ? 0 : Number(data.f0),
                        f0f0uncertain: data.f0f0uncertain,
                        f0f0: data.f0f0uncertain === 'true' ? 0 : Number(data.f0f0),
                        f1uncertain: data.f1uncertain,
                        f1: data.f1uncertain === 'true' ? 0 : Number(data.f1),
                        f1f0uncertain: data.f1f0uncertain,
                        f1f0: data.f1f0uncertain === 'true' ? 0 : Number(data.f1f0),
                        f2uncertain: data.f2uncertain,
                        f2: data.f2uncertain === 'true' ? 0 : Number(data.f2),
                        f2f0uncertain: data.f2f0uncertain,
                        f2f0: data.f2f0uncertain === 'true' ? 0 : Number(data.f2f0),
                        f3uncertain: data.f3uncertain,
                        f3: data.f3uncertain === 'true' ? 0 : Number(data.f3),
                        f4uncertain: data.f4uncertain,
                        f4: data.f4uncertain === 'true' ? 0 : Number(data.f4)
                    }
                }).then(() => {
                    resolve({code: 0, message: '修改成功'})
                })
            })
        })
    })
}

export default {
    updateOne
}
