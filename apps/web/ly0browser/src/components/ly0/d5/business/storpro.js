import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d5.business.find',
      insertOne: 'ly0d5.business.insertOne',
      findOne: 'ly0d5.business.findOne',
      updateOne: 'ly0d5.business.updateOne',
      deleteOne: 'ly0d5.business.deleteOne',
      getPageData: 'ly0d5.business.getPageData',
      deal: 'ly0d5.business.deal',
      book: 'ly0d5.business.book',
      arrive: 'ly0d5.business.arrive',
      leave: 'ly0d5.business.leave',
    },
  }
}
export default {
  getStorpro,
}
