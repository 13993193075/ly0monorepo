import dataRequest from "../../../../utils/data-request.js"
const ly0session = dataRequest.ly0sessionLoad()

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis){
    if(scopeThis.pageData.data.arrShop.length === 1){
        scopeThis.formDataBox.insertOne.fieldsValue.id_shop = scopeThis.pageData.data.arrShop[0]._id
    }
}

export default {
    insertOneSubmitBefore,
    ly0session
}