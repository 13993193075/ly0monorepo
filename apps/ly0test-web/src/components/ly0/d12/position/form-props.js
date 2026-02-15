// 深拷贝
import deepcopy from '../../../../utils/deepcopy.js'

function getFormProps(scopeThis) {
  let items = [
    {
      inputType: 'select',
      label: '场所名称',
      fieldName: 'id_place',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPlace
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
      },
    },
    {
      inputType: 'input',
      label: '房间位置',
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
              label: '场所名称',
              fieldName: 'id_place',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPlace
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
              },
            },
            {
              inputType: 'input',
              label: '房间位置',
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
