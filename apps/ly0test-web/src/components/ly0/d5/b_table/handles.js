// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrTable0 = JSON.parse(JSON.stringify(scopeThis.pageData.data.arrTable))
}

// 新增提交后的处理
function insertOneSubmitAfter(scopeThis) {
  scopeThis.scopeThis.init().then(() => {
    scopeThis.scopeThis.forceRefresh.amount++ // 强制更新 id_business 相关子组件
  })
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrTable0 = JSON.parse(JSON.stringify(scopeThis.pageData.data.arrTable))
}

export default {
  insertOnePopupBefore,
  insertOneSubmitAfter,
  updateOnePopupBefore,
  updateOneSubmitAfter: insertOneSubmitAfter, // 修改提交后的处理
  deleteOneSubmitAfter: insertOneSubmitAfter, // 删除提交后的处理
}
