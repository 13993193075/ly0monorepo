import dateFormat from '../../../../utils/date-format.js'
import cascade from './cascade.js'

//
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
    cascade.id_carpark0(scopeThis, 'insertOne')
  }
}

//
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
  }
}

// 
function updateOnePopupBefore(scopeThis) {
  cascade.id_carpark0(scopeThis, 'updateOne')
}

export default {
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  dateFormat,
  cascade,
}
