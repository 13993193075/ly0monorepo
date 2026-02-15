import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_restaurant: ly0session.user.id_restaurant ? ly0session.user.id_restaurant : null,
    id_diningplace: null,
    tableno: '',
    status_code: '',
  }
  let insertOne = {
    _id: null,
    id_restaurant: null,
    restaurant_name: '',
    id_diningplace: null,
    diningplace_text: '',
    tableno: '',
    status_code: '',
    status_text: '',
  }

  return {
    find,
    insertOne,
    updateOne: JSON.parse(JSON.stringify(insertOne)),
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
