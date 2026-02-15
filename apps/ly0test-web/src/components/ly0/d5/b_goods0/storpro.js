import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.b_goods0.find',
      insertOne: 'ly0d5.b_goods0.insertOne',
      findOne: 'ly0d5.b_goods0.findOne',
      updateOne: 'ly0d5.b_goods0.updateOne',
      deleteOne: 'ly0d5.b_goods0.deleteOne',
      getPageData: 'ly0d5.b_goods0.getPageData',
    },
  }
}
export default {
  getStorpro,
}
