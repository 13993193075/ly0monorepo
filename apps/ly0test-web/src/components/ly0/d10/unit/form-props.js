function items(branch) {
  return [
    {
      inputType: 'input',
      label: '工作单位名称',
      fieldName: 'name',
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
              label: '工作单位编号',
              fieldName: '_id',
            },
            {
              inputType: 'input',
              label: '工作单位名称',
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
              label: '工作单位编号',
              fieldName: '_id',
            },
            {
              inputType: 'text',
              label: '工作单位名称',
              fieldName: 'name',
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
