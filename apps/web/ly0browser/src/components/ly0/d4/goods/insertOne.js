import { request } from '@yoooloo42/ihavebacking'
const ly0session = request.ly0.ly0sessionLoad()
import {ly0withTable as withTable} from '@yoooloo42/ly0el'
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
                        label: '房型名称',
                        fieldName: 'name',
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "照片上传",
                                items: [
                                    {
                                        inputType: "upload-avatar",
                                        fieldName: "thumb",
                                        avatar: {
                                            width: "160px",
                                            height: "120px",
                                        }
                                    }
                                ]
                            }
                        ]
                    }
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
        name: '',
        thumb: []
    }
}
