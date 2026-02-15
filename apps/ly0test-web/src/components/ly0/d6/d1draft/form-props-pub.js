import dateFormat from '../../../../utils/date-format.js'

export default {
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
  doc: {
    popup: {
      visible: false,
      title: '详细',
    },
    cols: [
      {
        items: [
          {
            inputType: 'collapse',
            activeNames: ['content', 'draft', 'approval'],
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
              {
                title: '审核人意见',
                name: 'approval',
                items: [
                  {
                    inputType: 'text',
                    label: '审核人',
                    fieldName: 'approval_name',
                  },
                  {
                    inputType: 'text',
                    label: '手机号',
                    fieldName: 'approval_cellphone',
                  },
                  {
                    inputType: 'text',
                    label: '审核人意见',
                    fieldName: 'approval_explain',
                    inputWidth: '300px',
                  },
                  {
                    inputType: 'expression',
                    label: '审核时间',
                    hdlExpression(scopeThis, fieldValue) {
                      return material.dateFormat.dateFormat(fieldValue.approval_time)
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}
