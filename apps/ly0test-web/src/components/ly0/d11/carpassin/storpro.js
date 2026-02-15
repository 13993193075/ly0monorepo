import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.carpassin.find',
      insertOne: 'ly0d11.carpassin.insertOne',
      findOne: 'ly0d11.carpassin.findOne',
      updateOne: 'ly0d11.carpassin.updateOne',
      deleteOne: 'ly0d11.carpassin.deleteOne',
      getPageData: 'ly0d11.carpassin.getPageData',
    },
  }
}
export default {
  getStorpro,
}
