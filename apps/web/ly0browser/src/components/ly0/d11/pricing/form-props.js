// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'select',
      label: '停车场',
      fieldName: 'id_carpark',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrCarpark
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
      },
    },
    {
      inputType: 'input',
      label: '项目名称',
      fieldName: 'name',
    },
    {
      inputType: 'select',
      label: '计价类型',
      fieldName: 'type',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPricingType
      },
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '一类计价项目明细',
          items: [
            {
              inputType: 'input',
              label: '小时单价',
              fieldName: 'fee1hour0',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '最低收费',
              fieldName: 'fee1minimum0',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '最高收费',
              fieldName: 'fee1maximum0',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '免费时长（分钟）',
              fieldName: 'fee1free',
              inputWidth: '150px',
            },
          ],
        },
        {
          title: '二类计价项目明细',
          items: [
            {
              inputType: 'input',
              label: '第一小时单价',
              fieldName: 'fee2first0',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '小时单价',
              fieldName: 'fee2hour0',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '计价时长',
              fieldName: 'fee2term',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '重新计价时长',
              fieldName: 'fee2again',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '免费时长（分钟）',
              fieldName: 'fee2free_minutes',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '免费时段-起始时间-时（0-23）',
              fieldName: 'fee2free_slot_start_hours',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '分（0-59）',
              fieldName: 'fee2free_slot_start_minutes',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '结束时间-时（0-23）',
              fieldName: 'fee2free_slot_end_hours',
              inputWidth: '150px',
            },
            {
              inputType: 'input',
              label: '分（0-59）',
              fieldName: 'fee2free_slot_end_minutes',
              inputWidth: '150px',
            },
          ],
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
              inputType: 'select',
              label: '停车场',
              fieldName: 'id_carpark',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrCarpark
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
            },
            {
              inputType: 'input',
              label: '项目名称',
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
              label: '停车场',
              fieldName: 'carpark_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrCarpark.length > 1 // 只有一个停车场时不显示
              },
            },
            {
              inputType: 'text',
              label: '项目名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '计价类型',
              fieldName: 'type_text',
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '一类计价项目明细',
                  items: [
                    {
                      inputType: 'expression',
                      label: '小时单价',
                      hdlExpression(scopeThis) {
                        return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee1hour) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'expression',
                      label: '最低收费',
                      hdlExpression(scopeThis) {
                        return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee1minimum) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'expression',
                      label: '最高收费',
                      hdlExpression(scopeThis) {
                        return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee1maximum) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '免费时长（分钟）',
                      fieldName: 'fee1free',
                      inputWidth: '150px',
                    },
                  ],
                },
                {
                  title: '二类计价项目明细',
                  items: [
                    {
                      inputType: 'expression',
                      label: '第一小时单价',
                      hdlExpression(scopeThis) {
                        return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee2first) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'expression',
                      label: '小时单价',
                      hdlExpression(scopeThis) {
                        return Math.floor(scopeThis.formDataBox.doc.fieldsValue.fee2hour) / 100
                      },
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '计价时长',
                      fieldName: 'fee2term',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '重新计价时长',
                      fieldName: 'fee2again',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '免费时长（分钟）',
                      fieldName: 'fee2free_minutes',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '免费时段-起始时间-时（0-23）',
                      fieldName: 'fee2free_slot_start_hours',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '分（0-59）',
                      fieldName: 'fee2free_slot_start_minutes',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '结束时间-时（0-23）',
                      fieldName: 'fee2free_slot_end_hours',
                      inputWidth: '150px',
                    },
                    {
                      inputType: 'text',
                      label: '分（0-59）',
                      fieldName: 'fee2free_slot_end_minutes',
                      inputWidth: '150px',
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
      cols: [{ items: deepcopy.deepcopy(items) }],
    },
  }
}

export default {
  getFormProps,
}
