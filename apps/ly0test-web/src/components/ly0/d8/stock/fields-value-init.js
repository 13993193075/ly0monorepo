import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  return {
    find: {
      _id: null,
      id_dataunit: ly0session.dataunit._id,
      id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
      id_goodsgroup: null,
      name: '',
      time_start: null,
      time_end: null,
      id_goodsfrom: null,
      id_goodsto: null,
    },
    doc: {
      _id: null,
      id_unit: null,
      unit_name: '',
      id_goodsgroup: null,
      goodsgroup_text: '',
      name: '',
      thumb: '',

      stock_start: 0,
      stock_end: 0,
      count0purchase: 0,
      count0goodsin: 0,
      count1goodsout: 0,
      count1sale: 0,
      count1loss: 0,
    },
  }
}

export default {
  getFieldsValue_init,
  ly0session,
  srcPrefix: dataRequest.srcPrefix, // ͼƬsrcǰ׺
  upload: dataRequest.upload, // �ϴ�·��
}
