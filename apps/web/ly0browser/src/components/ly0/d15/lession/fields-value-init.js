import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_class: null,
    name: '',
  }
  let insertOne = {
    _id: null,
    id_class: null,
    class_name: '',
    name: '',
    duration: 0,

    video: '',
    videoDelete: false,
    videoNew: '',

    poster: '',
    posterDelete: false,
    posterNew: '',
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
  srcPrefix: dataRequest.srcPrefix,
  upload: dataRequest.upload,
}
