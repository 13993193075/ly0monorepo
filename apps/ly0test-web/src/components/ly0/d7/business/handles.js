import {withTable} from '@yoooloo42/ly0el'
async function init({scopeThis}){
    await withTable.init({scopeThis})
    // 唯一业务单位缺省处理
    if(scopeThis.pgData.data.arrShop.length === 1){
        if(!scopeThis.insertOne.formData.id_shop){
            scopeThis.insertOne.formData.id_shop = scopeThis.pgData.data.arrShop[0]._id
        }
        if(!scopeThis.query.formData.id_shop){
            scopeThis.query.formData.id_shop = scopeThis.pgData.data.arrShop[0]._id
        }
        if(!scopeThis.pgData.query.id_shop){
            scopeThis.pgData.query.id_shop = scopeThis.pgData.data.arrShop[0]._id
        }
    }
}
export default {
    init
}
