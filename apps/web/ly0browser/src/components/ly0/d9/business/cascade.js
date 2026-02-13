// 置空
function id_unit(scopeThis) {
  scopeThis.formDataBox.find.fieldsValue.id_position = null
  scopeThis.formDataBox.find.fieldsValue.id_sizetype = null
}
// 重置
function id_unit0(scopeThis) {
  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox.find.fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrSizetype0 = scopeThis.pageData.data.arrSizetype.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox.find.fieldsValue.id_unit
  })
}

export default {
  id_unit,
  id_unit0,
}
