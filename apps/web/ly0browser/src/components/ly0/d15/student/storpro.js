import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d15.student.find',
      insertOne: 'ly0d15.student.insertOne',
      findOne: 'ly0d15.student.findOne',
      updateOne: 'ly0d15.student.updateOne',
      deleteOne: 'ly0d15.student.deleteOne',
    },
  }
}

export default {
  getStorpro,
}
