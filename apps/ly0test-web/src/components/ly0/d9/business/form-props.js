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
                scopeThis.hdlsSupplement.cascade.id_unit(scopeThis)
                scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis)
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
            },
            {
              inputType: 'input',
              label: '户号',
              fieldName: 'number',
            },
            {
              inputType: 'input',
              label: '户名',
              fieldName: 'name',
            },
            {
              inputType: 'select',
              label: '户型',
              fieldName: 'id_sizetype',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrSizetype0
              },
            },
            {
              inputType: 'input',
              label: '业主手机号',
              fieldName: 'owner_cellphone',
            },
            {
              inputType: 'input',
              label: '业主名称（姓名）',
              fieldName: 'owner_name',
            },
          ],
        },
      ],
    },
  }
}

export default {
  getFormProps,
}
