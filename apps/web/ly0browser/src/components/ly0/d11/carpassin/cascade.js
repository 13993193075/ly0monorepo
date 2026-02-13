// 置空
function id_carpark(scopeThis, branch) {
  scopeThis.formDataBox[branch].fieldsValue.id_pricing = null
}
// 重置
function id_carpark0(scopeThis, branch) {
  scopeThis.pageData.data.arrPricing0 = scopeThis.pageData.data.arrPricing.filter((i) => {
    return '' + i.id_carpark === '' + scopeThis.formDataBox[branch].fieldsValue.id_carpark
  })
}

export default {
  id_carpark,
  id_carpark0,
}
