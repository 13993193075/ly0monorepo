import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9reader.find',
      insertOne: 'ly0d9reader.insertOne',
      findOne: 'ly0d9reader.findOne',
      updateOne: 'ly0d9reader.updateOne',
      deleteOne: 'ly0d9reader.deleteOne',
      getPageData: 'ly0d9reader.getPageData',
    },
  }
}
export default {
  getStorpro,
}
