import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.carwithin.find',
      insertOne: 'ly0d11.carwithin.insertOne',
      findOne: 'ly0d11.carwithin.findOne',
      updateOne: 'ly0d11.carwithin.updateOne',
      deleteOne: 'ly0d11.carwithin.deleteOne',
      getPageData: 'ly0d11.carwithin.getPageData',
    },
  }
}
export default {
  getStorpro,
}
