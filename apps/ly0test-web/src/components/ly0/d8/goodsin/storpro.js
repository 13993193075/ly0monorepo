import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goodsin.find',
      insertOne: 'ly0d8.goodsin.insertOne',
      findOne: 'ly0d8.goodsin.findOne',
      updateOne: 'ly0d8.goodsin.updateOne',
      deleteOne: 'ly0d8.goodsin.deleteOne',
      getPageData: 'ly0d8.goodsin.getPageData',
    },
  }
}
export default {
  getStorpro,
}
