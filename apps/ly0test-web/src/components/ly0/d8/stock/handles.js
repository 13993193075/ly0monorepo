import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()
import cascade from './cascade.js'

// 查询窗口弹出前的处理
function findPopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
    scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
    scopeThis.pageData.data.arrGoodsfrom0 = scopeThis.pageData.data.arrGoodsfrom.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
    scopeThis.pageData.data.arrGoodsto0 = scopeThis.pageData.data.arrGoodsto.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
  }
}

export default {
  findPopupBefore,
  ly0session,
  cascade,
}
