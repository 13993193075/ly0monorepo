import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9goods.find',
      insertOne: 'ly0d9goods.insertOne',
      findOne: 'ly0d9goods.findOne',
      updateOne: 'ly0d9goods.updateOne',
      deleteOne: 'ly0d9goods.deleteOne',
      getPageData: 'ly0d9goods.getPageData',
    },
  }
}
export default {
  getStorpro,
}
