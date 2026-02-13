import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.warden.find',
      insertOne: 'ly0d11.warden.insertOne',
      findOne: 'ly0d11.warden.findOne',
      updateOne: 'ly0d11.warden.updateOne',
      deleteOne: 'ly0d11.warden.deleteOne',
      getPageData: 'ly0d11.warden.getPageData',
    },
  }
}
export default {
  getStorpro,
}
