import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.b_table.find',
      insertOne: 'ly0d5.b_table.insertOne',
      findOne: 'ly0d5.b_table.findOne',
      updateOne: 'ly0d5.b_table.updateOne',
      deleteOne: 'ly0d5.b_table.deleteOne',
      getPageData: 'ly0d5.b_table.getPageData',
    },
  }
}
export default {
  getStorpro,
}
