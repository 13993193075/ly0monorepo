import { request } from 'packages/ly0libs'
const ly0session = request.ly0.ly0sessionLoad()
import { ly0withTable as withTable } from 'packages/ly0el'
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
                        label: '预订类型',
                        fieldName: 'text',
                    },
                ]
            }
        ],
        submit: {
            handle: withTable.submitInsertOne
        }
    },
    formData: {
        id_dataunit: ly0session.dataunit._id,
        id_hotel: ly0session.user.id_hotel ? ly0session.user.id_hotel : null,
        text: '',
    }
}
