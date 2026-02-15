import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d9sizetype.find',
      insertOne: 'ly0d9sizetype.insertOne',
      findOne: 'ly0d9sizetype.findOne',
      updateOne: 'ly0d9sizetype.updateOne',
      deleteOne: 'ly0d9sizetype.deleteOne',
      getPageData: 'ly0d9sizetype.getPageData',
    },
  }
}
export default {
  getStorpro,
}
