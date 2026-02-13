import hdlsCarpassin from '../carpassin/handles.js'

//
function passinPopup(scopeThis) {
  scopeThis.formDataBox.passin.fieldsValue = scopeThis.fieldsValue_init.passin
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.passin.fieldsValue.id_carpark = scopeThis.pageData.data.arrCarpark[0]._id
    hdlsCarpassin.cascade.id_carpark0(scopeThis, 'passin')
  }
  scopeThis.formProps.passin.popup.visible = true // ��������
}

//
function passinSubmit(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.passin.fieldsValue.id_carpark = scopeThis.pageData.data.arrCarpark[0]._id
  }
  hdlsCarpassin.dataRequest
    .storpro({
      storproName: scopeThis.storproName.passin,
      data: scopeThis.formDataBox.passin.fieldsValue,
    })
    .then((result) => {
      scopeThis.message(result.message)
      scopeThis.formDataBox.find.fieldsValue = { _id: result._id }
      scopeThis.tableDataBox.request.query.currentPage = 1
      scopeThis.handles.findSubmit(scopeThis).then(() => {
        //
        scopeThis.formProps.passin.popup.visible = false
      })
    })
}

//
function passoutPopup(scopeThis) {
  scopeThis.formDataBox.passout.fieldsValue = scopeThis.fieldsValue_init.passout
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.passout.fieldsValue.id_carpark = scopeThis.pageData.data.arrCarpark[0]._id
    hdlsCarpassin.cascade.id_carpark0(scopeThis, 'passout')
  }
  scopeThis.formProps.passout.popup.visible = true // ��������
}

//
function passoutSubmit(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.passout.fieldsValue.id_carpark = scopeThis.pageData.data.arrCarpark[0]._id
  }
  scopeThis.formDataBox.passout.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.passout.fieldsValue.price0 * 100,
  )
  scopeThis.formDataBox.passout.fieldsValue.fee = Math.floor(
    scopeThis.formDataBox.passout.fieldsValue.fee0 * 100,
  )
  hdlsCarpassin.dataRequest
    .storpro({
      storproName: scopeThis.storproName.passout,
      data: scopeThis.formDataBox.passout.fieldsValue,
    })
    .then((result) => {
      scopeThis.message(result.message)
      scopeThis.formDataBox.find.fieldsValue = { _id: result._id }
      scopeThis.tableDataBox.request.query.currentPage = 1
      scopeThis.handles.findSubmit(scopeThis).then(() => {
        //
        scopeThis.formProps.passout.popup.visible = false
      })
    })
}

function init(scopeThis) {
  return new Promise((resolve, reject) => {
    //
    scopeThis.tableDataBox.srcPrefix = scopeThis.srcPrefix
    scopeThis.formDataBox.doc.srcPrefix = scopeThis.srcPrefix
    scopeThis.formDataBox.passin.srcPrefix = scopeThis.srcPrefix
    scopeThis.formDataBox.passout.srcPrefix = scopeThis.srcPrefix
    scopeThis.formDataBox.passin.upload_carplate = scopeThis.upload_carplate
    scopeThis.formDataBox.passout.upload_carplate = scopeThis.upload_carplate
    //
    scopeThis.formProps.find.popup.visible = false
    scopeThis.formProps.doc.popup.visible = false
    scopeThis.formProps.passin.popup.visible = false
    scopeThis.formProps.passout.popup.visible = false

    //
    scopeThis.handles.reloadAll(scopeThis).then(() => {
      if (scopeThis.pageData && scopeThis.pageData.data) {
        // 
        scopeThis.handles.getPageData(scopeThis).then(() => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  })
}

export default {
  passinPopup,
  passinSubmit,
  passoutPopup,
  passoutSubmit,
  cf: hdlsCarpassin.cf,
  dateFormat: hdlsCarpassin.dateFormat,
  cascade: hdlsCarpassin.cascade,
  init,
}
