import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.carpark.find',
      insertOne: 'ly0d11.carpark.insertOne',
      findOne: 'ly0d11.carpark.findOne',
      updateOne: 'ly0d11.carpark.updateOne',
      deleteOne: 'ly0d11.carpark.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
