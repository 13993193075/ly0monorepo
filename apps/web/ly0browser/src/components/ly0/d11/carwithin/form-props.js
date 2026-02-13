function items(branch) {
  return [
    {
      inputType: 'select',
      label: '停车场',
      fieldName: 'id_carpark',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrCarpark
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_carpark(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_carpark0(scopeThis, branch)
      },
    },
    {
      inputType: 'input',
      label: '车位',
      fieldName: 'parking',
    },
    {
      inputType: 'input',
      label: '车牌',
      fieldName: 'carplate',
    },
    {
      inputType: 'date-picker',
      label: '有效期起始日期',
      fieldName: 'expiryfrom',
      type: 'date',
    },
    {
      inputType: 'date-picker',
      label: '有效期截止日期',
      fieldName: 'expiryto',
      type: 'date',
    },
    {
      inputType: 'input',
      label: '车主手机号',
      fieldName: 'cellphone',
    },
    {
      inputType: 'select',
      label: '临时车计价项目',
      fieldName: 'id_pricing',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPricing0
      },
    },
    {
      inputType: 'select',
      label: '长期车自助缴费项目',
      fieldName: 'id_self',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrSelf0
      },
    },
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'note',
      inputWidth: '300px',
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
              label: '停车场',
              fieldName: 'id_carpark',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrCarpark
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_carpark(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_carpark0(scopeThis, 'find')
              },
            },
            {
              inputType: 'input',
              label: '车位',
              fieldName: 'parking',
            },
            {
              inputType: 'input',
              label: '车牌',
              fieldName: 'carplate',
            },
            {
              inputType: 'date-picker',
              label: '有效期截止日期 起',
              fieldName: 'expiryto_start',
              type: 'date',
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'expiryto_end',
              type: 'date',
            },
            {
              inputType: 'input',
              label: '车主手机号',
              fieldName: 'cellphone',
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
              label: '停车场',
              fieldName: 'carpark_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
            },
            {
              inputType: 'text',
              label: '车位',
              fieldName: 'parking',
            },
            {
              inputType: 'text',
              label: '车牌',
              fieldName: 'carplate',
            },
            {
              inputType: 'expression',
              label: '有效期',
              hdlExpression(scopeThis) {
                return (
                  scopeThis.hdlsSupplement.dateFormat.dateFormat(
                    scopeThis.formDataBox.doc.fieldsValue.expiryfrom,
                    'yyyy/MM/dd',
                  ) +
                  ' - ' +
                  scopeThis.hdlsSupplement.dateFormat.dateFormat(
                    scopeThis.formDataBox.doc.fieldsValue.expiryto,
                    'yyyy/MM/dd',
                  )
                )
              },
              inputWidth: '300px',
            },
            {
              inputType: 'text',
              label: '车主手机号',
              fieldName: 'cellphone',
            },
            {
              inputType: 'text',
              label: '临时车计价项目',
              fieldName: 'pricing_name',
            },
            {
              inputType: 'text',
              label: '长期车自助缴费项目',
              fieldName: 'self_name',
            },
            {
              inputType: 'text',
              label: '备注',
              fieldName: 'note',
              inputWidth: '300px',
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
