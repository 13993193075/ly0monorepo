// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.insertOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.price0 * 100,
  )
  scopeThis.formDataBox.insertOne.fieldsValue.deal = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.deal0 * 100,
  )
}

// 新增提交后的处理
function insertOneSubmitAfter(scopeThis) {
  scopeThis.scopeThis.init().then(() => {
    scopeThis.scopeThis.forceRefresh.amount++ // 强制更新 id_business 相关子组件
  })
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue = Object.assign(
    scopeThis.formDataBox.updateOne.fieldsValue,
    {
      price0: Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price) / 100,
      deal0: Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.deal) / 100,
    },
  )
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.price0 * 100,
  )
  scopeThis.formDataBox.updateOne.fieldsValue.deal = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.deal0 * 100,
  )
}

export default {
  insertOneSubmitBefore,
  insertOneSubmitAfter,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  updateOneSubmitAfter: insertOneSubmitAfter, // 修改提交后的处理
  deleteOneSubmitAfter: insertOneSubmitAfter, // 删除提交后的处理
}
