function items(scopeThis, branch) {
  return [
    {
      inputType: 'select',
      label: '场所名称',
      fieldName: 'id_place',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPlace
      },
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.placeChanged(scopeThis, branch)
      },
      hdlVisible(scopeThis) {
        return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
      },
    },
    {
      inputType: 'select',
      label: '房间位置',
      fieldName: 'id_position',
      item_fieldLabel: 'text',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrPosition0
      },
    },
    {
      inputType: 'input',
      label: '房间名称',
      fieldName: 'name',
    },
    {
      inputType: 'input',
      label: '行数',
      fieldName: 'rows',
      inputWidth: '150px',
    },
    {
      inputType: 'input',
      label: '列数',
      fieldName: 'cols',
      inputWidth: '150px',
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
              label: '场所名称',
              fieldName: 'id_place',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPlace
              },
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.placeChanged(scopeThis, 'find')
              },
              hdlVisible(scopeThis) {
                return scopeThis.pageData.data.arrPlace.length > 1 // 只有一个场所名称时不显示
              },
            },
            {
              inputType: 'select',
              label: '房间位置',
              fieldName: 'id_position',
              item_fieldLabel: 'text',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrPosition0
              },
            },
            {
              inputType: 'input',
              label: '房间名称',
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
      cols: [
        {
          items: items(scopeThis, 'insertOne'),
        },
      ],
    },
    updateOne: {
      popup: {
        visible: false,
        title: '修改',
      },
      cols: [
        {
          items: items(scopeThis, 'updateOne'),
        },
      ],
    },
  }
}

export default {
  getFormProps,
}
