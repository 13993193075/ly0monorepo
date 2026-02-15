import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    id_group: null,
    name: '',
    sex_code: '',
    idno: '',
    cellphone: '',
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    unit_name: '',
    id_group: null,
    group_name: '',
    name: '',
    sex_code: '',
    sex_text: '',
    birthyear: '',
    idno: '',
    cellphone: '',
    photo: '',
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
