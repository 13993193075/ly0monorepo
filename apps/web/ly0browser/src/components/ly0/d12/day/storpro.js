import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.day.find',
      insertOne: 'ly0d12.day.insertOne',
      findOne: 'ly0d12.day.findOne',
      updateOne: 'ly0d12.day.updateOne',
      deleteOne: 'ly0d12.day.deleteOne',
      getPageData: 'ly0d12.day.getPageData',
    },
  }
}
export default {
  getStorpro,
}
