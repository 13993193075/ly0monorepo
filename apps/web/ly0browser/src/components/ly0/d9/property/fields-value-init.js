import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    id_position: null,
    number: '',
    name: '',
    id_sizetype: null,
    owner_cellphone: '',
    owner_name: '',
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    id_position: null,
    position_text: '',
    unit_name: '',
    number: '',
    name: '',

    id_sizetype: null,
    sizetype_name: '',
    area_builtup: '',
    area_usable: '',
    area: 0,

    owner_cellphone: '',
    owner_name: '',
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
