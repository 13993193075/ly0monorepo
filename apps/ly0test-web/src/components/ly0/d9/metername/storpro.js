import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9metername.find',
      insertOne: 'ly0d9metername.insertOne',
      findOne: 'ly0d9metername.findOne',
      updateOne: 'ly0d9metername.updateOne',
      deleteOne: 'ly0d9metername.deleteOne',
      getPageData: 'ly0d9metername.getPageData',
    },
  }
}
export default {
  getStorpro,
}
