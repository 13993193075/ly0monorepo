function set(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.fee1hour = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.fee1hour0 * 100,
  )
  scopeThis.formDataBox[branch].fieldsValue.fee1minimum = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.fee1minimum0 * 100,
  )
  scopeThis.formDataBox[branch].fieldsValue.fee1maximum = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.fee1maximum0 * 100,
  )
  scopeThis.formDataBox[branch].fieldsValue.fee2first = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.fee2first0 * 100,
  )
  scopeThis.formDataBox[branch].fieldsValue.fee2hour = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.fee2hour0 * 100,
  )
}

//
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
  }
  set(scopeThis, 'insertOne')
}

//
function updateOnePopupBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.fee1hour0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee1hour) / 100
  scopeThis.formDataBox.updateOne.fieldsValue.fee1minimum0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee1minimum) / 100
  scopeThis.formDataBox.updateOne.fieldsValue.fee1maximum0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee1maximum) / 100
  scopeThis.formDataBox.updateOne.fieldsValue.fee2first0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee2first) / 100
  scopeThis.formDataBox.updateOne.fieldsValue.fee2hour0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee2hour) / 100
}

// 
function updateOneSubmitBefore(scopeThis) {
  set(scopeThis, 'updateOne')
}

export default {
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
}
