import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.b_goods1.find',
      insertOne: 'ly0d5.b_goods1.insertOne',
      findOne: 'ly0d5.b_goods1.findOne',
      updateOne: 'ly0d5.b_goods1.updateOne',
      deleteOne: 'ly0d5.b_goods1.deleteOne',
      getPageData: 'ly0d5.b_goods1.getPageData',
    },
  }
}
export default {
  getStorpro,
}
