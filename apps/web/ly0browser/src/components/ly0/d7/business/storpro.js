import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.business.find",
            insertOne: "ly0d7.business.insertOne",
            findOne: "ly0d7.business.findOne",
            updateOne: "ly0d7.business.updateOne",
            deleteOne: "ly0d7.business.deleteOne",
            getPageData: "ly0d7.business.getPageData",
            deal: "ly0d7.business.deal",
            trading: "ly0d7.business.trading",
            traded: "ly0d7.business.traded"
        }
    }
}
export default{
    getStorpro
}
