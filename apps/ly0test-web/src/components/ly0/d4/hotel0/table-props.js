import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "旅店名称及参数设置"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "刷新",
                hdlClick: withTable.reload
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '旅店名称',
                show: 'text',
                fieldName: 'name'
            },
            {
                label: '中午结算时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (
                        (row.checkout_hours > 0 ? row.checkout_hours : '0') + ':' +
                        (row.checkout_minutes > 0 ? row.checkout_minutes : '0')
                    )
                },
            },
            {
                label: '下午结算时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (
                        (row.checkout0_hours > 0 ? row.checkout0_hours : '0') + ':' +
                        (row.checkout0_minutes > 0 ? row.checkout0_minutes : '0')
                    )
                },
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
                ]
            }
        ]
    }
}
