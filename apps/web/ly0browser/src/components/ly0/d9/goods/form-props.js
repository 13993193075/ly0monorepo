// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
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
    },
    {
      inputType: 'input',
      label: '项目名称',
      fieldName: 'name',
    },
    {
      inputType: 'select',
      label: '计费方法',
      fieldName: 'method_code',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrMethod
      },
    },
    {
      inputType: 'input',
      label: '单价',
      fieldName: 'price0',
      inputWidth: '150px',
    },
    {
      inputType: 'input',
      label: '自助缴费期限',
      fieldName: 'self',
      inputWidth: '150px',
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
            },
            {
              inputType: 'input',
              label: '项目名称',
              fieldName: 'name',
            },
            {
              inputType: 'select',
              label: '计费方法',
              fieldName: 'method_code',
              item_fieldLabel: 'text',
              item_fieldValue: 'code',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrMethod
              },
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
              label: '物业单位',
              fieldName: 'unit_name',
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个物业单位时不显示
              },
            },
            {
              inputType: 'text',
              label: '项目名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '计费方法',
              fieldName: 'method_text',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis, fieldsValue) {
                return Math.floor(fieldsValue.price) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '自助缴费期限',
              fieldName: 'self',
              inputWidth: '150px',
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
