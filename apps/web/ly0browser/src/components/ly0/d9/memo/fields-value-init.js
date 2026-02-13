import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    memo: '',
    time_start: null,
    time_end: null,
    id_business: scopeThis.scopeThis.business.objProperty.id_business,
  }
  let insertOne = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    memo: '',
    time: null,
    recorder_name: ly0session.user.name,
    recorder_cellphone: ly0session.user.cellphone,
    id_business: scopeThis.scopeThis.business.objProperty.id_business,
  }

  return {
    find,
    insertOne,
    doc: JSON.parse(JSON.stringify(insertOne)),
    updateOne: JSON.parse(JSON.stringify(insertOne)),
  }
}

export default {
  getFieldsValue_init,
}
