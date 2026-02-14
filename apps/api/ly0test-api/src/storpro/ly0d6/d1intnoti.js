import {GQuery} from '../../main/GQuery.js'

function findAll(data) {
    // data.id_dataunit 当前用户信息：数据单元

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d6d1",
            operator: "find",
            query: {
                id_dataunit: data.id_dataunit,
                status_code: "2" // 已发布
            },
            sort: {_id: -1}
        }).then(result => {
            resolve({data: result.data})
        })
    })
}

export default {
    findAll
}
