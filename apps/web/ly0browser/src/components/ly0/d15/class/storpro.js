import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d15.class.find',
      insertOne: 'ly0d15.class.insertOne',
      findOne: 'ly0d15.class.findOne',
      updateOne: 'ly0d15.class.updateOne',
      deleteOne: 'ly0d15.class.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
