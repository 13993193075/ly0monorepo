import { request } from 'packages/ly0libs'
const ly0session = request.ly0.ly0sessionLoad()
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
