import { request as ly0request } from '@yoooloo42/ly0browser'
import {withTable} from '@yoooloo42/ly0el'
const ly0session = ly0request.ly0.ly0sessionLoad()
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "新增"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '商品分类名称',
                        fieldName: 'name',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        _id: null,
        id_dataunit: ly0session.dataunit._id,
        name: '',
    }
}
