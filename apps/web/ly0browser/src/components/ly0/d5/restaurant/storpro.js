import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.restaurant.find',
      insertOne: 'ly0d5.restaurant.insertOne',
      findOne: 'ly0d5.restaurant.findOne',
      updateOne: 'ly0d5.restaurant.updateOne',
      deleteOne: 'ly0d5.restaurant.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
