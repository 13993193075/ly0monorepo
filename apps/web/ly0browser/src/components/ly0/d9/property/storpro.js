import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9property.find',
      insertOne: 'ly0d9property.insertOne',
      findOne: 'ly0d9property.findOne',
      updateOne: 'ly0d9property.updateOne',
      deleteOne: 'ly0d9property.deleteOne',
      getPageData: 'ly0d9property.getPageData',
    },
  }
}
export default {
  getStorpro,
}
