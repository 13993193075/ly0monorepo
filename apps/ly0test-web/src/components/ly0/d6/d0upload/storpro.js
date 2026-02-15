import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d6.d0upload.find',
      insertOne: 'ly0d6.d0upload.insertOne',
      findOne: 'ly0d6.d0upload.findOne',
      updateOne: 'ly0d6.d0upload.updateOne',
      deleteOne: 'ly0d6.d0upload.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
