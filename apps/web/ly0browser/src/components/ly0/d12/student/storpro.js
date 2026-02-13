import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.student.find',
      insertOne: 'ly0d12.student.insertOne',
      findOne: 'ly0d12.student.findOne',
      updateOne: 'ly0d12.student.updateOne',
      deleteOne: 'ly0d12.student.deleteOne',
    },
  }
}
export default {
  getStorpro,
}
