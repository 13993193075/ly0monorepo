import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10group.find',
      insertOne: 'ly0d10group.insertOne',
      findOne: 'ly0d10group.findOne',
      updateOne: 'ly0d10group.updateOne',
      deleteOne: 'ly0d10group.deleteOne',
      getPageData: 'ly0d10group.getPageData',
    },
  }
}
export default {
  getStorpro,
}
