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
      label: '户型名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '建筑面积',
      fieldName: 'area_builtup',
    },
    {
      inputType: 'input',
      label: '使用面积',
      fieldName: 'area_usable',
    },
    {
      inputType: 'input',
      label: '计费面积',
      fieldName: 'area',
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
              label: '户型名称',
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
        title: '修改',
      },
      cols: [
        {
          items: [
            {
              inputType: 'text',
              label: '物业单位',
              fieldName: 'unit_name',
            },
            {
              inputType: 'text',
              label: '户型名称',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '建筑面积',
              fieldName: 'area_builtup',
            },
            {
              inputType: 'text',
              label: '使用面积',
              fieldName: 'area_usable',
            },
            {
              inputType: 'text',
              label: '计费面积',
              fieldName: 'area',
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
