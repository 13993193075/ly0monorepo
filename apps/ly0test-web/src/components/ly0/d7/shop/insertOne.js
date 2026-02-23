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
                        label: '商店名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '小票机型号',
                        fieldName: 'doorlock_sys',
                        style: {width: '200px'},
                    },
                    {
                        inputType: "switch",
                        label: "商城代收",
                        fieldName: "mall",
                        activeText: "是",
                        inactiveText: "否",
                        activeValue: true,
                        inactiveValue: false,
                        activeColor: "#ee7405",
                        disabled: true // 排他性处理
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '微信支付',
                                items: [
                                    {
                                        inputType: 'input',
                                        label: 'APPID',
                                        fieldName: 'wx_appid',
                                        style: {width: '300px'},
                                    },
                                    {
                                        inputType: 'input',
                                        label: 'MCHID',
                                        fieldName: 'wx_mchid',
                                        style: {width: '300px'},
                                    },
                                ],
                            },
                        ],
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
        smallticket: "",
        wx_appid: '',
        wx_mchid: '',
        mall: false,
    }
}
