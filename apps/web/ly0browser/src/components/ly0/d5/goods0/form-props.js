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
        scopeThis.formDataBox[branch].fieldsValue.id_goodsgroup = null
        scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter(
          (i) => {
            return '' + i.id_restaurant === '' + value
          },
        )
      },
    },
    {
      inputType: 'select',
      label: '商品分类',
      fieldName: 'id_goodsgroup',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGoodsgroup0
      },
    },
    {
      inputType: 'input',
      label: '商品名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '单价',
      fieldName: 'price0',
      inputWidth: '150px',
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '照片上传',
          items: [
            {
              inputType: 'upload-avatar',
              fieldName: 'thumb',
              avatar: {
                width: '400px',
                height: '300px',
              },
            },
          ],
        },
      ],
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
              hdlChange(scopeThis, value) {
                scopeThis.formDataBox.find.fieldsValue.id_goodsgroup = null
                scopeThis.pageData.data.arrGoodsgroup0 =
                  scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
                    return '' + i.id_restaurant === '' + value
                  })
              },
            },
            {
              inputType: 'select',
              label: '商品分类',
              fieldName: 'id_goodsgroup',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGoodsgroup0
              },
            },
            {
              inputType: 'input',
              label: '商品名称',
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
              label: '餐馆',
              fieldName: 'restaurant_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
              },
            },
            {
              inputType: 'text',
              label: '商品分类',
              fieldName: 'goodsgroup_text',
            },
            {
              inputType: 'text',
              label: '商品名称',
              fieldName: 'name',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.price) / 100
              },
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '照片',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'thumb',
                    },
                  ],
                },
              ],
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
