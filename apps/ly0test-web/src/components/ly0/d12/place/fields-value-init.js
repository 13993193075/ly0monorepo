import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    name: '',
    closed: '',
  }
  let insertOne = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    dataunit_name: '',
    name: '',
    maxdays: 0,
    closed: false,
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
