function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_business: scopeThis.scopeThis.business.objBusiness._id,
    name: '',
  }
  let insertOne = {
    _id: null,
    id_business: scopeThis.scopeThis.business.objBusiness._id,
    id_goods: null,
    name: '',
    price: 0, // ���� ��
    price0: 0, // ���� Ԫ
    count: 1,
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
