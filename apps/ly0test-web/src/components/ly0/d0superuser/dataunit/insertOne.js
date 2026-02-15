import {withTable} from '@yoooloo42/ly0el'
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
                        inputType: "input",
                        label: "数据单元名称",
                        fieldName: "name",
                        style: 'width: 200px'
                    },
                    {
                        inputType: "switch",
                        label: "系统关闭",
                        fieldName: "systemoff",
                        activeText: "是",
                        inactiveText: "否",
                        activeValue: true,
                        inactiveValue: false,
                        activeColor: "#ee7405",
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
        name: "",
        systemoff: true
    }
}
