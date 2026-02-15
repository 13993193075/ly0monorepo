import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9property.find',
      findOne: 'ly0d9property.findOne',
      getPageData: 'ly0d9property.getPageData',
    },
  }
}
export default {
  getStorpro,
}
