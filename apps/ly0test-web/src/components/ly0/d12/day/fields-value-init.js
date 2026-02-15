import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_place: ly0session.user.id_place ? ly0session.user.id_place : null,
    day: null,
  }
  let insertOne = {
    _id: null,
    id_place: null,
    place_name: '',
    day: 0,
    openfrom_hh: 0,
    openfrom_mm: 0,
    opento_hh: 0,
    opento_mm: 0,
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
