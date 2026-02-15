import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

//获取页面数据
function getPageData(scopeThis) {
  return new Promise((resolve, reject) => {
    dataRequest
      .storpro({
        scopeThis,
        storproName: 'ly0d5.tablestatus0.getPageData',
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

export default {
  getPageData,
}
