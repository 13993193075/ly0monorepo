import dataRequest from "../../../../utils/data-request.js"

// 获取商品数据
function getData(scopeThis){
    let q = {id_dataunit: scopeThis.ly0session.mall.id_dataunit}
    // 商品分类搜索
    if(scopeThis.group.dataBox.data.length > 0){
        q.group = scopeThis.group.dataBox.arrChecked
    }
    // 商品名称搜索
    if(!!scopeThis.searchword){
        q.name = scopeThis.searchword
    }
    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7.goods.find",
        data: {
            query: q,
            limit: scopeThis.dataBox.query.limit,
            page: scopeThis.dataBox.query.page,
            sort: scopeThis.dataBox.query.sort
        }
    }).then(result=>{
        scopeThis.dataBox.data = result.data
        scopeThis.dataBox.count = result.count
    })
}

export default {
    getData
}
