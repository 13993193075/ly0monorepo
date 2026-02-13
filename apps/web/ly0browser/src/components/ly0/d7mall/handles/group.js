import dataRequest from "../../../../utils/data-request.js"

// 获取商品数据
function getData(scopeThis){
    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7.group.find",
        data: {
            query: {
                id_dataunit: scopeThis.ly0session.mall.id_dataunit
            },
            limit: scopeThis.group.dataBox.query.limit,
            page: scopeThis.group.dataBox.query.page,
            sort: scopeThis.group.dataBox.query.sort
        }
    }).then(result=>{
        scopeThis.group.dataBox.data = result.data
        scopeThis.group.dataBox.count = result.count
    })
}

export default {
    getData
}
