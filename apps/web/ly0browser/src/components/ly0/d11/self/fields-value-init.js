import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_carpark: ly0session.user.id_carpark ? ly0session.user.id_carpark : null,
    name: '',
  }
  let insertOne = {
    _id: null,
    id_carpark: null,
    carpark_name: '',
    name: '', // ��Ŀ����
    term: 'Month', // ���޵�λ
    price: 0, // ����
    price0: 0,
    self: 1, // ����
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
