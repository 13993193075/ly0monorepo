import {ly0withTable as withTable} from '@yoooloo42/ly0el'
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
                        hdlChange({formData, scopeThis, value}){
                            formData.id_group = null
                            scopeThis.pgData.data.arrGroup0 = scopeThis.pgData.data.arrGroup.filter(i=>{
                                return "" + i.id_dataunit === "" + value
                            })
                        },
                        style: "width: 200px;",
                    },
                    {
                        inputType: "select",
                        label: "用户组",
                        fieldName: "id_group",
                        item_fieldLabel: "name",
                        item_fieldValue: "_id",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrGroup0
                        },
                        style: "width: 200px;",
                    },
                    {
                        inputType: "input",
                        label: "用户名称",
                        fieldName: "name",
                        style: "width: 200px;",
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
