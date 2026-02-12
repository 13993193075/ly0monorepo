import {GQuery} from '../../../main/GQuery.js'

// 工单信息
function id_business(data){
    // data.id_business

    return new Promise(function(resolve, reject){
        GQuery({
            tblName: 'ly0d10business0',
            operator: 'findOne',
            query: {_id: data.id_business}
        }).then(result => {
            let objBusiness = result.data
            GQuery({
                tblName: 'ly0d10unit',
                operator: 'findOne',
                query: {_id: objBusiness.id_unit}
            }).then(result => {
                let objUnit = result.data
                GQuery({
                    tblName: 'ly0d10memo0',
                    operator: 'find',
                    query: {id_business: objBusiness._id}
                }).then(result => {
                    let arrMemo = result.data // 工作备忘
                    resolve({code: 0, message: "",
                        business: {
                            objBusiness,
                            objUnit,
                            arrMemo
                        }
                    })
                })
            })
        })
    })
}

export default {
    id_business
}