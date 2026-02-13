import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()
import cascade from './cascade.js'
import dateFormat from '../../../../utils/date-format.js'

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
    scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
    scopeThis.pageData.data.arrGoodsto0 = scopeThis.pageData.data.arrGoodsto.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
  }
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
  }
  scopeThis.formDataBox.insertOne.fieldsValue.keeper_cellphone = ly0session.user.cellphone
  scopeThis.formDataBox.insertOne.fieldsValue.keeper_name = ly0session.user.name
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
    if (!!scopeThis.formDataBox.updateOne.fieldsValue.id_goodsgroup) {
      return '' + i.id_goodsgroup === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_goodsgroup
    } else {
      return '' + i.id_unit === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_unit
    }
  })
  scopeThis.pageData.data.arrGoodsto0 = scopeThis.pageData.data.arrGoodsto.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_unit
  })
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.insertOne.fieldsValue.keeper_cellphone = ly0session.user.cellphone
  scopeThis.formDataBox.insertOne.fieldsValue.keeper_name = ly0session.user.name
}

export default {
  findPopupBefore: insertOnePopupBefore, // 查询窗口弹出前的处理
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  ly0session,
  cascade,
  dateFormat,
}
