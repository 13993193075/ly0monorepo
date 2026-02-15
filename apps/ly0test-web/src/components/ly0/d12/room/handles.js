import cascade from './cascade.js'

// 查询窗口弹出前的处理
function findPopupBefore(scopeThis) {
  scopeThis.pageData.data.arrPosition0 = []
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.find.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]._id
    cascade.placeChanged(scopeThis, 'find')
  }
}

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrPosition0 = []
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]._id
    cascade.placeChanged(scopeThis, 'insertOne')
  }
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]
  }
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  // 房间位置重置
  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return i.id_place === scopeThis.formDataBox.updateOne.fieldsValue.id_place
  })
}

// 修改提交前的处理
function updateOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.updateOne.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]
  }
}

export default {
  findPopupBefore,
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  cascade,
}
