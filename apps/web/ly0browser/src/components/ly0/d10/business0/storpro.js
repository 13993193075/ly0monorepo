import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d10business0.find',
      insertOne: 'ly0d10business0.insertOne',
      findOne: 'ly0d10business0.findOne',
      updateOne: 'ly0d10business0.updateOne',
      deleteOne: 'ly0d10business0.deleteOne',
      getPageData: 'ly0d10business0.getPageData',
      status0: 'ly0d10business0.status0',
      status1: 'ly0d10business0.status1',
      status2: 'ly0d10business0.status2',
    },
  }
}
export default {
  getStorpro,
}
