import { request as ly0request } from '@yoooloo42/ly0browser'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
const ly0session = ly0request.ly0.ly0sessionLoad()
import {withTable} from '@yoooloo42/ly0el'

export default {
    titleLine: { // 标题线
        text: "缴费单位：" + ly0session.dataunit.name
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "刷新",
                hdlClick: withTable.reload
            },
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '起始日期 - 截止日期',
                show: 'expression',
                hdlExpression({row}){
                    return ly0utils.dateFormat.dateFormat(row.from, "yyyy/MM/dd") + " - " + ly0utils.dateFormat.dateFormat(row.to, "yyyy/MM/dd")
                }
            },
            {
                label: '年费金额',
                show: 'expression',
                hdlExpression({row}){
                    return Math.floor(row.fee) / 100
                }
            },
            {
                label: "支付状态",
                show: "text",
                fieldName: "status_text"
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        hdlText({scopeThis, row}){
                            if(row.status_code === "0"){
                                return "缴费（发起支付）"
                            }
                            if(row.status_code === "1"){
                                return "刷新支付状态"
                            }
                            if(row.status_code === "3"){
                                return "重新支付"
                            }
                            if(row.status_code === "4"){
                                return "重新支付"
                            }
                        },
                        hdlClick({scopeThis, row}){
                            if(row.status_code === "0" || row.status_code === "3" || row.status_code === "4"){
                                // 发起支付
                                scopeThis.handles.getCodeUrl({scopeThis, row})
                                return
                            }
                            if(row.status_code === "1"){
                                // 刷新支付状态
                                scopeThis.handles.getStatus({scopeThis, row})
                                return
                            }
                        }
                    },
                    {
                        text: "中止支付",
                        hdlClick({scopeThis, row}){
                            scopeThis.handles.setFail({scopeThis, row})
                        },
                        hdlVisible({scopeThis, row}){
                            return row.status_code === "1";
                        }
                    }
                ]
            },
        ]
    }
}
