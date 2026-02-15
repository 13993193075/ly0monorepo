// 级联：物品
function goodsChanged(scopeThis, value, branch) {
  // 置空物品
  scopeThis.formDataBox[branch].fieldsValue.name = ''
  // 置空标价
  scopeThis.formDataBox[branch].fieldsValue.price0 = 0

  if (!value) {
    return
  }
  let objGoods = scopeThis.pageData.data.arrGoods.find((i) => {
    return i._id === value
  })
  if (objGoods) {
    // 重置物品
    scopeThis.formDataBox[branch].fieldsValue.name = objGoods.name
    // 重置标价
    scopeThis.formDataBox[branch].fieldsValue.price0 = Math.floor(objGoods.price) / 100
  }
}

export default {
  goodsChanged,
}
