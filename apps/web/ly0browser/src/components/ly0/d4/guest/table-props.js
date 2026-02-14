import {ly0withTable as withTable} from 'packages/ly0el'
import {blindboxes} from 'packages/ly0utils'
export default {
    popup: {
        switch: true,
        visible: true,
    },
    titleLine: { // 标题线
        text: "旅客信息"
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
                label: '',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (
                        row.name + '/' +
                        row.sex_text + '/' +
                        (row.roomno || '-') + '\n' +
                        blindboxes.dateFormat.dateFormat(row.checkin) + ' - ' +
                        blindboxes.dateFormat.dateFormat(row.checkout)
                    )
                }
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
            }
        ]
    }
}
