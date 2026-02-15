import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.goodsgroup.find',
      insertOne: 'ly0d8.goodsgroup.insertOne',
      findOne: 'ly0d8.goodsgroup.findOne',
      updateOne: 'ly0d8.goodsgroup.updateOne',
      deleteOne: 'ly0d8.goodsgroup.deleteOne',
      getPageData: 'ly0d8.goodsgroup.getPageData',
    },
  }
}
export default {
  getStorpro,
}
