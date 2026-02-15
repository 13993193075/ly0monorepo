import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10unit.find',
      insertOne: 'ly0d10unit.insertOne',
      findOne: 'ly0d10unit.findOne',
      updateOne: 'ly0d10unit.updateOne',
      deleteOne: 'ly0d10unit.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
