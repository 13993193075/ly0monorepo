import dateFormat from '../../../../utils/date-format.js'
import cascade from './cascade.js'
import dataRequest from '../../../../utils/data-request.js'

//
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
    cascade.id_carpark0(scopeThis, 'insertOne')
  }
}

//
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrCarpark.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_carpark =
      scopeThis.pageData.data.arrCarpark[0]._id
  }
  scopeThis.formDataBox.insertOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.price0 * 100,
  )
  scopeThis.formDataBox.insertOne.fieldsValue.fee = Math.floor(
    scopeThis.formDataBox.insertOne.fieldsValue.fee0 * 100,
  )
}

//
function updateOnePopupBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.price) / 100
  scopeThis.formDataBox.updateOne.fieldsValue.fee0 =
    Math.floor(scopeThis.formDataBox.updateOne.fieldsValue.fee) / 100
  cascade.id_carpark0(scopeThis, 'updateOne')
}

//
function updateOneSubmitBefore(scopeThis) {
  scopeThis.formDataBox.updateOne.fieldsValue.price = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.price0 * 100,
  )
  scopeThis.formDataBox.updateOne.fieldsValue.fee = Math.floor(
    scopeThis.formDataBox.updateOne.fieldsValue.fee0 * 100,
  )
}

//
function cf(scopeThis, branch) {
  dataRequest
    .storpro({
      storproName: 'ly0d11.carplate-find.cf',
      data: {
        id_carpark: scopeThis.formDataBox[branch].fieldsValue.id_carpark,
        carplate: scopeThis.formDataBox[branch].fieldsValue.carplate,
        id_pricing: scopeThis.formDataBox[branch].fieldsValue.id_pricing
          ? scopeThis.formDataBox[branch].fieldsValue.id_pricing
          : null,
        timein: scopeThis.formDataBox[branch].fieldsValue.timein
          ? scopeThis.formDataBox[branch].fieldsValue.timein
          : null,
        timeout: scopeThis.formDataBox[branch].fieldsValue.timeout
          ? scopeThis.formDataBox[branch].fieldsValue.timeout
          : null,
      },
    })
    .then((result) => {
      scopeThis.$message(result.message)
      if (result.code === 0) {
        scopeThis.formDataBox[branch].fieldsValue.carwithin = result.data.objCarwithin
          ? true
          : false
        scopeThis.formDataBox[branch].fieldsValue.expiryfrom = result.data.objCarwithin
          ? result.data.objCarwithin.expiryfrom
          : null
        scopeThis.formDataBox[branch].fieldsValue.expiryto = result.data.objCarwithin
          ? result.data.objCarwithin.expiryto
          : null
        scopeThis.formDataBox[branch].fieldsValue.timein = result.data.timein
        scopeThis.formDataBox[branch].fieldsValue.timeout = result.data.timeout
        scopeThis.formDataBox[branch].fieldsValue.price = result.data.fee
        scopeThis.formDataBox[branch].fieldsValue.price0 =
          Math.floor(scopeThis.formDataBox[branch].fieldsValue.price) / 100
        scopeThis.formDataBox[branch].fieldsValue.fee =
          scopeThis.formDataBox[branch].fieldsValue.price
        scopeThis.formDataBox[branch].fieldsValue.fee0 =
          Math.floor(scopeThis.formDataBox[branch].fieldsValue.fee) / 100
        // 
        scopeThis.formDataBox[branch].fieldsValue.id_carpassin = result.data.objCarpassin
          ? result.data.objCarpassin._id
          : null
      }
    })
}

export default {
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  updateOneSubmitBefore,
  cf,
  dateFormat,
  cascade,
  dataRequest,
}
