function items(branch) {
  return [
    {
      inputType: 'select',
      label: '物业单位',
      fieldName: 'id_unit',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrUnit
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '物业分区',
      fieldName: 'id_position',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPosition0
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_position(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_position0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '户号',
      fieldName: 'id_property',
      item_fieldLabel: 'number',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrProperty0
      },
    },
    {
      inputType: 'select',
      label: '抄表名称',
      fieldName: 'id_metername',
      item_fieldLabel: 'metername',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrMetername0
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
              label: '物业单位',
              fieldName: 'id_unit',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrUnit
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '物业分区',
              fieldName: 'id_position',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPosition0
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_position(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_position0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '户号',
              fieldName: 'id_property',
              item_fieldLabel: 'number',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrProperty0
              },
            },
            {
              inputType: 'select',
              label: '抄表名称',
              fieldName: 'id_metername',
              item_fieldLabel: 'metername',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrMetername0
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
      cols: [{ items: items('insertOne') }],
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
              label: '物业单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
            },
            {
              inputType: 'expression',
              label: '户号/户名',
              hdlExpression(scopeThis, fieldsValue) {
                return (
                  fieldsValue.property_number +
                  (fieldsValue.property_name ? '/' + fieldsValue.property_name : '')
                )
              },
            },
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
                return scopeThis.hdlsSupplement.dateFormat.dateFormat(fieldsValue.time)
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
      cols: [{ items: items('updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
