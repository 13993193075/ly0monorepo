import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.memo.find",
            insertOne: "ly0d7.memo.insertOne",
            findOne: "ly0d7.memo.findOne",
            updateOne: "ly0d7.memo.updateOne",
            deleteOne: "ly0d7.memo.deleteOne"
        }
    }
}
export default{
    getStorpro
}
