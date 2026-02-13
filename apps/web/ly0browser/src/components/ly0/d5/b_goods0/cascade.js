// 级联：商品分类
function goodsgroupChanged(scopeThis, value, branch) {
  // 置空商品
  scopeThis.formDataBox[branch].fieldsValue.id_goods = null
  scopeThis.formDataBox[branch].fieldsValue.name = ''
  // 置空标价
  scopeThis.formDataBox[branch].fieldsValue.price0 = 0

  // 重置商品数组
  if (value) {
    scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
      return i.id_goodsgroup === value
    })
  } else {
    // 全部
    scopeThis.pageData.data.arrGoods0 = JSON.parse(JSON.stringify(scopeThis.pageData.data.arrGoods))
  }
}

// 级联：商品
function goodsChanged(scopeThis, value, branch) {
  // 置空商品
  scopeThis.formDataBox[branch].fieldsValue.name = ''
  // 置空标价
  scopeThis.formDataBox[branch].fieldsValue.price0 = 0

  if (!value) {
    return
  }
  let objGoods = scopeThis.pageData.data.arrGoods0.find((i) => {
    return i._id === value
  })
  if (objGoods) {
    // 重置商品
    scopeThis.formDataBox[branch].fieldsValue.name = objGoods.name
    // 重置标价
    scopeThis.formDataBox[branch].fieldsValue.price0 = Math.floor(objGoods.price) / 100
  }
}

export default {
  goodsgroupChanged,
  goodsChanged,
}
