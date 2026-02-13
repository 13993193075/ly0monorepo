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
                        inputType: "text",
                        label: "房型名称",
                        fieldName: "name",
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "照片",
                                items: [
                                    {
                                        inputType: "image",
                                        fieldName: "thumb",
                                        style: {width: '160px', height: '120px'},
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
