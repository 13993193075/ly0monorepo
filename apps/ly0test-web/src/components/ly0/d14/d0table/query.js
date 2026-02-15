import {ly0request} from '@yoooloo42/ly0browser/ly0request'
const ly0session = ly0request.ly0sessionLoad()
export default {
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        time_start: null,
        time_end: null,
        f0name: '',
        f0birthdate_start: null,
        f0birthdate_end: null,
        f0idnumber: '',
        f0nation_code: '',
        f0nativeplace_code: '',
        f0education_code: '',
        f0occupation_code: '',
        f0insurance_code: '',
        f0income_code: '',
        f0address_code: '',
        f0cellphone: '',
    },
    sort: null,
    pageSize: 10,
    currentPage: 1,
}
