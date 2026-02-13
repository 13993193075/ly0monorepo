// 新增提交前的处理
function insertOneSubmitBefore(scopeThis){
    if(scopeThis.pageData.data.arrShop.length === 1){
        scopeThis.formDataBox.insertOne.fieldsValue.id_shop = scopeThis.pageData.data.arrShop[0]
    }
}

export default{
    insertOneSubmitBefore,
    updateOneSubmitBefore: insertOneSubmitBefore
}
