import wxShow from "./wx-show.js"
import {request as ly0request} from '@yoooloo42/ly0browser'

export default {
    data: {
        id_login: ly0request.ly0request.ly0sessionLoad().session.id_login
    },
    popup: false,
    wxShow
}
