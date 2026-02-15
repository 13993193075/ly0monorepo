import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'
async function init ({scopeThis}){
    scopeThis.queryInit.formData.id_business = scopeThis.props_myProps.id_business
    scopeThis.insertOne.formData.id_business = scopeThis.props_myProps.id_business
    scopeThis.pgData.query.id_business = scopeThis.props_myProps.id_business
    await withTable.init({scopeThis})
    scopeThis.pgData.data.arrRoom0 = [].concat(scopeThis.pgData.data.arrRoom)
}

export default {
    init,
}
