import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_place: ly0session.user.id_place ? ly0session.user.id_place : null,
    id_position: null,
    id_room: null,
    user_cellphone: '',
    user_name: '',
    date_start: null,
    date_end: null,
  }
  let insertOne = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    dataunit_name: '',
    id_place: null,
    place_name: '',
    id_position: null,
    position_text: '',
    id_room: null,
    room_name: '',
    id_seat: null,
    seat_row: null,
    seat_col: null,
    user_cellphone: '',
    user_name: '',
    date: null,
    id_day: null,
    day: null,
    day_openfrom_hh: null,
    day_openfrom_mm: null,
    day_opento_hh: null,
    day_opento_mm: null,
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
