import cascade from './cascade'

function items(branch) {
  return [
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
      hdlChange(scopeThis, value) {
        cascade.id_unit(scopeThis, branch)
        cascade.id_unit0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '工作组',
      fieldName: 'id_group',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrGroup0
      },
    },
    {
      inputType: 'input',
      label: '姓名',
      fieldName: 'name',
    },
    {
      inputType: 'select',
      label: '性别',
      fieldName: 'sex_code',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrSex
      },
    },
    {
      inputType: 'input',
      label: '出生年份',
      fieldName: 'birthyear',
    },
    {
      inputType: 'input',
      label: '身份证号码',
      fieldName: 'idno',
    },
    {
      inputType: 'input',
      label: '手机号',
      fieldName: 'cellphone',
    },
    {
      inputType: 'collapse',
      items: [
        {
          title: '照片上传',
          items: [
            {
              inputType: 'upload-avatar',
              fieldName: 'photo',
              avatar: {
                width: '120px',
                height: '160px',
              },
            },
          ],
        },
      ],
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
              hdlChange(scopeThis, value) {
                cascade.id_unit(scopeThis, 'find')
                cascade.id_unit0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '工作组',
              fieldName: 'id_group',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrGroup0
              },
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
      cols: [{ items: items('insertOne') }],
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
              label: '工作单位',
              fieldName: 'unit_name',
            },
            {
              inputType: 'text',
              label: '工作组',
              fieldName: 'group_name',
            },
            {
              inputType: 'text',
              label: '姓名',
              fieldName: 'name',
            },
            {
              inputType: 'text',
              label: '性别',
              fieldName: 'sex_text',
            },
            {
              inputType: 'text',
              label: '出生年份',
              fieldName: 'birthyear',
            },
            {
              inputType: 'text',
              label: '身份证号码',
              fieldName: 'idno',
            },
            {
              inputType: 'text',
              label: '手机号',
              fieldName: 'cellphone',
            },
            {
              inputType: 'collapse',
              items: [
                {
                  title: '照片',
                  items: [
                    {
                      inputType: 'image',
                      fieldName: 'photo',
                      imageWidth: '120px',
                      imageHeight: '160px',
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
      cols: [{ items: items('updateOne') }],
    },
  }
}

export default {
  getFormProps,
}
