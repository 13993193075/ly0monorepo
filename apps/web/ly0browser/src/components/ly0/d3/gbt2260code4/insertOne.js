import {ly0withTable as withTable} from 'packages/ly0el'
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
                        style: {width: '200px'}
                    },
                    {
                        inputType: "input",
                        label: "市级区划名称",
                        fieldName: "text4",
                        style: {width: '400px'}
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
        code2: "",
        text2: "",
        code4: "",
        text4: "",
    }
}
