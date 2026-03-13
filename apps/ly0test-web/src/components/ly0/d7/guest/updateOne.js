import {withTable} from '@yoooloo42/ly0el'
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
                        label: "用户名称",
                        fieldName: "name"
                    },
                    {
                        inputType: "ly0gbt2260",
                        label: "国内行政区划",
                        fieldName: "gbt2260code"
                    },
                    {
                        inputType: "input",
                        label: "详细地址",
                        fieldName: "address"
                    },
                    {
                        inputType: "input",
                        label: "联系电话",
                        fieldName: "tel"
                    },
                    {
                        inputType: "ly0d7postal",
                        label: "更多邮寄地址",
                        fieldName: "postal"
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
