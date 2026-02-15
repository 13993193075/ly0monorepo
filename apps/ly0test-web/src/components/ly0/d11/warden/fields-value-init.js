import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_carpark: ly0session.user.id_carpark ? ly0session.user.id_carpark : null,
    cellphone: '',
    name: '',
  }
  let insertOne = {
    _id: null,
    id_carpark: null,
    carpark_name: '',
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
