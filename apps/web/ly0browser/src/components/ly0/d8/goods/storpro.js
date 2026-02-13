import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goods.find',
      insertOne: 'ly0d8.goods.insertOne',
      findOne: 'ly0d8.goods.findOne',
      updateOne: 'ly0d8.goods.updateOne',
      deleteOne: 'ly0d8.goods.deleteOne',
      getPageData: 'ly0d8.goods.getPageData',
    },
  }
}
export default {
  getStorpro,
}
