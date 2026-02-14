import withTable from '../with-table/index.js'

async function init ({scopeThis}){
    scopeThis.queryInit.formData.id_business = scopeThis.initBox.id_business
    scopeThis.queryInit.formData.businesstype_code = scopeThis.initBox.businesstype_code
    await withTable.init({scopeThis})
    const txt = scopeThis.pgData.data.arrBusinessType.find(i=>{
        return i.code === scopeThis.initBox.businesstype_code
    }).text
    scopeThis.initBox.popup.title = '支付记录[' + txt + '] - 订单id: ' + scopeThis.initBox.id_business
}

export default {
    init
}