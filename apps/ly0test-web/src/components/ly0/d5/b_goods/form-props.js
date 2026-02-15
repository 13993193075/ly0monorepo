function items(scopeThis, branch) {
  return [
    {
      inputType: 'select',
      label: '菜品分类',
      fieldName: 'id_goodsgroup',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoodsgroup
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsCascade.goodsgroupChanged(scopeThis, value, branch)
      },
    },
    {
      inputType: 'select',
      label: '可以选择：标价菜品',
      fieldName: 'id_goods',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoods0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsCascade.goodsChanged(scopeThis, value, branch)
      },
    },
    {
      inputType: 'input',
      label: '也可以输入：菜品名称',
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
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'note',
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
              label: '菜品名称',
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
              label: '菜品分类',
              fieldName: 'goodsgroup_text',
            },
            {
              inputType: 'text',
              label: '菜品名称',
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
