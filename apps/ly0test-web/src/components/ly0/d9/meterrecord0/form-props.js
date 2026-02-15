import dateFormat from '../../../../utils/date-format.js'
function items() {
  return [
    {
      inputType: 'select',
      label: '抄表名称',
      fieldName: 'id_metername',
      item_fieldLabel: 'metername',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrMetername
      },
    },
    {
      inputType: 'input',
      label: '本次抄表',
      fieldName: 'readout',
      inputWidth: '150px',
    },
    {
      inputType: 'date-picker',
      label: '抄表时间',
      fieldName: 'time',
      // type: "datetime"
    },
    {
      inputType: 'input',
      label: '备注',
      fieldName: 'note',
      inputWidth: '250px',
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '本次抄表截图',
          items: [
            {
              inputType: 'upload-avatar',
              fieldName: 'photo',
              avatar: {
                width: '400px',
                height: '300px',
              },
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
              inputType: 'select',
              label: '抄表名称',
              fieldName: 'id_metername',
              item_fieldLabel: 'metername',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrMetername
              },
            },
            {
              inputType: 'date-picker',
              label: '抄表时间 起',
              fieldName: 'time_start',
              // type: "datetime"
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'time_end',
              // type: "datetime"
            },
            {
              inputType: 'input',
              label: '备注',
              fieldName: 'note',
              inputWidth: '250px',
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
              label: '抄表名称',
              fieldName: 'metername',
            },
            {
              inputType: 'text',
              label: '本次抄表',
              fieldName: 'readout',
              inputWidth: '150px',
            },
            {
              inputType: 'expression',
              label: '抄表时间',
              hdlExpression(scopeThis, fieldsValue) {
                return dateFormat.dateFormat(fieldsValue.time)
              },
            },
            {
              inputType: 'text',
              label: '备注',
              fieldName: 'note',
              inputWidth: '250px',
            },
            {
              inputType: 'expression',
              label: '记录',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  (fieldsValue.recorder_name ? fieldsValue.recorder_name : '-') +
                  '/' +
                  (fieldsValue.recorder_cellphone ? fieldsValue.recorder_cellphone : '-')
                )
              },
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '本次抄表截图',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'photo',
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
