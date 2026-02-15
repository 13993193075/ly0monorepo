import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d1publish.find',
      findOne: 'ly0d6.d1publish.findOne',
      updateOne: 'ly0d6.d1publish.updateOne',
    },
  }
}

export default {
  getStorpro,
}
