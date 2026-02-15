import cascade from './cascade.js'

//
function findPopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.find.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
    cascade.id_unit0(scopeThis, 'find')
  }
}

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
}

// 
function updateOnePopupBefore(scopeThis) {
  cascade.id_unit0(scopeThis, 'updateOne')
}

export default {
  findPopupBefore,
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  cascade,
}
