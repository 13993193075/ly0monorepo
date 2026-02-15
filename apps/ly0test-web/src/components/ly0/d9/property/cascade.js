// 置空
function id_unit(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_position = null
  scopeThis.formDataBox[branch].fieldsValue.id_sizetype = null
}
// 重置
function id_unit0(scopeThis, branch) {
  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrSizetype0 = scopeThis.pageData.data.arrSizetype.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
}

export default {
  id_unit,
  id_unit0,
}
