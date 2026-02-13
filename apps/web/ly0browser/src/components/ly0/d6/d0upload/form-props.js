import formPropsPub from './form-props-pub.js'
// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'collapse',
      items: [
        {
          title: '文件上传',
          items: [
            {
              inputType: 'upload',
              fieldName: 'appendix',
            },
          ],
        },
      ],
    },
    {
      inputType: 'input',
      label: '标题',
      fieldName: 'title',
    },
    {
      inputType: 'input',
      label: '上传人意见',
      fieldName: 'upload_explain',
      inputWidth: '300px',
    },
    {
      inputType: 'switch',
      label: '提交审核',
      fieldName: 'status_code',
      activeText: '是',
      inactiveText: '否',
      activeValue: '1',
      inactiveValue: '0',
    },
  ]

  return {
    find: formPropsPub.find,
    insertOne: {
      popup: {
        visible: false,
        title: '新增',
      },
      cols: [{ items }],
    },
    doc: formPropsPub.doc,
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
