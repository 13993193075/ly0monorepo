import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_restaurant: ly0session.user.id_restaurant ? ly0session.user.id_restaurant : null,
    time_start: null,
    time_end: null,
    client_cellphone: '',
    client_name: '',
    status_code: '0', // ����״̬��Ԥ��
  }
  let insertOne = {
    _id: null,
    id_dataunit: null,
    dataunit_name: '',
    id_restaurant: null,
    restaurant_name: '',
    time: null,
    peoples: '',
    client_cellphone: '',
    client_name: '',
    booktime: '',
    booknote: '',
    status_code: '0', // ����״̬��Ԥ��
    status_text: '',
  }

  return {
    find,
    insertOne,
    doc: insertOne,
    updateOne: insertOne,
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
