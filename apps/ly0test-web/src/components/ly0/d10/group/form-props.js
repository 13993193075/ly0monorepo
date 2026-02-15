// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'select',
      label: '工作单位',
      fieldName: 'id_unit',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrUnit
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个工作单位时不显示
      },
    },
    {
      inputType: 'input',
      label: '工作组',
      fieldName: 'name',
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
              label: '工作单位',
              fieldName: 'id_unit',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrUnit
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrUnit.length > 1 // 只有一个工作单位时不显示
              },
            },
            {
              inputType: 'input',
              label: '工作组',
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
