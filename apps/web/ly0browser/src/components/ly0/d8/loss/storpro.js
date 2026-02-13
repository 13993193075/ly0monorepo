import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.loss.find',
      insertOne: 'ly0d8.loss.insertOne',
      findOne: 'ly0d8.loss.findOne',
      updateOne: 'ly0d8.loss.updateOne',
      deleteOne: 'ly0d8.loss.deleteOne',
      getPageData: 'ly0d8.loss.getPageData',
    },
  }
}
export default {
  getStorpro,
}
