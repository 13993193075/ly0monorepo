import dataRequest from "../../../../utils/data-request.js"
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis){
    let find = {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_shop: ly0session.user.id_shop ? ly0session.user.id_shop : null,
        name: "",
        group: [],
        size: [],
        import: null,
        domestic_code: "",
        foreign_code: ""
    }
    let insertOne = {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        dataunit_name: "",
        id_shop: null,
        shop_name: "",
        name: "",
        group: [],
        size: [],
        price: [],
        import: false,
        domestic_code: "",
        domestic: "",
        foreign_code: "",
        foreign: "",

        thumb: "",
        thumbDelete: false,
        thumbNew: "",

        illustration: [],
        illustrationDelete: [],
        illustrationNew: []
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
    ly0session,
    srcPrefix: dataRequest.srcPrefix, // ͼƬsrcǰ׺
    upload: dataRequest.upload, // �ϴ�·��
}
