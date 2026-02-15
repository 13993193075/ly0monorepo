export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "详细"
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'text',
                        label: '序号',
                        fieldName: 'number',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '教材分类',
                        fieldName: 'class_name',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '教材名称',
                        fieldName: 'name',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'line',
                    },
                    {
                        inputType: 'download',
                        label: '资源文件下载',
                        fieldName: 'url',
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
