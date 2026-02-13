import {request} from '@yoooloo42/ihavebacking'
const ly0session = request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_login: null,
        number: "",
        cellphone: "",
        email: "",
        wx_appid: "",
        wx_openid: "",
        type: "",
        id_dataunit: ly0session.dataunit._id,
        id_group: null,
        id_user: null,
        user_tbl: "",
        time_start:  null,
        time_end:  null,
        memo: ""
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
