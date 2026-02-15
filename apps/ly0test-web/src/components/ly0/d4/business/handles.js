import { ly0withTable as withTable } from 'packages/ly0el/src/index.js'
async function init({scopeThis}){
    await withTable.init({scopeThis})
    // 唯一业务单位缺省处理
    if(scopeThis.pgData.data.arrHotel.length === 1){
        if(!scopeThis.insertOne.formData.id_hotel){
            scopeThis.insertOne.formData.id_hotel = scopeThis.pgData.data.arrHotel[0]._id
        }
        if(!scopeThis.query.formData.id_hotel){
            scopeThis.query.formData.id_hotel = scopeThis.pgData.data.arrHotel[0]._id
        }
        if(!scopeThis.pgData.query.id_hotel){
            scopeThis.pgData.query.id_hotel = scopeThis.pgData.data.arrHotel[0]._id
        }
    }
}
export default {
    init
}
