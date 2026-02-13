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
    cellphone: '', // �����ֻ���
  }
  let insertOne = {
    _id: null,
    id_carpark: null,
    carpark_name: '',
    parking: '', //��λ
    carplate: '', //����
    expiryfrom: null, //��Ч����ʼ����
    expiryto: null, //��Ч�ڽ�ֹ����
    cellphone: '', //�����ֻ���
    id_pricing: null, //��ʱ���Ƽ���Ŀ
    pricing_name: '',
    id_self: null, //���ڳ������ɷ���Ŀ
    self_name: '',
    note: '', //��ע
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
