function items() {
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
    },
    {
      inputType: 'input',
      label: '物品名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '单价',
      fieldName: 'price0',
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
            },
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
      cols: [{ items: items() }],
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [{ items: items() }],
    },
  }
}

export default {
  getFormProps,
}
