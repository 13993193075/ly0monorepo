import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    id_position: null,
    id_property: null,
    id_metername: null,
    time_start: null,
    time_end: null,
    note: '',
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    unit_name: '',
    id_position: null,
    position_text: '',
    id_property: null,
    property_number: '',
    property_name: '',
    id_metername: null,
    metername: '',
    readout: '',
    time: '',
    photo: '',
    note: '',
    recorder_name: '',
    recorder_cellphone: '',
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
  srcPrefix: dataRequest.srcPrefix, // ͼƬsrcǰ׺
  upload: dataRequest.upload, // �ϴ�·��
}
