// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'input',
      label: '下载地址',
      fieldName: 'url',
      inputWidth: '300px',
    },
    {
      inputType: 'input',
      label: '标题',
      fieldName: 'title',
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
              label: '标题',
              fieldName: 'title',
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
              label: '下载地址',
              fieldName: 'url',
              inputWidth: '300px',
            },
            {
              inputType: 'text',
              label: '标题',
              fieldName: 'title',
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
