import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9position.find',
      insertOne: 'ly0d9position.insertOne',
      findOne: 'ly0d9position.findOne',
      updateOne: 'ly0d9position.updateOne',
      deleteOne: 'ly0d9position.deleteOne',
      getPageData: 'ly0d9position.getPageData',
    },
  }
}
export default {
  getStorpro,
}
