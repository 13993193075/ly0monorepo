import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.goods0group.find',
      insertOne: 'ly0d5.goods0group.insertOne',
      findOne: 'ly0d5.goods0group.findOne',
      updateOne: 'ly0d5.goods0group.updateOne',
      deleteOne: 'ly0d5.goods0group.deleteOne',
      getPageData: 'ly0d5.goods0group.getPageData',
    },
  }
}
export default {
  getStorpro,
}
