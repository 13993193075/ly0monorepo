import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goodsfrom.find',
      insertOne: 'ly0d8.goodsfrom.insertOne',
      findOne: 'ly0d8.goodsfrom.findOne',
      updateOne: 'ly0d8.goodsfrom.updateOne',
      deleteOne: 'ly0d8.goodsfrom.deleteOne',
      getPageData: 'ly0d8.goodsfrom.getPageData',
    },
  }
}
export default {
  getStorpro,
}
