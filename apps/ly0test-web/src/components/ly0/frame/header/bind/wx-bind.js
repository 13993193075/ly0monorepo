import wxShow from "./wx-show.js"
import {request as ly0request} from "@yoooloo42/joker"

export default {
    data: {
        id_login: ly0request.ly0.ly0sessionLoad().session.id_login
    },
    popup: false,
    wxShow
}
