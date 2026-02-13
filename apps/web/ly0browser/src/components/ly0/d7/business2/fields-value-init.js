import dataRequest from "../../../../utils/data-request.js"
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init(scopeThis){
    let find = {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_shop: ly0session.user.id_shop ? ly0session.user.id_shop : null,
        status_code: "2", // 订单状态：交易完成
        time_start: null,
        time_end: null,
        client_cellphone: "",
        client_name: ""
    }
    let insertOne = {
        _id: null,
        id_dataunit: null,
        dataunit_name: "",
        id_shop: null,
        shop_name: "",
        status_code: "2", // 订单状态：交易完成
        status_text: "",
        time: null,
        client_cellphone: "",
        client_name: ""
    }

    return {
        find,
        insertOne,
        doc: insertOne,
        updateOne: insertOne
    }
}

export default{
    getFieldsValue_init,
    ly0session
}
