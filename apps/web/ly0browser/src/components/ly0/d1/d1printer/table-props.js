import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    titleLine: { // 标题线
        text: "打印机列表"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "全部",
                hdlClick: withTable.reload
            },
            {
                text: "刷新",
                hdlClick: withTable.refresh
            },
            {
                text: "查询",
                hdlClick: withTable.popupFind
            },
            {
                text: "新增",
                hdlClick: withTable.popupInsertOne
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '打印机厂商识别编号/备注（注册使用）',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return row.sn + '/' + row.note
                },
            },
            {
                label: '业务单位/打印机名称',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return row.busiunit_name + '/' + row.printername
                },
            },
            {
                label: '使用场景',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return row.scene + '/' + row.sceneNote
                },
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: '注册打印机',
                        hdlClick({scopeThis, row}) {
                            scopeThis.handles.register({scopeThis, row})
                        },
                    },
                ],
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick: withTable.popupDoc
                    },
                    {
                        text: "修改",
                        size: "small",
                        hdlClick: withTable.popupUpdateOne
                    },
                    {
                        text: "删除",
                        size: "small",
                        hdlClick: withTable.submitDeleteOne,
                        style: {
                            'background-color': '#ff640a',
                            'color': '#ffffff'
                        }
                    }
                ]
            },
        ]
    }
}
