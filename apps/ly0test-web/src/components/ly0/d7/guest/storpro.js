import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.guest.find",
            insertOne: "ly0d7.guest.insertOne",
            findOne: "ly0d7.guest.findOne",
            updateOne: "ly0d7.guest.updateOne",
            deleteOne: "ly0d7.guest.deleteOne"
        }
    }
}

export default{
    getStorpro
}
