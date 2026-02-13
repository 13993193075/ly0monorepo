import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    cellphone: '',
    name: '',
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    unit_name: '',
    cellphone: '',
    name: '',
  }
  return {
    find,
    insertOne,
    updateOne: insertOne,
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
