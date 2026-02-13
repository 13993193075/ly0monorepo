function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    id_goods: null,
    time_start: null,
    time_end: null,
    id_business: scopeThis.scopeThis.business.objProperty.id_business,
  }
  let insertOne = {
    _id: null,
    id_property: scopeThis.scopeThis.business.objProperty._id,
    id_goods: null,
    goods_name: '',
    price: 0,
    count: 0,
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
