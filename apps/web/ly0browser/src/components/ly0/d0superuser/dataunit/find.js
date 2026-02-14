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
                        inputType: "input",
                        label: "数据单元名称",
                        fieldName: "name",
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
