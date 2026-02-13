export default {
  formProps: {
    popup: {
      visible: false,
      title: '',
    },
    cols: [
      {
        items: [
          {
            inputType: 'select',
            label: '餐位状态',
            fieldName: 'status_code',
            item_fieldLabel: 'text',
            item_fieldValue: 'code',
            hdlGetItems(scopeThis) {
              if (!scopeThis.focus.id_business) {
                return [
                  { code: '0', text: '停用' },
                  { code: '1', text: '空位' },
                ]
              } else {
                return [{ code: '2', text: '用餐' }]
              }
            },
          },
        ],
      },
    ],
  },
  dataBox: {
    fieldsValue: {},
    fieldsValueInit: {
      id_table: null,
      status_code: '',
    },
    hdlSubmit(scopeThis) {
      scopeThis.handles.dataRequest
        .storpro({
          scopeThis,
          storproName: 'ly0d5.tablestatus.setStatus',
          data: {
            id_table: scopeThis.setStatus.dataBox.fieldsValue.id_table,
            status_code: scopeThis.setStatus.dataBox.fieldsValue.status_code,
          },
        })
        .then((result) => {
          scopeThis.$message(result.message)
          if (result.code === 0) {
            scopeThis.reload(scopeThis)
            scopeThis.setStatus.formProps.popup.visible = false
          }
        })
    },
  },
}
