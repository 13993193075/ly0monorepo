import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
      return '' + i.id_unit === '' + scopeThis.pageData.data.arrUnit[0]._id
    })
  }
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrUnit.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_unit = scopeThis.pageData.data.arrUnit[0]._id
  }
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_unit
  })
}

export default {
  findPopupBefore: insertOnePopupBefore, // 查询窗口弹出前的处理
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  ly0session,
}
