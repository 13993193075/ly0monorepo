import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.self.find',
      insertOne: 'ly0d11.self.insertOne',
      findOne: 'ly0d11.self.findOne',
      updateOne: 'ly0d11.self.updateOne',
      deleteOne: 'ly0d11.self.deleteOne',
      getPageData: 'ly0d11.self.getPageData',
    },
  }
}
export default {
  getStorpro,
}
