function items(scopeThis, branch) {
  return [
    {
      inputType: 'select',
      label: '餐位分区',
      fieldName: 'id_diningplace',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrDiningplace
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsCascade.diningplaceChanged(scopeThis, value, branch)
      },
    },
    {
      inputType: 'select',
      label: '可以选择：固定餐位',
      fieldName: 'id_table',
      item_fieldLabel: 'tableno',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrTable0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsCascade.tableChanged(scopeThis, value, branch)
      },
    },
    {
      inputType: 'input',
      label: '也可以输入：临时餐位',
      fieldName: 'tableno',
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
              label: '餐位',
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
              label: '餐位分区',
              fieldName: 'diningplace_text',
            },
            {
              inputType: 'text',
              label: '餐位',
              fieldName: 'tableno',
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
