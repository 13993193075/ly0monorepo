import {request as ly0request} from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0.ly0sessionLoad()
export default {
    id_login: ly0session.session.id_login,
    readonly: false,
    destroy: false,
    popup: {
        switch: true,
        visible: false
    },
}
