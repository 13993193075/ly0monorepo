import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9unit.find',
      insertOne: 'ly0d9unit.insertOne',
      findOne: 'ly0d9unit.findOne',
      updateOne: 'ly0d9unit.updateOne',
      deleteOne: 'ly0d9unit.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
