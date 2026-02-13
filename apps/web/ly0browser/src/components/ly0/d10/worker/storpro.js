import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10worker.find',
      insertOne: 'ly0d10worker.insertOne',
      findOne: 'ly0d10worker.findOne',
      updateOne: 'ly0d10worker.updateOne',
      deleteOne: 'ly0d10worker.deleteOne',
      getPageData: 'ly0d10worker.getPageData',
    },
  }
}
export default {
  getStorpro,
}
