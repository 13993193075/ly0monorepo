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
              dateFormat.dateFormat(fieldsValue.upload_time)
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
          {
            inputType: 'collapse',
            items: [
              {
                title: '审核人意见',
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
