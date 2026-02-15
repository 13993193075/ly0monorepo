import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9meterrecord.find',
      insertOne: 'ly0d9meterrecord.insertOne',
      findOne: 'ly0d9meterrecord.findOne',
      updateOne: 'ly0d9meterrecord.updateOne',
      deleteOne: 'ly0d9meterrecord.deleteOne',
      getPageData: 'ly0d9meterrecord.getPageData',
      meterreading: 'ly0d9meterrecord.meterreading',
    },
  }
}
export default {
  getStorpro,
}
