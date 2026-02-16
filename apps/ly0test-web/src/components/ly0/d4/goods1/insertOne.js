import { request as ly0request } from '@yoooloo42/ly0browser'
const ly0session = ly0request.ly0request.ly0sessionLoad()
import {withTable} from '@yoooloo42/ly0el'
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
                        inputType: 'select',
                        label: '旅店',
                        fieldName: 'id_hotel',
                        item_fieldLabel: 'name',
                        item_fieldValue: '_id',
                        hdlGetItems({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel
                        },
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                    },
                    {
                        inputType: 'input',
                        label: '物品名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: 'input',
                        label: '单价',
                        fieldName: 'price0',
                        style: {width: '100px'},
                    },
                ]
            }
        ],
        submit: {
            async handle({scopeThis, formData}){
                formData.price = Math.floor(formData.price0 * 100)
                await withTable.submitInsertOne({scopeThis})
            }
        }
    },
    formData: {
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        name: '',
        price: 0,
        price0: 0,
    }
}
