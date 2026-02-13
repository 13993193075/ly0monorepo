import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d0approval.find',
      findOne: 'ly0d6.d0approval.findOne',
      updateOne: 'ly0d6.d0approval.updateOne',
    },
  }
}

export default {
  getStorpro,
}
