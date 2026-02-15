function items(branch) {
  return [
    {
      inputType: 'select',
      label: '物业单位',
      fieldName: 'id_unit',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrUnit
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '物业分区',
      fieldName: 'id_position',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPosition0
      },
    },
    {
      inputType: 'input',
      label: '户号',
      fieldName: 'number',
    },
    {
      inputType: 'input',
      label: '户名',
      fieldName: 'name',
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '户型信息',
          items: [
            {
              inputType: 'select',
              label: '户型',
              fieldName: 'id_sizetype',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrSizetype0
              },
            },
            {
              inputType: 'input',
              label: '建筑面积',
              fieldName: 'area_builtup',
            },
            {
              inputType: 'input',
              label: '使用面积',
              fieldName: 'area_usable',
            },
            {
              inputType: 'input',
              label: '计费面积',
              fieldName: 'area',
              inputWidth: '150px',
            },
          ],
        },
        {
          title: '业主信息',
          items: [
            {
              inputType: 'input',
              label: '手机号',
              fieldName: 'owner_cellphone',
            },
            {
              inputType: 'input',
              label: '名称（姓名）',
              fieldName: 'owner_name',
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
              label: '物业单位',
              fieldName: 'id_unit',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrUnit
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '物业分区',
              fieldName: 'id_position',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPosition0
              },
            },
            {
              inputType: 'input',
              label: '户号',
              fieldName: 'number',
            },
            {
              inputType: 'input',
              label: '户名',
              fieldName: 'name',
            },
            {
              inputType: 'select',
              label: '户型',
              fieldName: 'id_sizetype',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrSizetype0
              },
            },
            {
              inputType: 'input',
              label: '业主手机号',
              fieldName: 'owner_cellphone',
            },
            {
              inputType: 'input',
              label: '业主名称（姓名）',
              fieldName: 'owner_name',
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
              label: '物业单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
            },
            {
              inputType: 'text',
              label: '物业分区',
              fieldName: 'position_text',
            },
            {
              inputType: 'text',
              label: '户号',
              fieldName: 'number',
            },
            {
              inputType: 'text',
              label: '户名',
              fieldName: 'name',
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '户型信息',
                  items: [
                    {
                      inputType: 'text',
                      label: '户型',
                      fieldName: 'sizetype_name',
                    },
                    {
                      inputType: 'text',
                      label: '建筑面积',
                      fieldName: 'area_builtup',
                    },
                    {
                      inputType: 'text',
                      label: '使用面积',
                      fieldName: 'area_usable',
                    },
                    {
                      inputType: 'text',
                      label: '计费面积',
                      fieldName: 'area',
                      inputWidth: '150px',
                    },
                  ],
                },
                {
                  title: '业主信息',
                  items: [
                    {
                      inputType: 'text',
                      label: '手机号',
                      fieldName: 'owner_cellphone',
                    },
                    {
                      inputType: 'text',
                      label: '名称（姓名）',
                      fieldName: 'owner_name',
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
