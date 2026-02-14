import {ly0withTable as withTable} from 'packages/ly0el'
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
                        inputType: "input",
                        label: "名称",
                        fieldName: "name",
                        style: 'width: 300px'
                    },
                    {
                        inputType: "select",
                        label: "路由类型",
                        fieldName: "route_type",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        items: [
                            {
                                text: "URL",
                                code: "0"
                            },
                            {
                                text: "VUE路由",
                                code: "1"
                            }
                        ],
                        style: 'width: 200px'
                    },
                    {
                        inputType: "input",
                        label: "路由",
                        fieldName: "route",
                        style: 'width: 400px'
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
