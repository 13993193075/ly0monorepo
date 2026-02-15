function items() {
  return [
    {
      inputType: 'input',
      label: '场所名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '预约最多天数',
      fieldName: 'maxdays',
      inputWidth: '150px',
    },
    {
      inputType: 'switch',
      label: '临时关闭',
      fieldName: 'closed',
      activeText: '是',
      inactiveText: '否',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#ee7405',
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
              label: '场所名称',
              fieldName: 'name',
            },
            {
              inputType: 'select',
              label: '临时关闭',
              fieldName: 'closed',
              item_fieldLabel: 'text',
              item_fieldValue: 'code',
              items: [
                { code: '', text: '不查询' },
                { code: 'true', text: '是' },
                { code: 'false', text: '否' },
              ],
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
              label: '场所名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '预约最多天数',
              fieldName: 'maxdays',
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '临时关闭',
              hdlExpression(scopeThis, fieldsValue) {
                return !!fieldsValue.closed ? '是' : '否'
              },
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
      cols: [{ items: items() }],
    },
  }
}

export default {
  getFormProps,
}
