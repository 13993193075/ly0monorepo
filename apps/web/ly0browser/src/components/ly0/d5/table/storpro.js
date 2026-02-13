import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.table.find',
      insertOne: 'ly0d5.table.insertOne',
      findOne: 'ly0d5.table.findOne',
      updateOne: 'ly0d5.table.updateOne',
      deleteOne: 'ly0d5.table.deleteOne',
      getPageData: 'ly0d5.table.getPageData',
      getWxacode: 'ly0d5.table.getWxacode',
    },
  }
}
export default {
  getStorpro,
}
