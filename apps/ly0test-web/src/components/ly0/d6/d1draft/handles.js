import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

// 查询提交前的处理
function findSubmitBefore(scopeThis) {
  scopeThis.formDataBox.find.fieldsValue.id_dataunit = ly0session.dataunit._id
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.insertOne.fieldsValue.id_dataunit = ly0session.dataunit._id
  scopeThis.formDataBox.insertOne.fieldsValue.id_draft = ly0session.user._id
  scopeThis.formDataBox.insertOne.fieldsValue.draft_cellphone = ly0session.user.cellphone
  scopeThis.formDataBox.insertOne.fieldsValue.draft_name = ly0session.user.name
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.id_dataunit = ly0session.dataunit._id
  scopeThis.formDataBox.updateOne.fieldsValue.id_draft = ly0session.user._id
  scopeThis.formDataBox.updateOne.fieldsValue.draft_cellphone = ly0session.user.cellphone
  scopeThis.formDataBox.updateOne.fieldsValue.draft_name = ly0session.user.name
}

export default {
  findSubmitBefore,
  insertOneSubmitBefore,
  updateOneSubmitBefore,
}
