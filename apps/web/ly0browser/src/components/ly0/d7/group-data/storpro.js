import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.group.find",
            insertOne: "ly0d7.group.insertOne",
            findOne: "ly0d7.group.findOne",
            updateOne: "ly0d7.group.updateOne",
            deleteOne: "ly0d7.group.deleteOne"
        }
    }
}

export default{
    getStorpro
}
