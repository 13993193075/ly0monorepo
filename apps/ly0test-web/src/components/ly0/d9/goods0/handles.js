import cascade from './cascade.js'

//
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
    cascade.id_unit0(scopeThis, 'insertOne')
  }
}

//
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
  }
  scopeThis.formDataBox.insertOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.price0 * 100,
  )
}

//
function updateOnePopupBefore(scopeThis) {
  cascade.id_unit0(scopeThis, 'updateOne')
  scopeThis.formDataBox.updateOne.fieldsValue.price0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price) / 100
}

// 
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.price0 * 100,
  )
}

export default {
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  cascade,
}
