function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    id_goods: null,
    to_start: null,
    to_end: null,
    time_start: null,
    time_end: null,
    id_business: scopeThis.scopeThis.business.objProperty.id_business,
  }
  let insertOne = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    id_goods: null,
    goods_name: '',
    method_code: '',
    method_text: '',
    price: 0,
    from: null,
    to: null,
    amount: 0,
    deal: 0,
    deal0: 0,
    dealnote: '',
    time: null,
    id_business: scopeThis.scopeThis.business.objProperty.id_business,
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
