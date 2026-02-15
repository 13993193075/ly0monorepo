import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goodsto.find',
      insertOne: 'ly0d8.goodsto.insertOne',
      findOne: 'ly0d8.goodsto.findOne',
      updateOne: 'ly0d8.goodsto.updateOne',
      deleteOne: 'ly0d8.goodsto.deleteOne',
      getPageData: 'ly0d8.goodsto.getPageData',
    },
  }
}
export default {
  getStorpro,
}
