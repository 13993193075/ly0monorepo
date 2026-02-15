import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10memo.find',
      insertOne: 'ly0d10memo.insertOne',
      findOne: 'ly0d10memo.findOne',
      updateOne: 'ly0d10memo.updateOne',
      deleteOne: 'ly0d10memo.deleteOne',
    },
  }
}
export default {
  getStorpro,
}
