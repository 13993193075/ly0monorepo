import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.stock.find',
      findOne: 'ly0d8.stock.findOne',
      getPageData: 'ly0d8.stock.getPageData',
    },
  }
}
export default {
  getStorpro,
}
