import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.goods.find',
      insertOne: 'ly0d5.goods.insertOne',
      findOne: 'ly0d5.goods.findOne',
      updateOne: 'ly0d5.goods.updateOne',
      deleteOne: 'ly0d5.goods.deleteOne',
      getPageData: 'ly0d5.goods.getPageData',
      setRecommend: 'ly0d5.goods.setRecommend',
    },
  }
}
export default {
  getStorpro,
}
