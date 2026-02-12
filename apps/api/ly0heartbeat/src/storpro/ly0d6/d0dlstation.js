import {GQuery} from '../../main/GQuery.js'

function findAll(data) {
    return new Promise((resolve, reject) => {
        // data.id_dataunit 当前用户信息：数据单元

        GQuery({
            tblName: "ly0d6d0",
            operator: "find",
            query: {
                id_dataunit: data.id_dataunit,
                // 静态资源 或 已发布的文件上传
                $or: [{type_code: "0"}, {type_code: "1", status_code: "2"}]
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
