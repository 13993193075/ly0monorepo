// 
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]._id
  }
}

export default {
  insertOneSubmitBefore,
}
