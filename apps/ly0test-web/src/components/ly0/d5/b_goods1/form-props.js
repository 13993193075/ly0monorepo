function items(scopeThis, branch) {
  return [
    {
      inputType: 'select',
      label: '可以选择：标价物品',
      fieldName: 'id_goods',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoods
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsCascade.goodsChanged(scopeThis, value, branch)
      },
    },
    {
      inputType: 'input',
      label: '也可以输入：物品名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '单价',
      fieldName: 'price0',
      inputWidth: '150px',
    },
    {
      inputType: 'input',
      label: '数量',
      fieldName: 'count',
      inputWidth: '150px',
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
              inputType: 'input',
              label: '物品名称',
              fieldName: 'name',
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
      cols: [{ items: items(scopeThis, 'insertOne') }],
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
              label: '物品名称',
              fieldName: 'name',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis) {
                return Math.floor(scopeThis.formDataBox.doc.fieldsValue.price) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '数量',
              fieldName: 'count',
              inputWidth: '150px',
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
      cols: [{ items: items(scopeThis, 'updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
