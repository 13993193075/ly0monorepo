import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10memo0.find',
      insertOne: 'ly0d10memo0.insertOne',
      findOne: 'ly0d10memo0.findOne',
      updateOne: 'ly0d10memo0.updateOne',
      deleteOne: 'ly0d10memo0.deleteOne',
    },
  }
}
export default {
  getStorpro,
}
