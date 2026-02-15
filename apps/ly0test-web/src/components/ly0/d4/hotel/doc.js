export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "详细"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'text',
                        label: '旅店名称',
                        fieldName: 'name',
                        style: {width: '200px'},
                    },
                    {
                        inputType: 'text',
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
                                        inputType: 'text',
                                        label: '中午结算时间：时',
                                        fieldName: 'checkout_hours',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'text',
                                        label: '分',
                                        fieldName: 'checkout_minutes',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'text',
                                        label: '下午结算时间：时',
                                        fieldName: 'checkout0_hours',
                                        style: {width: '100px'},
                                    },
                                    {
                                        inputType: 'text',
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
                                        inputType: 'text',
                                        label: 'APPID',
                                        fieldName: 'wx_appid',
                                        style: {width: '300px'},
                                    },
                                    {
                                        inputType: 'text',
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
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
