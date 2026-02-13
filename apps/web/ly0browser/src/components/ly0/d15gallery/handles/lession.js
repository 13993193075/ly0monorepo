import dataRequest from '../../../../utils/data-request.js'
const ly0session = dataRequest.ly0sessionLoad()

function getData(scopeThis) {
  scopeThis.srcPrefix = dataRequest.srcPrefix
  dataRequest
    .storpro({
      scopeThis,
      storproName: 'ly0d15.lession.find',
      data: {
        query: {
          id_dataunit: ly0session.gallery.id_dataunit,
        },
        limit: scopeThis.dataBox.query.limit,
        page: scopeThis.dataBox.query.page,
        sort: scopeThis.dataBox.query.sort,
      },
    })
    .then((result) => {
      scopeThis.dataBox.data = result.data
      scopeThis.dataBox.count = result.count
    })
}

export default {
  getData,
}
