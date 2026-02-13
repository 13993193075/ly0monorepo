import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_busiunit4 ? ly0session.user.id_busiunit4._id : null,
    id_group: null,
    id_worker: null,
    time_start: null,
    time_end: null,
    status_code: '0', // ����״̬���µ�
  }
  let insertOne = {
    _id: null,
    id_dataunit: null,
    dataunit_name: '',
    id_unit: null,
    unit_name: '',
    id_group: null,
    group_name: '',
    id_worker: null,
    worker_name: '',
    worker_idno: '',
    worker_cellphone: '',

    order: '',
    time: null,
    status_code: '0', // ����״̬���µ�
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
