import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
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
                        label: "名称",
                        fieldName: "name",
                        style: {width: "200px"}
                    }
                ]
            }
        ],
        submit: {
            handle: withTable.submitFind
        },
    }
}
