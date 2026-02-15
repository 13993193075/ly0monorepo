import cascade from './cascade.js'

// 查询窗口弹出前的处理
function findPopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.find.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]._id
    cascade.id_place(scopeThis, 'find')
    cascade.id_place0(scopeThis, 'find')
  }
}

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrPlace.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_place = scopeThis.pageData.data.arrPlace[0]._id
    cascade.id_place(scopeThis, 'insertOne')
    cascade.id_place0(scopeThis, 'insertOne')
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
  cascade.id_place0(scopeThis, 'updateOne')
  cascade.id_position0(scopeThis, 'updateOne')
  cascade.id_room0(scopeThis, 'updateOne')
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
