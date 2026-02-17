import { request as ly0request } from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
