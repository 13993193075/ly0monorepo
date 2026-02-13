import dataRequest from '../../../../utils/data-request.js'

function getStorpro(scopeThis) {
  return {
    storpro: dataRequest.storpro,
    storproNames: {
      find: 'ly0d11.carpassin.find',
      findOne: 'ly0d11.carpassin.findOne',
      passin: 'ly0d11.carplate-find.passin',
      passout: 'ly0d11.carplate-find.passout',
      getPageData: 'ly0d11.carpassin.getPageData',
    },
  }
}
export default {
  getStorpro,
}
