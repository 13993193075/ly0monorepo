import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  let find = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    name: '',
  }
  let insertOne = {
    _id: null,
    id_dataunit: ly0session.dataunit._id,
    dataunit_name: '',
    name: '',
    capacity: 0, //剩余车位数
    wx_appid: '',
    wx_mchid: '',
    id_pricing: null, //临时车默认计价项目
    pricing_name: '',
    arrPricing: [],
    id_self: null, //长期车默认自助缴费项目
    self_name: '',
    arrSelf: [],
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
