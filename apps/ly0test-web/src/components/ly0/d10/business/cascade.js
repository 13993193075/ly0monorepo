// 置空
function id_unit(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_group = null
  scopeThis.formDataBox[branch].fieldsValue.id_worker = null
}
// 重置
function id_unit0(scopeThis, branch) {
  scopeThis.pageData.data.arrGroup0 = scopeThis.pageData.data.arrGroup.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrWorker0 = scopeThis.pageData.data.arrWorker.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
}

// 置空
function id_group(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_worker = null
}
// 重置
function id_group0(scopeThis, branch) {
  scopeThis.pageData.data.arrWorker0 = scopeThis.pageData.data.arrWorker.filter((i) => {
    return '' + i.id_group === '' + scopeThis.formDataBox[branch].fieldsValue.id_group
  })
}

export default {
  id_unit,
  id_unit0,
  id_group,
  id_group0,
}
