// 置空
function id_unit(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_group = null
}
// 重置
function id_unit0(scopeThis, branch) {
  scopeThis.pageData.data.arrGroup0 = scopeThis.pageData.data.arrGroup.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
}

export default {
  id_unit,
  id_unit0,
}
