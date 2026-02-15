import dataRequest from "../../../../utils/data-request.js"

function getStorpro(scopeThis){
    return {
        storpro: dataRequest.storpro,
        storproNames: {
            find: "ly0d7.b_goods.find",
            insertOne: "ly0d7.b_goods.insertOne",
            findOne: "ly0d7.b_goods.findOne",
            updateOne: "ly0d7.b_goods.updateOne",
            deleteOne: "ly0d7.b_goods.deleteOne",
            getPageData: "ly0d7.b_goods.getPageData"
        }
    }
}
export default{
    getStorpro
}
