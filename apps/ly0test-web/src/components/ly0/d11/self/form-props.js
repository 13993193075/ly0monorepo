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
      label: '期限单位',
      fieldName: 'term',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrSelfTerm
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
      label: '期限',
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
              label: '期限单位',
              fieldName: 'term_text',
            },
            {
              inputType: 'expression',
              label: '单价',
              hdlExpression(scopeThis) {
                return Math.floor(scopeThis.formDataBox.doc.fieldsValue.price) / 100
              },
              inputWidth: '150px',
            },
            {
              inputType: 'text',
              label: '期限',
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
