// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'select',
      label: '餐馆',
      fieldName: 'id_restaurant',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrRestaurant
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
      },
    },
    {
      inputType: 'input',
      label: '餐位分区',
      fieldName: 'text',
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
              label: '餐馆',
              fieldName: 'id_restaurant',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrRestaurant
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrRestaurant.length > 1 // 只有一个餐馆时不显示
              },
            },
            {
              inputType: 'input',
              label: '餐位分区',
              fieldName: 'text',
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
