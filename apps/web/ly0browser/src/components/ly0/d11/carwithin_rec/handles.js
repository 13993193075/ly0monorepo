import dateFormat from '../../../../utils/date-format.js'

//
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
  }
  scopeThis.formDataBox.insertOne.fieldsValue.fee = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.fee0 * 100,
  )
}

//
function updateOnePopupBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.fee0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee) / 100
}

//
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.fee = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.fee0 * 100,
  )
}

export default {
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  dateFormat,
}
