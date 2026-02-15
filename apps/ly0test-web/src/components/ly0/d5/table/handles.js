// 级联：餐馆
import printJS from 'print-js'
import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

// 新增窗口弹出前的处理
function insertOnePopupBefore(scopeThis) {
  if (scopeThis.pageData.data.arrRestaurant.length === 1) {
    scopeThis.pageData.data.arrDiningplace0 = scopeThis.pageData.data.arrDiningplace.filter((i) => {
      return '' + i.id_restaurant === '' + scopeThis.pageData.data.arrRestaurant[0]._id
    })
  }
}

// 新增提交前的处理
function insertOneSubmitBefore(scopeThis) {
  if (scopeThis.pageData.data.arrRestaurant.length === 1) {
    scopeThis.formDataBox.insertOne.fieldsValue.id_restaurant =
      scopeThis.pageData.data.arrRestaurant[0]._id
  }
}

// 修改窗口弹出前的处理
function updateOnePopupBefore(scopeThis) {
  scopeThis.pageData.data.arrDiningplace0 = scopeThis.pageData.data.arrDiningplace.filter((i) => {
    return '' + i.id_restaurant === '' + scopeThis.formDataBox.updateOne.fieldsValue.id_restaurant
  })
}

// 获取选中的餐位数组
function getArrSelection(scopeThis, arr) {
  scopeThis.arrSelection = JSON.parse(JSON.stringify(arr))
}

// 弹出：打印二维码
function qrcodePopup(scopeThis) {
  scopeThis.qrcode.data = JSON.parse(JSON.stringify(scopeThis.arrSelection))
  scopeThis.qrcode.popup.visible = true
}

// 打印二维码
function qrcodePrint(elId) {
  printJS({
    printable: elId,
    type: 'html',
    scanStyles: false,
    style: 'table { border-collapse: collapse }',
  })
}

// 弹出：打印小程序码
function wxacodePopup(scopeThis) {
  scopeThis.wxacode.data = JSON.parse(JSON.stringify(scopeThis.arrSelection))
  scopeThis.wxacode.popup.visible = true

  scopeThis.$nextTick(() => {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d5.table.getWxacode',
        data: {
          id_dataunit: ly0session.dataunit._id,
          id_restaurant: ly0session.user.id_restaurant ? ly0session.user.id_restaurant : null,
          arrTable: scopeThis.wxacode.data,
        },
      })
      .then((result) => {
        scopeThis.$message(result.message)
        if (result.code === 1) {
          return
        }

        for (let i = 0; i < result.data.length; i++) {
          document.getElementById('wxacode.' + result.data[i].data.scene).src =
            'data:image/png;base64,' + result.data[i].data.base64
        }
      })
  })
}

export default {
  findPopupBefore: insertOnePopupBefore, // 查询窗口弹出前的处理
  insertOnePopupBefore,
  insertOneSubmitBefore,
  updateOnePopupBefore,
  getArrSelection,
  qrcodePopup,
  qrcodePrint,
  wxacodePopup,
}
