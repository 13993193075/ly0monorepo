function unit(scopeThis, value) {
  // 置空
  scopeThis.formDataBox.find.fieldsValue.id_goodsgroup = null
  scopeThis.pageData.data.arrGoodsgroup0 = []
  scopeThis.formDataBox.find.fieldsValue._id = null
  scopeThis.formDataBox.find.fieldsValue.name = ''
  scopeThis.pageData.data.arrGoods0 = []
  scopeThis.formDataBox.find.fieldsValue.id_goodsfrom = null
  scopeThis.pageData.data.arrGoodsfrom0 = []
  if (!value) {
    return
  }

  // 重置
  scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
    return '' + i.id_unit === '' + value
  })
  scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
    return '' + i.id_unit === '' + value
  })
  scopeThis.pageData.data.arrGoodsfrom0 = scopeThis.pageData.data.arrGoodsfrom.filter((i) => {
    return '' + i.id_unit === '' + value
  })
}

function goodsgroup(scopeThis, value) {
  // 置空
  scopeThis.formDataBox.find.fieldsValue._id = null
  scopeThis.formDataBox.find.fieldsValue.name = ''
  scopeThis.pageData.data.arrGoods0 = []
  if (!value) {
    return
  }

  // 重置
  scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
    return '' + i.id_goodsgroup === '' + value
  })
}

function goods(scopeThis, value) {
  // 置空
  scopeThis.formDataBox.find.fieldsValue.name = ''
  if (!value) {
    return
  }

  // 重置
  scopeThis.formDataBox.find.fieldsValue.name = scopeThis.pageData.data.arrGoods0.find((i) => {
    return i._id === value
  }).name
}

export default {
  unit,
  goodsgroup,
  goods,
}
