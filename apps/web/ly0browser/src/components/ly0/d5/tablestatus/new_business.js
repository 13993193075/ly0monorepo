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
            inputType: 'date-picker',
            label: '用餐时间',
            fieldName: 'time',
            type: 'datetime',
          },
          {
            inputType: 'input',
            label: '用餐人数',
            fieldName: 'peoples',
          },
          {
            inputType: 'input',
            label: '客户手机号',
            fieldName: 'client_cellphone',
          },
          {
            inputType: 'input',
            label: '客户名称',
            fieldName: 'client_name',
          },
          {
            inputType: 'date-picker',
            label: '预订时间',
            fieldName: 'booktime',
            type: 'datetime',
          },
          {
            inputType: 'input',
            label: '预订说明',
            fieldName: 'booknote',
            inputWidth: '350px',
          },
        ],
      },
    ],
  },
  dataBox: {
    fieldsValue: {},
    fieldsValueInit: {
      _id: null,
      id_restaurant: null,
      time: null,
      peoples: '',
      client_cellphone: '',
      client_name: '',
      booktime: '',
      booknote: '',
      status_code: '1', // 订单状态：用餐
    },
    hdlSubmit(scopeThis) {
      scopeThis.handles.dataRequest
        .storpro({
          scopeThis,
          storproName: 'ly0d5.tablestatus.newBusiness',
          data: Object.assign(scopeThis.newBusiness.dataBox.fieldsValue, {
            arrTable: scopeThis.arrNewBTable,
          }),
        })
        .then((result) => {
          scopeThis.$message(result.message)
          if (result.code === 0) {
            scopeThis.arrNewBTable = []
            scopeThis.newBusiness.formProps.popup.visible = false
            scopeThis.focus.id_business = result.id_business
            // 打开订单详细
            scopeThis.idBusiness.id_business = scopeThis.focus.id_business
          }
        })
    },
  },
}
