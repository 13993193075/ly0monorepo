import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.goodsgroup.find',
      insertOne: 'ly0d5.goodsgroup.insertOne',
      findOne: 'ly0d5.goodsgroup.findOne',
      updateOne: 'ly0d5.goodsgroup.updateOne',
      deleteOne: 'ly0d5.goodsgroup.deleteOne',
      getPageData: 'ly0d5.goodsgroup.getPageData',
    },
  }
}
export default {
  getStorpro,
}
