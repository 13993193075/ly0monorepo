import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "支付记录（维护）"
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
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '订单id/类型',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.id_business + "/" + row.businesstype_text
                }
            },
            {
                label: '金额',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.amount ? Math.floor(row.amount) / 100 : 0
                }
            },
            {
                label: '支付方式',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.process_text + (row.process_code==='0' ? "/" + row.method_text : "")
                }
            },
            {
                label: '支付状态',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.status_text + " " + ly0utils.dateFormat.dateFormat(row.time)
                }
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "刷新支付状态",
                        size: "small",
                        round: true,
                        hdlClick({scopeThis, row}){
                            scopeThis.handles.status({scopeThis, row})
                        },
                        style: {backgroundColor: "#ff640a", color: "#ffffff"},
                    },
                    {
                        text: "中止支付",
                        size: "small",
                        round: true,
                        hdlClick({scopeThis, row}){
                            scopeThis.handles.cancel({scopeThis, row})
                        },
                        style: {backgroundColor: "#ff640a", color: "#ffffff"},
                    }
                ]
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
                        text: "删除",
                        size: "small",
                        hdlClick: withTable.submitDeleteOne,
                        style: {
                            'background-color': '#ff640a',
                            'color': '#ffffff'
                        }
                    }
                ]
            }
        ]
    }
}
