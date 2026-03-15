// 获取商品数据
async function getData({scopeThis, state}){
    let q = {id_dataunit: scopeThis.ly0session.ly0d7mall.id_dataunit}
    // 商品分类搜索
    if(state.group.dataBox.data.length > 0){
        q.group = state.group.dataBox.arrChecked
    }
    // 商品名称搜索
    if(state.searchword){
        q.name = state.searchword
    }
    const result = await scopeThis.ly0request.ly0.storpro({
        storproName: "ly0d7.goods.find",
        data: {
            query: q,
            limit: state.dataBox.query.limit,
            page: state.dataBox.query.page,
            sort: state.dataBox.query.sort
        }
    })
    state.dataBox.data = result.data
    state.dataBox.total = result.total
}

// 获取商品数据
async function groupGetData({scopeThis, state}){
    const result = await scopeThis.ly0request.ly0.storpro({
        storproName: "ly0d7.group.find",
        data: {
            query: {
                id_dataunit: scopeThis.ly0session.ly0d7mall.id_dataunit
            },
            limit: state.group.dataBox.query.limit,
            page: state.group.dataBox.query.page,
            sort: state.group.dataBox.query.sort
        }
    })
    state.group.dataBox.data = result.data
    state.group.dataBox.total = result.total
}
export default {
    getData,
    groupGetData
}