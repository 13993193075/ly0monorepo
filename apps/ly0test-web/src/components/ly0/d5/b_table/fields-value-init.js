function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_business: scopeThis.scopeThis.business.objBusiness._id,
    tableno: '',
  }
  let insertOne = {
    _id: null,
    id_business: scopeThis.scopeThis.business.objBusiness._id,
    id_diningplace: null,
    id_table: null,
    tableno: '',
  }
  return {
    find,
    insertOne,
    doc: JSON.parse(JSON.stringify(insertOne)),
    updateOne: JSON.parse(JSON.stringify(insertOne)),
  }
}

export default {
  getFieldsValue_init,
}
