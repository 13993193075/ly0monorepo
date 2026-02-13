import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d0publish.find',
      findOne: 'ly0d6.d0publish.findOne',
      updateOne: 'ly0d6.d0publish.updateOne',
    },
  }
}

export default {
  getStorpro,
}
