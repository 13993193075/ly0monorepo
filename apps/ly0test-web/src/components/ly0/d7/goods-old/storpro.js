import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.goods.find",
            insertOne: "ly0d7.goods.insertOne",
            findOne: "ly0d7.goods.findOne",
            updateOne: "ly0d7.goods.updateOne",
            deleteOne: "ly0d7.goods.deleteOne",
            getPageData: "ly0d7.goods.getPageData"
        }
    }
}
export default{
    getStorpro
}
