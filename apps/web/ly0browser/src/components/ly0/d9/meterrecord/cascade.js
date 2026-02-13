// 级联：物业单位
// 置空
function id_unit(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_position = null
  scopeThis.formDataBox[branch].fieldsValue.id_property = null
  scopeThis.formDataBox[branch].fieldsValue.id_metername = null
}
// 重置
function id_unit0(scopeThis, branch) {
  scopeThis.pageData.data.arrPosition0 = scopeThis.pageData.data.arrPosition.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrProperty0 = scopeThis.pageData.data.arrProperty.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
  scopeThis.pageData.data.arrMetername0 = scopeThis.pageData.data.arrMetername.filter((i) => {
    return '' + i.id_unit === '' + scopeThis.formDataBox[branch].fieldsValue.id_unit
  })
}

// 级联：物业分区
// 置空
function id_position(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_property = null
}
// 重置
function id_position0(scopeThis, branch) {
  if (!scopeThis.formDataBox[branch].fieldsValue.id_position) {
    scopeThis.pageData.data.arrProperty0 = JSON.parse(
      JSON.stringify(scopeThis.pageData.data.arrProperty),
    )
  } else {
    scopeThis.pageData.data.arrProperty0 = scopeThis.pageData.data.arrProperty.filter((i) => {
      return '' + i.id_position === '' + scopeThis.formDataBox[branch].fieldsValue.id_position
    })
  }
}

export default {
  id_unit,
  id_unit0,
  id_position,
  id_position0,
}
