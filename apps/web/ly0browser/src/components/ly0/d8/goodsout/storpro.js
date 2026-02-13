import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goodsout.find',
      insertOne: 'ly0d8.goodsout.insertOne',
      findOne: 'ly0d8.goodsout.findOne',
      updateOne: 'ly0d8.goodsout.updateOne',
      deleteOne: 'ly0d8.goodsout.deleteOne',
      getPageData: 'ly0d8.goodsout.getPageData',
    },
  }
}
export default {
  getStorpro,
}
