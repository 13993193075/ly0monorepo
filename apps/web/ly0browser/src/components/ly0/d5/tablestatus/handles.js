import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

// 获取页面数据
function getPageData(scopeThis) {
  return new Promise((resolve, reject) => {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d5.tablestatus.getPageData',
        data: {
          id_dataunit: ly0session.dataunit._id,
          id_restaurant: ly0session.user.id_restaurant ? ly0session.user.id_restaurant : null,
        },
      })
      .then((result) => {
        scopeThis.pageData = Object.assign(scopeThis.pageData, result.data)
        resolve()
      })
  })
}

// 用餐登记 - 发生新订单
function newBusinessSubmit(scopeThis) {
  dataRequest
    .storpro({
      scopeThis,
      storproName: 'ly0d5.tablestatus.newBusiness',
      data: Object.assign(scopeThis.newBusiness.dataBox.fieldsValue, {
        arrTable: scopeThis.arrNewBTable,
      }),
    })
    .then((result) => {
      scopeThis.$message(result.message)
      if (result.code !== 0) {
        return
      }

      // 关闭窗口
      scopeThis.newBusiness.popup.visible = false
      // 焦点订单及房态信息附加
      scopeThis.focus.id_business = result.id_business
      scopeThis.focus.status_code = '2'
      scopeThis.focus.status_text = '用餐'
      // 清空选中餐位数组
      scopeThis.arrNewBTable = []
      // 刷新页面
      scopeThis.reload()
    })
}

// 修改餐位状态
function setStatusSubmit(scopeThis) {
  if (
    scopeThis.focus.status_code === '2' &&
    scopeThis.setStatus.dataBox.fieldsValue.status_code === '1'
  ) {
    scopeThis
      .$confirm('设置为空位后，将删除订单与餐位信息的关联?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        setStatusSubmit0(scopeThis)
      })
      .catch(() => {
        scopeThis.$message({
          type: 'info',
          message: '取消提交',
        })
      })
  } else {
    setStatusSubmit0(scopeThis)
  }
}
function setStatusSubmit0(scopeThis) {
  return new Promise((resolve, reject) => {
    dataRequest
      .storpro({
        scopeThis: scopeThis,
        storproName: 'ly0d5.tablestatus.setStatus',
        data: {
          _id: scopeThis.focus._id,
          status_code: scopeThis.setStatus.dataBox.fieldsValue.status_code,
        },
      })
      .then((result) => {
        scopeThis.$message(result.message)
        if (result.code !== 0) {
          return resolve()
        }

        scopeThis.focus.status_code = scopeThis.setStatus.dataBox.fieldsValue.status_code
        scopeThis.focus.status_text = scopeThis.setStatus.dataBox.fieldsValue.status_text
        scopeThis.focus.id_business = null
        scopeThis.reload()
        resolve()
      })
  })
}

export default {
  getPageData,
  newBusinessSubmit,
  setStatusSubmit,
  dataRequest,
}
