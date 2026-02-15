// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'input',
      label: '餐馆名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '小票机型号',
      fieldName: 'smallticket',
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
              label: '餐馆编号',
              fieldName: '_id',
            },
            {
              inputType: 'input',
              label: '餐馆名称',
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
      cols: [{ items }],
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
              label: '餐馆编号',
              fieldName: '_id',
            },
            {
              inputType: 'text',
              label: '餐馆名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '小票机型号',
              fieldName: 'smallticket',
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
      cols: [{ items: deepcopy.deepcopy(items) }],
    },
  }
}

export default {
  getFormProps,
}
