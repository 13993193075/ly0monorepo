// 日期格式
import dateFormat from '../../../../utils/date-format.js'
function items() {
  return [
    {
      inputType: 'input',
      label: '备忘',
      fieldName: 'memo',
      inputWidth: '600px',
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '现场照片',
          items: [
            {
              label: '现场照片',
              inputType: 'upload-avatar',
              fieldName: 'photo',
              avatar: {
                width: '400px',
                height: '300px',
              },
            },
            {
              label: '上传附件',
              inputType: 'upload',
              fieldName: 'appendix',
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
              label: '备忘',
              fieldName: 'memo',
              inputWidth: '600px',
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
      cols: [{ items: items() }],
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
              label: '备忘',
              fieldName: 'memo',
              inputWidth: '600px',
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '现场照片',
                  items: [
                    {
                      label: '现场照片',
                      inputType: 'image',
                      fieldName: 'photo',
                      imageWidth: '400px',
                      imageHeight: '300px',
                    },
                    {
                      label: '附件下载',
                      inputType: 'download',
                      fieldName: 'appendix',
                    },
                  ],
                },
              ],
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '记录',
                  items: [
                    {
                      inputType: 'expression',
                      label: '记录时间',
                      hdlExpression(scopeThis) {
                        return dateFormat.dateFormat(
                          scopeThis.formDataBox.doc.fieldsValue.time,
                        )
                      },
                    },
                    {
                      inputType: 'text',
                      label: '记录员',
                      fieldName: 'recorder_name',
                    },
                    {
                      inputType: 'text',
                      label: '手机号',
                      fieldName: 'recorder_cellphone',
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
      cols: [{ items: items() }],
    },
  }
}

export default {
  getFormProps,
}
