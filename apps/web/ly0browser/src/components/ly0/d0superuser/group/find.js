import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "查询"
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
                        inputType: "input",
                        label: "应用路由",
                        fieldName: "route",
                        style: "width: 400px;",
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
