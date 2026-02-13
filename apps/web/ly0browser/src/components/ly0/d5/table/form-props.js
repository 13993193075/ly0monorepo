function items(branch) {
  return [
    {
      inputType: 'select',
      label: '餐馆',
      fieldName: 'id_restaurant',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrRestaurant
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
      },
      hdlChange(scopeThis, value) {
        scopeThis.formDataBox[branch].fieldsValue.id_diningplace = null
        scopeThis.pageData.data.arrDiningplace0 = scopeThis.pageData.data.arrDiningplace.filter(
          (i) => {
            return '' + i.id_restaurant === '' + value
          },
        )
      },
    },
    {
      inputType: 'select',
      label: '餐位分区',
      fieldName: 'id_diningplace',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrDiningplace0
      },
    },
    {
      inputType: 'input',
      label: '餐位（桌号）',
      fieldName: 'tableno',
    },
    {
      inputType: 'select',
      label: '使用状态',
      fieldName: 'status_code',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrStatus
      },
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
      cols: [{ items: items('find') }],
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
              label: '_id',
              fieldName: '_id',
              inputWidth: '250px',
            },
            {
              inputType: 'text',
              label: '餐馆',
              fieldName: 'restaurant_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
              },
            },
            {
              inputType: 'text',
              label: '餐位分区',
              fieldName: 'diningplace_text',
            },
            {
              inputType: 'text',
              label: '餐位（桌号）',
              fieldName: 'tableno',
            },
            {
              inputType: 'text',
              label: '使用状态',
              fieldName: 'status_text',
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
