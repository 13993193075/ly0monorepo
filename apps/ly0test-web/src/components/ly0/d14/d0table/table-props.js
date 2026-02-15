import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
import {blindboxes} from 'packages/ly0utils/src/index.js'
export default {
    titleLine: { // 标题线
        text: "个人信息名录"
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
                label: '姓名',
                show: 'text',
                fieldName: 'f0name',
            },
            {
                label: '出生日期',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return blindboxes.dateFormat.dateFormat(row.f0birthdate, 'yyyy/MM/dd')
                },
            },
            {
                label: '家庭住址',
                show: 'text',
                fieldName: 'f0address',
            },
            {
                label: '数据采样时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return blindboxes.dateFormat.dateFormat(row.time_create, 'yyyy/MM/dd HH:mm:ss')
                },
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick({scopeThis, row}) {
                            scopeThis.root.id_d0 = row._id
                            scopeThis.root.branch = 1
                        },
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
