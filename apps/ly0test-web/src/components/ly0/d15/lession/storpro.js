import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d15.lession.find',
      insertOne: 'ly0d15.lession.insertOne',
      findOne: 'ly0d15.lession.findOne',
      updateOne: 'ly0d15.lession.updateOne',
      deleteOne: 'ly0d15.lession.deleteOne',
      getPageData: 'ly0d15.lession.getPageData',
    },
  }
}

export default {
  getStorpro,
}
