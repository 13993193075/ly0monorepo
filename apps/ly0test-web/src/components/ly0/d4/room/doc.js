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
                        inputType: "text",
                        label: "旅店",
                        fieldName: "hotel_name",
                        hdlVisible({scopeThis}) {
                            return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                        },
                    },
                    {
                        inputType: 'text',
                        label: '客房分区',
                        fieldName: 'roomplace_text',
                    },
                    {
                        inputType: 'text',
                        label: '房号',
                        fieldName: 'roomno',
                    },
                    {
                        inputType: "text",
                        label: "房型",
                        fieldName: "goods_name",
                    },
                    {
                        inputType: 'text',
                        label: '客房状态',
                        fieldName: 'status_text',
                    },
                    {
                        inputType: 'text',
                        label: '当前订单编号',
                        fieldName: 'id_business',
                    },
                    {
                        inputType: 'text',
                        label: '门锁密码',
                        fieldName: 'doorlock',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
