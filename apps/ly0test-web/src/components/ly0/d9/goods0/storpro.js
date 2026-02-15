import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9goods0.find',
      insertOne: 'ly0d9goods0.insertOne',
      findOne: 'ly0d9goods0.findOne',
      updateOne: 'ly0d9goods0.updateOne',
      deleteOne: 'ly0d9goods0.deleteOne',
      getPageData: 'ly0d9goods0.getPageData',
    },
  }
}
export default {
  getStorpro,
}
