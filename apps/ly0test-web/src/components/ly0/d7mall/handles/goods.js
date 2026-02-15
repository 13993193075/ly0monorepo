import dataRequest from "../../../../utils/data-request.js"

// 获取商品数据
function getData(scopeThis){
    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7.goods.findOne",
        data: {_id: scopeThis.dataBox.id_goods}
    }).then(result=>{
        scopeThis.dataBox.goods = result.doc
    })
}

// 图示src处理
function illustration(scopeThis){
    let result = []
    scopeThis.dataBox.goods.illustration.forEach(i=>{
        result.push(scopeThis.srcPrefix + i)
    })
    return result
}

export default {
    getData,
    illustration
}
