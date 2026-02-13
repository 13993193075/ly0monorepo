// 素材库
import dateFormat from '../../../../utils/date-format.js'
import formPropsPub from '../d1draft/form-props-pub.js'

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
                  title: '通知内容',
                  name: 'content',
                  items: [
                    {
                      inputType: 'richtextShow',
                      label: '通知内容',
                      fieldName: 'content',
                    },
                    {
                      inputType: 'download',
                      label: '附件',
                      fieldName: 'appendix',
                    },
                  ],
                },
                {
                  title: '拟稿人意见及流程状态',
                  name: 'draft',
                  items: [
                    {
                      inputType: 'text',
                      label: '标题',
                      fieldName: 'title',
                    },
                    {
                      inputType: 'text',
                      label: '拟稿人',
                      fieldName: 'draft_name',
                    },
                    {
                      inputType: 'text',
                      label: '手机号',
                      fieldName: 'draft_cellphone',
                    },
                    {
                      inputType: 'text',
                      label: '拟稿人意见',
                      fieldName: 'draft_explain',
                      inputWidth: '300px',
                    },
                    {
                      inputType: 'expression',
                      label: '提交时间',
                      hdlExpression(scopeThis, fieldsValue) {
                        dateFormat.dateFormat(fieldsValue.draft_time)
                      },
                    },
                    {
                      inputType: 'text',
                      label: '状态',
                      fieldName: 'status_text',
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
              label: '审核结果',
              fieldName: 'status_code',
              activeText: '通过',
              inactiveText: '退回',
              activeValue: '2',
              inactiveValue: '0',
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
