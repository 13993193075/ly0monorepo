import { request } from '@yoooloo42/ihavebacking'
const ly0session = request.ly0.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        cellphone: '',
        status_code: '',
        checkin_start: null,
        checkin_end: null,
        checkout_start: null,
        checkout_end: null,
        id_booktype: null,
        client_cellphone: '',
        client_name: '',
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
