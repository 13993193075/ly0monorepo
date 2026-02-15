import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis) {
  return {
    find: {
      _id: null,
      id_dataunit: ly0session.dataunit._id,
      id_unit: ly0session.user.id_unit ? ly0session.user.id_unit : null,
      id_position: null,
      number: '',
      name: '',
      id_sizetype: null,
      owner_cellphone: '',
      owner_name: '',
    },
    doc: {
      objProperty: {},
      objUnit: {},
      arrMeterrecord: [],
      arrBGoods: [],
      arrBGoods0: [],
      arrMemo: [],
      objBusiness: {
        _id: null,
        amount: 0,
        amount_goods: 0,
        amount_goods0: 0,
        deal: 0,
        deal_goods: 0,
        deal_goods0: 0,
      },
    },
  }
}

export default {
  getFieldsValue_init,
  ly0session,
}
