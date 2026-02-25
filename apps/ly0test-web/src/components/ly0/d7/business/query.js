import { request as ly0request } from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_shop: ly0session.user.id_shop ? ly0session.user.id_shop : null,
        status_code: '',
        time_start: null,
        time_end: null,
        client_cellphone: '',
        client_name: '',
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
