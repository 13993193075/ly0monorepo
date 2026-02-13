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
        scopeThis.formDataBox[branch].fieldsValue.id_goodsgroup = null
        scopeThis.pageData.data.arrGoodsgroup0 = scopeThis.pageData.data.arrGoodsgroup.filter(
          (i) => {
            return '' + i.id_unit === '' + value
          },
        )
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
    },
    {
      inputType: 'input',
      label: '货品名称',
      fieldName: 'name',
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
                scopeThis.formDataBox.find.fieldsValue.id_goodsgroup = null
                scopeThis.pageData.data.arrGoodsgroup0 =
                  scopeThis.pageData.data.arrGoodsgroup.filter((i) => {
                    return '' + i.id_unit === '' + value
                  })
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
            },
            {
              inputType: 'input',
              label: '货品名称',
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
              fieldName: 'name',
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
