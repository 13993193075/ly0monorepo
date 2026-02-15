// 级联：餐位分区
function diningplaceChanged(scopeThis, value, branch) {
  // 置空餐位
  scopeThis.formDataBox[branch].fieldsValue.id_table = null
  scopeThis.formDataBox[branch].fieldsValue.tableno = ''

  // 重置餐位数组
  if (value) {
    scopeThis.pageData.data.arrTable0 = scopeThis.pageData.data.arrTable.filter((i) => {
      return i.id_diningplace === value
    })
  } else {
    // 全部
    scopeThis.pageData.data.arrTable0 = JSON.parse(JSON.stringify(scopeThis.pageData.data.arrTable))
  }
}

// 级联：餐位
function tableChanged(scopeThis, value, branch) {
  // 置空餐位
  scopeThis.formDataBox[branch].fieldsValue.tableno = ''

  if (!value) {
    return
  }
  let objTable = scopeThis.pageData.data.arrTable0.find((i) => {
    return i._id === value
  })
  if (objTable) {
    // 重置餐位
    scopeThis.formDataBox[branch].fieldsValue.tableno = objTable.tableno
  }
}

export default {
  diningplaceChanged,
  tableChanged,
}
