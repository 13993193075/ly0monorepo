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
                        label: "省级编码",
                        fieldName: "code2",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "input",
                        label: "省级区划名称",
                        fieldName: "text2",
                        style: {width: '400px'}
                    },
                    {
                        inputType: "input",
                        label: "市级编码",
                        fieldName: "code4",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "input",
                        label: "市级区划名称",
                        fieldName: "text4",
                        style: {width: '400px'}
                    },
                    {
                        inputType: "input",
                        label: "县级编码",
                        fieldName: "code6",
                        style: {width: '200px'}
                    },
                    {
                        inputType: "input",
                        label: "县级区划名称",
                        fieldName: "text6",
                        style: {width: '400px'}
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitUpdateOne
        }
    }
}
