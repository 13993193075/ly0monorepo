import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_place: ly0session.user.id_place ? ly0session.user.id_place : null,
    id_position: '',
    name: '',
  }
  let insertOne = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    dataunit_name: '',
    id_place: null,
    place_name: '',
    id_position: null,
    position_text: '',
    name: '',
    rows: 0,
    cols: 0,
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
  ly0session,
}
