function items(branch) {
  return [
    {
      inputType: 'select',
      label: '库管单位',
      fieldName: 'id_unit',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrUnit
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.unit(scopeThis, value, branch)
      },
    },
    {
      inputType: 'select',
      label: '货品分类',
      fieldName: 'id_goodsgroup',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoodsgroup0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.goodsgroup(scopeThis, value, branch)
      },
    },
    {
      inputType: 'select',
      label: '货品',
      fieldName: 'id_goods',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoods0
      },
    },
    {
      inputType: 'input',
      label: '数量',
      fieldName: 'count',
      inputWidth: '150px',
    },
    {
      inputType: 'date-picker',
      label: '出库时间',
      fieldName: 'time',
      type: 'datetime',
    },
    {
      inputType: 'select',
      label: '货品去向',
      fieldName: 'id_goodsto',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoodsto0
      },
    },
    {
      inputType: 'input',
      label: '收货人手机号',
      fieldName: 'consignee_cellphone',
    },
    {
      inputType: 'input',
      label: '收货人姓名',
      fieldName: 'consignee_name',
    },
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'note',
      inputWidth: '250px',
    },
  ]
}

function getFormProps(scopeThis) {
  return {
    find: {
      popup: {
        visible: false,
        title: '查询',
      },
      cols: [
        {
          items: [
            {
              inputType: 'select',
              label: '库管单位',
              fieldName: 'id_unit',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrUnit
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.unit(scopeThis, value, 'find')
              },
            },
            {
              inputType: 'select',
              label: '货品分类',
              fieldName: 'id_goodsgroup',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsgroup0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.goodsgroup(scopeThis, value, 'find')
              },
            },
            {
              inputType: 'select',
              label: '货品',
              fieldName: 'id_goods',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoods0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.goods(scopeThis, value, 'find')
              },
            },
            {
              inputType: 'input',
              label: '模糊查找：货品名称',
              fieldName: 'goods_name',
            },
            {
              inputType: 'date-picker',
              label: '出库时间 起',
              fieldName: 'time_start',
              type: 'datetime',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'time_end',
              type: 'datetime',
            },
            {
              inputType: 'select',
              label: '货品去向',
              fieldName: 'id_goodsto',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsto0
              },
            },
          ],
        },
      ],
    },
    insertOne: {
      popup: {
        visible: false,
        title: '新增',
      },
      cols: [{ items: items('insertOne') }],
    },
    doc: {
      popup: {
        visible: false,
        title: '详细',
      },
      cols: [
        {
          items: [
            {
              inputType: 'text',
              label: '库管单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个库管单位时不显示
              },
            },
            {
              inputType: 'text',
              label: '货品分类',
              fieldName: 'goodsgroup_text',
            },
            {
              inputType: 'text',
              label: '货品名称',
              fieldName: 'goods_name',
            },
            {
              inputType: 'text',
              label: '数量',
              fieldName: 'count',
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '出库时间',
              hdlExpression(scopeThis, fieldsValue) {
                return scopeThis.hdlsSupplement.dateFormat.dateFormat(fieldsValue.time)
              },
            },
            {
              inputType: 'text',
              label: '货品去向',
              fieldName: 'goodsto_text',
            },
            {
              inputType: 'text',
              label: '库管人 手机号',
              fieldName: 'keeper_cellphone',
            },
            {
              inputType: 'text',
              label: '姓名',
              fieldName: 'keeper_name',
            },
            {
              inputType: 'text',
              label: '收货人 手机号',
              fieldName: 'consignee_cellphone',
            },
            {
              inputType: 'text',
              label: '收货人',
              fieldName: 'consignee_name',
            },
            {
              inputType: 'text',
              label: '备注',
              fieldName: 'note',
              inputWidth: '250px',
            },
          ],
        },
      ],
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [{ items: items('updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
