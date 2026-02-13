import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d0staticres.find',
      insertOne: 'ly0d6.d0staticres.insertOne',
      findOne: 'ly0d6.d0staticres.findOne',
      updateOne: 'ly0d6.d0staticres.updateOne',
      deleteOne: 'ly0d6.d0staticres.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
