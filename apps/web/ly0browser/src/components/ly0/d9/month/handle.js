import dataRequest from '../../../../utils/data-request.js'
import excel from "../../../../libs/excel.js"

// 获取报表数据
function getReportData(scopeThis) {
  scopeThis.$message('开始统计')
  scopeThis.loading = true
  scopeThis.loadingText = '正在统计中，可能需要较长时间，请稍候'

  return new Promise((resolve, reject) => {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d9report.month',
        data: {
          id_dataunit: dataRequest.ly0sessionLoad().dataunit._id,
          timeFrom: scopeThis.reqData.timeFrom,
          timeTo: scopeThis.reqData.timeTo,
        },
      })
      .then((result) => {
        scopeThis.reportData = JSON.parse(JSON.stringify(result.data))
        scopeThis.reportData.sumGoods = 0
        scopeThis.reportData.sumGoods0 = 0
        scopeThis.reportData.sumAll = 0
        scopeThis.reportData.goods.forEach((iGoods) => {
          iGoods.deal = 0 // 附加字段：分项合计
          scopeThis.reportData.bGoods.forEach((iBGoods) => {
            if (iBGoods.id_goods === iGoods._id) {
              iGoods.deal = iGoods.deal + iBGoods.deal
              scopeThis.reportData.sumGoods = scopeThis.reportData.sumGoods + iBGoods.deal
              scopeThis.reportData.sumAll = scopeThis.reportData.sumAll + iBGoods.deal
            }
          })
        })
        scopeThis.reportData.goods0.forEach((iGoods) => {
          iGoods.deal = 0 // 附加字段：分项合计
          scopeThis.reportData.bGoods0.forEach((iBGoods) => {
            if (iBGoods.id_goods === iGoods._id) {
              iGoods.deal = iGoods.deal + iBGoods.deal
              scopeThis.reportData.sumGoods0 = scopeThis.reportData.sumGoods0 + iBGoods.deal
              scopeThis.reportData.sumAll = scopeThis.reportData.sumAll + iBGoods.deal
            }
          })
        })

        scopeThis.loading = false
        scopeThis.loadingText = ''
        scopeThis.$message('统计完成')
        resolve()
      })
  })
}

export default {
  getReportData,
  excel,
}
