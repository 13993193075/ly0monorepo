import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  return {
    find: {
      _id: null,
      id_dataunit: ly0session.dataunit._id,
      id_unit: ly0session.user.id_busiunit4 ? ly0session.user.id_busiunit4._id : null,
      id_group: null,
      id_worker: null,
      client_cellphone: '',
      client_name: '',
      time_start: null,
      time_end: null,
      status_code: '2', // ����״̬��ȡ��
    },
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
