import { request } from 'packages/ly0libs/src/index.js'
const ly0session = request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        cellphone: '',
        name: ''
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
