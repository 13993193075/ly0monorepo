import { request } from 'packages/ly0libs'
const ly0session = request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        name: '',
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
