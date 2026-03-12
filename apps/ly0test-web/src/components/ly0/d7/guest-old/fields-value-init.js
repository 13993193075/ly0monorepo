import dataRequest from "../../../../utils/data-request.js"
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis){
    let find = {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        name: '',
        gbt2260code: "",
        address: "",
        tel: ""
    }
    let insertOne = {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        name: '',
        gbt2260code: "",
        gbt2260text: "",
        address: "",
        tel: "",
        postal: []
    }

    return {
        find,
        insertOne,
        doc: JSON.parse(JSON.stringify(insertOne)),
        updateOne: JSON.parse(JSON.stringify(insertOne))
    }
}

export default{
    getFieldsValue_init,
    ly0session
}
