import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.purchase.find',
      insertOne: 'ly0d8.purchase.insertOne',
      findOne: 'ly0d8.purchase.findOne',
      updateOne: 'ly0d8.purchase.updateOne',
      deleteOne: 'ly0d8.purchase.deleteOne',
      getPageData: 'ly0d8.purchase.getPageData',
    },
  }
}
export default {
  getStorpro,
}
