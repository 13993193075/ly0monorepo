// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let formPropsInertOneCols = [
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
          label: '手机号',
          fieldName: 'cellphone',
        },
        {
          inputType: 'input',
          label: '姓名',
          fieldName: 'name',
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
              label: '手机号',
              fieldName: 'cellphone',
            },
            {
              inputType: 'input',
              label: '姓名',
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
      cols: formPropsInertOneCols,
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: deepcopy.deepcopy(formPropsInertOneCols),
    },
  }
}

export default {
  getFormProps,
}
