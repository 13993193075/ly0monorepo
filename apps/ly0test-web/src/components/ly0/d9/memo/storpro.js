import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9memo.find',
      insertOne: 'ly0d9memo.insertOne',
      findOne: 'ly0d9memo.findOne',
      updateOne: 'ly0d9memo.updateOne',
      deleteOne: 'ly0d9memo.deleteOne',
    },
  }
}
export default {
  getStorpro,
}
