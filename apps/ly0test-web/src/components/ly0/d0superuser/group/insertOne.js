import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
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
                        inputType: "select",
                        label: "数据单元",
                        fieldName: "id_dataunit",
                        item_fieldLabel: "name",
                        item_fieldValue: "_id",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrDataunit
                        },
                        style: "width: 200px;",
                    },
                    {
                        inputType: "input",
                        label: "用户组名称",
                        fieldName: "name",
                        style: "width: 200px;",
                    },
                    {
                        inputType: "select",
                        label: "应用路由类型",
                        fieldName: "route_type",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        items: [
                            {code: "0", text: "URL"},
                            {code: "1", text: "VUE路由"}
                        ],
                        style: "width: 200px;",
                    },
                    {
                        inputType: "input",
                        label: "应用路由",
                        fieldName: "route",
                        style: "width: 400px;",
                    },
                    {
                        inputType: "collapse",
                        items: [
                            {
                                title: "图标上传",
                                items: [
                                    {
                                        inputType: "upload-avatar",
                                        fieldName: "icon",
                                        avatar: {
                                            width: "90px",
                                            height: "90px",
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
        _id: null,
        id_dataunit: null,
        name: '',
        route_type: '',
        route: '',
        icon: []
    }
}
