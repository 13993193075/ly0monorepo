import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.sale.find',
      insertOne: 'ly0d8.sale.insertOne',
      findOne: 'ly0d8.sale.findOne',
      updateOne: 'ly0d8.sale.updateOne',
      deleteOne: 'ly0d8.sale.deleteOne',
      getPageData: 'ly0d8.sale.getPageData',
    },
  }
}
export default {
  getStorpro,
}
