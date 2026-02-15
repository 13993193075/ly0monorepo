import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10business.find',
      insertOne: 'ly0d10business.insertOne',
      findOne: 'ly0d10business.findOne',
      updateOne: 'ly0d10business.updateOne',
      deleteOne: 'ly0d10business.deleteOne',
      getPageData: 'ly0d10business.getPageData',
      deal: 'ly0d10business.deal',
      status0: 'ly0d10business.status0',
      status1: 'ly0d10business.status1',
      status2: 'ly0d10business.status2',
    },
  }
}
export default {
  getStorpro,
}
