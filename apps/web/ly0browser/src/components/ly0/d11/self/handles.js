function set(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.price = Math.floor(
    scopeThis.formDataBox[branch].fieldsValue.price0 * 100,
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
  scopeThis.formDataBox.updateOne.fieldsValue.price0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price) / 100
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
