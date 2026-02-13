import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.room.find',
      insertOne: 'ly0d12.room.insertOne',
      findOne: 'ly0d12.room.findOne',
      updateOne: 'ly0d12.room.updateOne',
      deleteOne: 'ly0d12.room.deleteOne',
      getPageData: 'ly0d12.room.getPageData',
    },
  }
}
export default {
  getStorpro,
}
