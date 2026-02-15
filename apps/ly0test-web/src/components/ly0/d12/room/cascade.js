// 级联：场所名称
function placeChanged(scopeThis, branch) {
  // 置空房间位置
  scopeThis.formDataBox[branch].fieldsValue.id_position = null
  scopeThis.pageData.data.arrPosition0 = []

  if (!scopeThis.formDataBox[branch].fieldsValue.id_place) {
    return
  }

  // 重置房间位置
  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return i.id_place === scopeThis.formDataBox[branch].fieldsValue.id_place
  })
}

export default {
  placeChanged,
}
