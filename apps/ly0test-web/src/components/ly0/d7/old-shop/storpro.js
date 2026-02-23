import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.shop.find",
            insertOne: "ly0d7.shop.insertOne",
            findOne: "ly0d7.shop.findOne",
            updateOne: "ly0d7.shop.updateOne",
            deleteOne: "ly0d7.shop.deleteOne"
        }
    }
}

export default{
    getStorpro
}
