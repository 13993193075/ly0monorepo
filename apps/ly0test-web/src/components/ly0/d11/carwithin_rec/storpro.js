import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.carwithin_rec.find',
      insertOne: 'ly0d11.carwithin_rec.insertOne',
      findOne: 'ly0d11.carwithin_rec.findOne',
      updateOne: 'ly0d11.carwithin_rec.updateOne',
      deleteOne: 'ly0d11.carwithin_rec.deleteOne',
      getPageData: 'ly0d11.carwithin_rec.getPageData',
    },
  }
}
export default {
  getStorpro,
}
