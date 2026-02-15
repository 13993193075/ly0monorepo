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
        scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, branch)
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
      hdlChange(scopeThis, value) {
        scopeThis.hdlsSupplement.cascade.id_group(scopeThis, branch)
        scopeThis.hdlsSupplement.cascade.id_group0(scopeThis, branch)
      },
    },
    {
      inputType: 'select',
      label: '工作人员',
      fieldName: 'id_worker',
      item_fieldLabel: 'name',
      item_fieldValue: '_id',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrWorker0
      },
    },
    {
      inputType: 'input',
      label: '下单内容',
      fieldName: 'order',
      inputWidth: '300px',
    },
    {
      inputType: 'date-picker',
      label: '下单时间',
      fieldName: 'time',
      // type: "datetime"
    },
    {
      inputType: 'select',
      label: '工单状态',
      fieldName: 'status_code',
      item_fieldLabel: 'text',
      item_fieldValue: 'code',
      hdlGetItems(scopeThis) {
        return scopeThis.pageData.data.arrBusinessStatus
      },
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
              inputType: 'input',
              label: '工单编号',
              fieldName: '_id',
            },
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
                scopeThis.hdlsSupplement.cascade.id_unit(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_unit0(scopeThis, 'find')
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
              hdlChange(scopeThis, value) {
                scopeThis.hdlsSupplement.cascade.id_group(scopeThis, 'find')
                scopeThis.hdlsSupplement.cascade.id_group0(scopeThis, 'find')
              },
            },
            {
              inputType: 'select',
              label: '工作人员',
              fieldName: 'id_worker',
              item_fieldLabel: 'name',
              item_fieldValue: '_id',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrWorker0
              },
            },
            {
              inputType: 'date-picker',
              label: '下单时间 起',
              fieldName: 'time_start',
              // type: "datetime"
            },
            {
              inputType: 'date-picker',
              label: '止',
              fieldName: 'time_end',
              // type: "datetime"
            },
            {
              inputType: 'select',
              label: '工单状态',
              fieldName: 'status_code',
              item_fieldLabel: 'text',
              item_fieldValue: 'code',
              hdlGetItems(scopeThis) {
                return scopeThis.pageData.data.arrBusinessStatus
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
      cols: [{ items: items('insertOne') }],
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
