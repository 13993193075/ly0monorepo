import {utils as ly0utils} from '@yoooloo42/ly0utils'
import {withTable} from '@yooloo42/ly0el'

export default {
    titleLine: { // 标题线
        text: "年费记录"
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
                label: '数据单元',
                show: 'text',
                fieldName: 'dataunit_name'
            },
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
                        text: "详细",
                        size: "small",
                        hdlClick: withTable.popupDoc
                    },
                    {
                        text: "修改",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            withTable.popupUpdateOne({scopeThis, row})
                            scopeThis.formData.fee0 = Math.floor(scopeThis.formData.fee) / 100
                        }
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
