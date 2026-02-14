import {request as ly0request} from 'packages/ly0libs'
const ly0session = ly0request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_group: null,
        name: ''
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
