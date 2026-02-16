import { request as ly0request } from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0request.ly0sessionLoad()
export default {
    query: {
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
    },
    data: {
        arrHotel: [],
        arrGoods: [],
        arrGoods0: [],
        arrMethod: [],
    }
}
