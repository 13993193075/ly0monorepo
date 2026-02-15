// 置空
function id_unit(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_metername = null
}
// 重置
function id_unit0(scopeThis, branch) {
  scopeThis.pageData.data.arrMetername0 = scopeThis.pageData.data.arrMetername.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
}

export default {
  id_unit,
  id_unit0,
}
