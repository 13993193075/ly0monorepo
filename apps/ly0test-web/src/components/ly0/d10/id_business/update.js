import dataRequest from '../../../../utils/data-request.js'
function getFieldsValue(scopeThis) {
  return {
    _id: scopeThis.business.objBusiness._id,
    id_worker: scopeThis.business.objBusiness.id_worker, // 数据保全
    client_name: scopeThis.business.objBusiness.client_name,
    client_cellphone: scopeThis.business.objBusiness.client_cellphone,
    order: scopeThis.business.objBusiness.order,
    time: scopeThis.business.objBusiness.time,
    deal: scopeThis.business.objBusiness.deal, // 数据保全
    dealnote: scopeThis.business.objBusiness.dealnote, // 数据保全
    status_code: scopeThis.business.objBusiness.status_code, // 数据保全
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
            inputType: 'input',
            label: '客户名称',
            fieldName: 'client_name',
          },
          {
            inputType: 'input',
            label: '客户手机号',
            fieldName: 'client_cellphone',
          },
          {
            inputType: 'input',
            label: '下单内容',
            fieldName: 'order',
            inputWidth: '350px',
          },
          {
            inputType: 'date-picker',
            label: '下单时间',
            fieldName: 'time',
            // type: "datetime"
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
          storproName: 'ly0d10business.updateOne',
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
