import {request} from '@yoooloo42/ihavebacking'
const ly0session = request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
