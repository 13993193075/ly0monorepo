import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.place.find',
      insertOne: 'ly0d12.place.insertOne',
      findOne: 'ly0d12.place.findOne',
      updateOne: 'ly0d12.place.updateOne',
      deleteOne: 'ly0d12.place.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
