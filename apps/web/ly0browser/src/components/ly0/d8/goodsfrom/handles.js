function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
  }
}

export default {
  insertOneSubmitBefore,
}
