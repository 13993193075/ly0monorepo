import {GQuery} from '../../main/GQuery.js'
import code from './code/index.js'

// 修改：社会支持篇
function updateOne (data) {
    // data.id_ly0d14d0
    // data.f0code
    // data.f1code
    // data.f2code
    // data.f3code
    // data.f4f0code
    // data.f4f1code
    // data.f5code
    // data.f6code
    // data.f7code
    // data.f8code
    // data.f9code

    return new Promise(function (resolve, reject) {
        // 提交
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d14d7',
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
                    tblName: 'ly0d14d7',
                    operator: 'insertOne',
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: ly0d14d0.id_dataunit,
                        dataunit_name: ly0d14d0.dataunit_name,
                        id_ly0d14d0: ly0d14d0._id,

                        f0code: data.f0code ? data.f0code : "",
                        f0: data.f0code
                            ? code.d14d7f0.find(i=>{
                                return i.code === data.f0code
                            }).text
                            : "",

                        f1code: data.f1code ? data.f1code : "",
                        f1: data.f1code
                            ? code.d14d7f1.find(i=>{
                                return i.code === data.f1code
                            }).text
                            : "",

                        f2code: data.f2code ? data.f2code : "",
                        f2: data.f2code
                            ? code.d14d7f2.find(i=>{
                                return i.code === data.f2code
                            }).text
                            : "",

                        f3code: data.f3code ? data.f3code : "",
                        f3: data.f3code
                            ? code.d14d7f3.find(i=>{
                                return i.code === data.f3code
                            }).text
                            : "",

                        f4f0code: data.f4f0code ? data.f4f0code : "",
                        f4f0: data.f4f0code
                            ? code.d14d7f4f0.find(i=>{
                                return i.code === data.f4f0code
                            }).text
                            : "",
                        f4f1code: data.f4f0code && data.f4f1code ? data.f4f1code : "",
                        f4f1: data.f4f0code && data.f4f1code
                            ? code.d14d7f4f1.find(i=>{
                                return i.code === data.f4f1code
                            }).text
                            : "",

                        f5code: data.f5code ? data.f5code : "",
                        f5: data.f5code
                                ? code.d14d7f5.find(i=>{
                                    return i.code === data.f5code
                                }).text
                                : "",

                        f6code: data.f6code ? data.f6code : "",
                        f6: data.f6code
                            ? code.d14d7f6.find(i=>{
                                return i.code === data.f6code
                            }).text
                            : "",

                        f7code: data.f7code ? data.f7code : "",
                        f7: data.f7code
                            ? code.d14d7f7.find(i=>{
                                return i.code === data.f7code
                            }).text
                            : "",

                        f8code: data.f8code ? data.f8code : "",
                        f8: data.f8code
                            ? code.d14d7f8.find(i=>{
                                return i.code === data.f8code
                            }).text
                            : "",

                        f9code: data.f9code ? data.f9code : "",
                        f9: data.f9code
                            ? code.d14d7f9.find(i=>{
                                return i.code === data.f9code
                            }).text
                            : "",
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
