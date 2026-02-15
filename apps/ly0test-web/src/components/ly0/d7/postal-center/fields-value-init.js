function getFieldsValue_init(scopeThis){
    let find = {
        _id: null,
        id_dataunit: null,
        number: "",
        name: "",
        id_business: null,
        postal_status_code: "",
        postal_time_start: null,
        postal_time_end: null,
        postal_sorted_time_start: null,
        postal_sorted_time_end: null,
        postal_received_time_start: null,
        postal_received_time_end: null,
        postal_gbt2260code: "",
        postal_tel: "",
        postal_name: ""
    }
    return {
        find
    }
}

export default{
    getFieldsValue_init
}
