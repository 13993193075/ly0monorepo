function unit(scopeThis, value, branch) {
  // 置空
  scopeThis.formDataBox[branch].fieldsValue.id_goodsgroup = null
  scopeThis.pageData.data.arrGoodsgroup0 = []
  scopeThis.formDataBox[branch].fieldsValue.id_goods = null
  scopeThis.pageData.data.arrGoods0 = []
  scopeThis.formDataBox[branch].fieldsValue.id_goodsto = null
  scopeThis.pageData.data.arrGoodsto0 = []
  if (branch === 'find') {
    // 模糊查找：货品名称
    scopeThis.formDataBox[branch].fieldsValue.goods_name = ''
  }
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
  scopeThis.pageData.data.arrGoodsto0 = scopeThis.pageData.data.arrGoodsto.filter((i) => {
    return '' + i.id_unit === '' + value
  })
}

function goodsgroup(scopeThis, value, branch) {
  // 置空
  scopeThis.formDataBox[branch].fieldsValue.id_goods = null
  scopeThis.pageData.data.arrGoods0 = []
  if (branch === 'find') {
    // 模糊查找：货品名称
    scopeThis.formDataBox[branch].fieldsValue.goods_name = ''
  }
  if (!value) {
    return
  }

  // 重置
  scopeThis.pageData.data.arrGoods0 = scopeThis.pageData.data.arrGoods.filter((i) => {
    return '' + i.id_goodsgroup === '' + value
  })
}

function goods(scopeThis, value, branch) {
  if (branch === 'find') { // 模糊查找：货品名称
    // 置空
    scopeThis.formDataBox[branch].fieldsValue.goods_name = ''
    if (!value) {
      return
    }

    // 重置
    scopeThis.formDataBox[branch].fieldsValue.goods_name = scopeThis.pageData.data.arrGoods0.find(
      (i) => {
        return i._id === value
      },
    ).name
  }
}

export default {
  unit,
  goodsgroup,
  goods,
}
