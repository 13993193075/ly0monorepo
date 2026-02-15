import {withTable} from '@yoooloo42/ly0el'
import { utils as ly0utils } from '@yoooloo42/ly0utils'
export default {
    titleLine: { // 标题线
        text: "系统日志"
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
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '系统日志',
                show: 'expression',
                hdlExpression({row}){
                    return (row.number ? row.number + " | " : "") +
                        (row.cellphone ? row.cellphone + " | " : "") +
                        (row.email ? " " + row.email + " | " : "") +
                        ly0utils.dateFormat.dateFormat(row.time, "yyyy/MM/dd HH:mm:ss") + " | " +
                        row.memo
                }
            },
        ]
    }
}
