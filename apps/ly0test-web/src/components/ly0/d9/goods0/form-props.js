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
      inputType: 'input',
      label: '项目名称',
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
      label: '自助缴费额度',
      fieldName: 'self',
      inputWidth: '150px',
    },
    {
      inputType: 'input',
      label: '预估使用天数',
      fieldName: 'self0',
      inputWidth: '150px',
    },
    {
      inputType: 'select',
      label: '抄表名称',
      fieldName: 'id_metername',
      item_fieldLabel: 'metername',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrMetername0
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
            },
            {
              inputType: 'input',
              label: '项目名称',
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
              label: '物业单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
            },
            {
              inputType: 'text',
              label: '项目名称',
              fieldName: 'name',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.price) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '自助缴费额度',
              fieldName: 'self',
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '预估使用天数',
              fieldName: 'self0',
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '抄表名称',
              fieldName: 'metername',
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
