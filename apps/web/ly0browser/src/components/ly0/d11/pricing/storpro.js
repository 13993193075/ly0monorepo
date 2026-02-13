import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.pricing.find',
      insertOne: 'ly0d11.pricing.insertOne',
      findOne: 'ly0d11.pricing.findOne',
      updateOne: 'ly0d11.pricing.updateOne',
      deleteOne: 'ly0d11.pricing.deleteOne',
      getPageData: 'ly0d11.pricing.getPageData',
    },
  }
}
export default {
  getStorpro,
}
