// 素材库
import dateFormat from '../../../../utils/date-format.js'
import formPropsPub from '../d0upload/form-props-pub.js'

function getFormProps(scopeThis) {
  return {
    find: formPropsPub.find,
    doc: formPropsPub.doc,
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [
        {
          items: [
            {
              inputType: 'collapse',
              items: [
                {
                  title: '资源信息',
                  items: [
                    {
                      inputType: 'text',
                      label: '标题',
                      fieldName: 'title',
                    },
                    {
                      inputType: 'text',
                      label: '上传人',
                      fieldName: 'upload_name',
                    },
                    {
                      inputType: 'text',
                      label: '手机号',
                      fieldName: 'upload_cellphone',
                    },
                    {
                      inputType: 'text',
                      label: '上传人意见',
                      fieldName: 'upload_explain',
                      inputWidth: '300px',
                    },
                    {
                      inputType: 'expression',
                      label: '提交时间',
                      hdlExpression(scopeThis, fieldsValue) {
                        return dateFormat.dateFormat(fieldsValue.upload_time)
                      },
                    },
                    {
                      inputType: 'text',
                      label: '状态',
                      fieldName: 'status_text',
                    },
                    {
                      inputType: 'line',
                    },
                    {
                      inputType: 'download',
                      label: '资源文件',
                      fieldName: 'url',
                    },
                  ],
                },
              ],
            },
            {
              inputType: 'input',
              label: '审核人意见',
              fieldName: 'approval_explain',
              inputWidth: '300px',
            },
            {
              inputType: 'switch',
              label: '退回',
              fieldName: 'status_code',
              activeText: '是',
              inactiveText: '否',
              activeValue: '0',
              inactiveValue: '2',
            },
          ],
        },
      ],
    },
  }
}

export default {
  getFormProps,
}
