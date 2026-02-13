import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d1draft.find',
      insertOne: 'ly0d6.d1draft.insertOne',
      findOne: 'ly0d6.d1draft.findOne',
      updateOne: 'ly0d6.d1draft.updateOne',
      deleteOne: 'ly0d6.d1draft.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
