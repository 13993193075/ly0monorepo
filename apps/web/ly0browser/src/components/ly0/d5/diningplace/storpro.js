import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.diningplace.find',
      insertOne: 'ly0d5.diningplace.insertOne',
      findOne: 'ly0d5.diningplace.findOne',
      updateOne: 'ly0d5.diningplace.updateOne',
      deleteOne: 'ly0d5.diningplace.deleteOne',
      getPageData: 'ly0d5.diningplace.getPageData',
    },
  }
}
export default {
  getStorpro,
}
