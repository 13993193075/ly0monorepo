import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

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

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.price0 * 100,
  )
}

export default {
  insertOneSubmitBefore,
  updateOneSubmitBefore,
  ly0session,
}
