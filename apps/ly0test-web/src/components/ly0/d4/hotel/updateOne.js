import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'input',
                        label: '旅店名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'input',
                        label: '门锁系统',
                        fieldName: 'doorlock_sys',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'collapse',
                        items: [
                            {
                                title: '离店结算时间',
                                items: [
                                    {
                                        inputType: 'input',
                                        label: '中午结算时间：时',
                                        fieldName: 'checkout_hours',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'input',
                                        label: '分',
                                        fieldName: 'checkout_minutes',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'input',
                                        label: '下午结算时间：时',
                                        fieldName: 'checkout0_hours',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'input',
                                        label: '分',
                                        fieldName: 'checkout0_minutes',
                                        style: {width: '100px'},
                                    },
                                ],
                            },
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
            handle: withTable.submitUpdateOne
        }
    }
}
