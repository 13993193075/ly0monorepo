import {GQuery} from '../../main/GQuery.js'
import code from './code/index.js'

//修改：相关实验室检查
function updateOne (data) {
    //data.id_dataunit 当前用户信息：数据单元
    //data.id_ly0d14d0
    //data.f0
    //data.f0note
    //data.f1
    //data.f1note
    //data.f2
    //data.f2nt
    //data.f2note
    //data.f3
    //data.f3item_code
    //data.f3result_code
    //data.f4
    //data.f5
    //data.f5item_code
    //data.f5note
    //data.f6
    //data.f6note
    //data.f7
    //data.f7note
    //data.f8
    //data.f8note

    return new Promise(function (resolve, reject) {
        let thisTime = new Date()
        GQuery({
            tblName: 'ly0d14d10',
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
                    tblName: 'ly0d14d10',
                    operator: 'insertOne',
                    update: {
                        time_create: thisTime,
                        time_update: thisTime,
                        id_dataunit: ly0d14d0.id_dataunit,
                        dataunit_name: ly0d14d0.dataunit_name,
                        id_ly0d14d0: ly0d14d0._id,

                        f0: data.f0,
                        f0note: data.f0 ? data.f0note : "",
                        f1: data.f1,
                        f1note: data.f1 ? data.f1note : "",
                        f2: data.f2,
                        f2nt: data.f2 ? data.f2nt : "",
                        f2note: data.f2 ? data.f2note : "",
                        f3: data.f3,
                        f3item_code: data.f3item_code ? data.f3item_code : "",
                        f3item: data.f3item_code
                            ? code.d14d10f3item.find(i=>{
                                return i.code === data.f3item_code
                            }).text
                            : "",
                        f3result_code: data.f3result_code ? data.f3result_code : "",
                        f3result: data.f3result_code
                            ? code.d14d10f3result.find(i=>{
                                return i.code === data.f3result_code
                            }).text
                            : "",
                        f4: data.f4,
                        f5: data.f5,
                        f5item_code: data.f5item_code ? data.f5item_code : "",
                        f5item: data.f5item_code
                            ? code.d14d10f5item.find(i=>{
                                return i.code === data.f5item_code
                            }).text
                            : "",
                        f5note: data.f5note ? data.f5note : "",
                        f6: data.f6,
                        f6note: data.f6 ? data.f6note : "",
                        f7: data.f7,
                        f7note: data.f7 ? data.f7note : "",
                        f8: data.f8,
                        f8note: data.f8 ? data.f8note : ""
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
