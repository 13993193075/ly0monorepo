import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_busiunit4 ? ly0session.user.id_busiunit4._id : null,
    id_group: null,
    id_worker: null,
    client_cellphone: '',
    client_name: '',
    time_start: null,
    time_end: null,
    status_code: '',
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

    client_cellphone: '',
    client_name: '',

    order: '',
    time: null,
    status_code: '',
    status_text: '',

    deal: 0,
    dealYuan: 0,
    dealnote: '',
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
