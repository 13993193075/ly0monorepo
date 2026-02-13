import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.memo.find',
      insertOne: 'ly0d5.memo.insertOne',
      findOne: 'ly0d5.memo.findOne',
      updateOne: 'ly0d5.memo.updateOne',
      deleteOne: 'ly0d5.memo.deleteOne',
    },
  }
}
export default {
  getStorpro,
}
