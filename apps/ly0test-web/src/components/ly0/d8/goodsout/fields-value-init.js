import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
    id_goodsgroup: null,
    id_goods: null,
    goods_name: '', // ģ������
    time_start: null,
    time_end: null,
    id_goodsto: null,
  }
  let insertOne = {
    _id: null,
    id_unit: null,
    unit_name: '',
    id_goodsgroup: null,
    goodsgroup_text: '',
    id_goods: null,
    goods_name: '',
    count: '',
    time: null,
    id_goodsto: null,
    goodsto_text: '',
    keeper_cellphone: '',
    keeper_name: '',
    consignee_cellphone: '',
    consignee_name: '',
    note: '',
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
  ly0session,
}
