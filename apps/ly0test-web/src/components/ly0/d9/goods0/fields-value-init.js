import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    name: '',
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    unit_name: '',
    name: '',
    price: 0,
    price0: 0,
    self: 0,
    self0: 0,
    id_metername: null,
    metername: '',
  }

  return {
    find,
    insertOne,
    updateOne: JSON.parse(JSON.stringify(insertOne)),
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
