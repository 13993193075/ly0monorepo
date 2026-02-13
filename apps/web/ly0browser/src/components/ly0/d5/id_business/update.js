import dataRequest from '../../../../utils/data-request.js'
function getFieldsValue(scopeThis) {
  return {
    _id: scopeThis.business.objBusiness._id,
    id_restaurant: scopeThis.business.objBusiness.id_restaurant,
    time: scopeThis.business.objBusiness.time,
    peoples: scopeThis.business.objBusiness.peoples,
    client_cellphone: scopeThis.business.objBusiness.client_cellphone,
    client_name: scopeThis.business.objBusiness.client_name,
    booktime: scopeThis.business.objBusiness.booktime,
    booknote: scopeThis.business.objBusiness.booknote,
    status_code: scopeThis.business.objBusiness.status_code,
  }
}

export default {
  formProps: {
    popup: {
      visible: false,
      title: '修改',
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
    fieldsValue: null,
    hdlSubmit(scopeThis) {
      dataRequest
        .storpro({
          scopeThis,
          storproName: 'ly0d5.business.updateOne',
          data: scopeThis.update.dataBox.fieldsValue,
        })
        .then((result) => {
          scopeThis.$message(result.message)
          scopeThis.init().then(() => {
            scopeThis.forceRefresh.info++ // 强制重载子组件
            // 关闭 update 窗口
            scopeThis.update.formProps.popup.visible = false
          })
        })
    },
  },
  getFieldsValue,
}
