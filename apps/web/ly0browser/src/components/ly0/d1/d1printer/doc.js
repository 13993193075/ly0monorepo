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
                        label: '开发者账号._id',
                        fieldName: 'id_ukey',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '开发者账号.备注',
                        fieldName: 'ukey_note',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '打印机厂商识别编号',
                        fieldName: 'sn',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '打印机厂商识别密钥',
                        fieldName: 'key',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '备注（注册使用）',
                        fieldName: 'note',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '流量卡号码',
                        fieldName: 'carnum',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '数据单元._id',
                        fieldName: 'id_dataunit',
                        style: {width: '300px'}
                    },
                    {
                        inputType: 'text',
                        label: '数据单元.名称',
                        fieldName: 'dataunit_name',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '业务单位.数据库表名',
                        fieldName: 'busiunit_tblname',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '业务单位._id',
                        fieldName: 'id_busiunit',
                        style: {width: '300px'}
                    },
                    {
                        inputType: 'text',
                        label: '业务单位.名称',
                        fieldName: 'busiunit_name',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '打印机名称',
                        fieldName: 'printername',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '使用场景',
                        fieldName: 'scene',
                        style: {width: '200px'}
                    },
                    {
                        inputType: 'text',
                        label: '使用场景备注',
                        fieldName: 'sceneNote',
                        style: {width: '200px'}
                    },
                ]
            }
        ],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
        },
    }
}
