import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d12.appointment.find',
      insertOne: 'ly0d12.appointment.insertOne',
      findOne: 'ly0d12.appointment.findOne',
      updateOne: 'ly0d12.appointment.updateOne',
      deleteOne: 'ly0d12.appointment.deleteOne',
      getPageData: 'ly0d12.appointment.getPageData',
    },
  }
}
export default {
  getStorpro,
}
