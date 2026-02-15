import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    title: '',
  }
  let insertOne = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    dataunit_name: '',
    content: '',
    appendix: '',
    title: '',
    status_code: '',
    status_text: '',
    id_draft: null,
    draft_cellphone: '',
    draft_name: '',
    draft_explain: '',
    draft_time: null,
    id_approval: null,
    approval_cellphone: '',
    approval_name: '',
    approval_explain: '',
    approval_time: null,
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
  srcPrefix: dataRequest.srcPrefix, // ͼƬsrcǰ׺
  upload: dataRequest.upload, // �ϴ�·��
}
