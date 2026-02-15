import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.position.find',
      insertOne: 'ly0d12.position.insertOne',
      findOne: 'ly0d12.position.findOne',
      updateOne: 'ly0d12.position.updateOne',
      deleteOne: 'ly0d12.position.deleteOne',
      getPageData: 'ly0d12.position.getPageData',
    },
  }
}
export default {
  getStorpro,
}
