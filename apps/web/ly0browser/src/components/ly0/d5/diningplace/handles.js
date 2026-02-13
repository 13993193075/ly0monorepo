// 
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrRestaurant.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_restaurant =
      scopeThis.pageData.data.arrRestaurant[0]._id
  }
}

export default {
  insertOneSubmitBefore,
}
