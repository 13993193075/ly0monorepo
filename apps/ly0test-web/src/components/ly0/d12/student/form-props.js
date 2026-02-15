// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let formPropsInertOneCols = [
    {
      items: [
        {
          inputType: 'input',
          label: '手机号',
          fieldName: 'cellphone',
        },
        {
          inputType: 'input',
          label: '姓名',
          fieldName: 'name',
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
              label: '手机号',
              fieldName: 'cellphone',
            },
            {
              inputType: 'input',
              label: '姓名',
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
      cols: formPropsInertOneCols,
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: deepcopy.deepcopy(formPropsInertOneCols),
    },
  }
}

export default {
  getFormProps,
}
