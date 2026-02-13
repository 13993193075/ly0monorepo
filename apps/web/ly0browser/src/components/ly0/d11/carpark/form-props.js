function items(branch) {
  return [
    {
      inputType: 'input',
      label: '停车场名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '剩余车位数',
      fieldName: 'capacity',
    },
    {
      inputType: 'select',
      label: '临时车默认计费项目',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.formDataBox[branch].fieldsValue.arrPricing
      },
      hdlVisible(scopeThis) {
        return branch === 'updateOne'
      },
    },
    {
      inputType: 'select',
      label: '长期车默认自助缴费项目',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis, fieldsValue) {
        return scopeThis.formDataBox[branch].fieldsValue.arrSelf
      },
      hdlVisible(scopeThis) {
        return branch === 'updateOne'
      },
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '微信支付',
          items: [
            {
              inputType: 'input',
              label: 'APPID',
              fieldName: 'wx_appid',
              inputWidth: '250px',
            },
            {
              inputType: 'input',
              label: 'MCHID',
              fieldName: 'wx_mchid',
              inputWidth: '250px',
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
              inputType: 'input',
              label: '停车场编号',
              fieldName: '_id',
            },
            {
              inputType: 'input',
              label: '停车场名称',
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
              label: '停车场编号',
              fieldName: '_id',
            },
            {
              inputType: 'text',
              label: '停车场名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '剩余车位数',
              fieldName: 'capacity',
            },
            {
              inputType: 'text',
              label: '临时车默认计费项目',
              fieldName: 'pricing_name',
            },
            {
              inputType: 'text',
              label: '长期车默认自助缴费项目',
              fieldName: 'self_name',
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '微信支付',
                  items: [
                    {
                      inputType: 'text',
                      label: 'APPID',
                      fieldName: 'wx_appid',
                      inputWidth: '250px',
                    },
                    {
                      inputType: 'text',
                      label: 'MCHID',
                      fieldName: 'wx_mchid',
                      inputWidth: '250px',
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
