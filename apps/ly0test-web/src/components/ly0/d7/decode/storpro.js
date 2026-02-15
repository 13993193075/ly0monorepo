import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.decode.find",
            insertOne: "ly0d7.decode.insertOne",
            findOne: "ly0d7.decode.findOne",
            updateOne: "ly0d7.decode.updateOne",
            deleteOne: "ly0d7.decode.deleteOne",
            getPageData: "ly0d7.decode.getPageData"
        }
    }
}
export default{
    getStorpro
}
