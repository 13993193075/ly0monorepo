import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrRestaurant.length === 1) {
    scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
      return '' + i.id_restaurant === '' + scopeThis.pageData.data.arrRestaurant[0]._id
    })
  }
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrRestaurant.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_restaurant =
      scopeThis.pageData.data.arrRestaurant[0]._id
  }
  scopeThis.formDataBox.insertOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.price0 * 100,
  )
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
    return '' + i.id_restaurant === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_restaurant
  })
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.price0 * 100,
  )
}

export default {
  findPopupBefore: insertOnePopupBefore, // 查询窗口弹出前的处理
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  ly0session,
}
