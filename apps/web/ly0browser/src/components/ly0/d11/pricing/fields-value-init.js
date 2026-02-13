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
    type: '', // �Ƽ�����
    type_text: '',

    fee1hour: 0, // Сʱ����
    fee1hour0: 0,
    fee1minimum: 0, // ����շ�
    fee1minimum0: 0,
    fee1maximum: 0, // ����շ�
    fee1maximum0: 0,
    fee1free: 0, // ���ʱ�������ӣ�

    fee2first: 0, // ��һСʱ����
    fee2first0: 0,
    fee2hour: 0, // Сʱ����
    fee2hour0: 0,
    fee2term: 0, // �Ƽ�ʱ��
    fee2again: 0, // ���¼Ƽ�ʱ��
    fee2free_minutes: 0, // ���ʱ�������ӣ�
    fee2free_slot_start_hour: 0, // ���ʱ��-��ʼʱ��  ʱ
    fee2free_slot_start_minute: 0, // ��
    fee2free_slot_end_hour: 0, // ���ʱ��-����ʱ�� ʱ
    fee2free_slot_end_minute: 0, // ��
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
