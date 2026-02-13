import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d1approval.find',
      findOne: 'ly0d6.d1approval.findOne',
      updateOne: 'ly0d6.d1approval.updateOne',
    },
  }
}

export default {
  getStorpro,
}
