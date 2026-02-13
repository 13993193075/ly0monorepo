import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_carpark: ly0session.user.id_carpark ? ly0session.user.id_carpark : null,
    parking: '', // ��λ
    carplate: '', // ����
    expiryto_start: null, // ��Ч�ڽ�ֹ���� ��
    expiryto_end: null, // ��Ч�ڽ�ֹ���� ֹ
    time_start: null, // ����ʱ�� ��
    time_end: null, // ����ʱ�� ֹ
  }
  let insertOne = {
    _id: null,
    id_carpark: null,
    carpark_name: '',
    parking: '', // ��λ
    carplate: '', // ����
    expiryfrom: null, // ��Ч����ʼ����
    expiryto: null, // ��Ч�ڽ�ֹ����
    expiry: false, // �Ƿ�ͬ����Ч��
    fee: 0, // ���ս��
    fee0: 0,
    time: null, // ����ʱ��
    note: '', // ��ע
    objCarpark: null,
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
