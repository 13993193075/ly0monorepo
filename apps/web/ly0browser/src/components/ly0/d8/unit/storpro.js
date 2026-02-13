import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d8.unit.find',
      insertOne: 'ly0d8.unit.insertOne',
      findOne: 'ly0d8.unit.findOne',
      updateOne: 'ly0d8.unit.updateOne',
      deleteOne: 'ly0d8.unit.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
