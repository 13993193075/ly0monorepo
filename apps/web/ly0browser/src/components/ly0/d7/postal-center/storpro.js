import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.postal-center.find",
            setPostalStatus: "ly0d7.postal-center.setPostalStatus",
            getPageData: "ly0d7.postal-center.getPageData"
        }
    }
}
export default{
    getStorpro
}
