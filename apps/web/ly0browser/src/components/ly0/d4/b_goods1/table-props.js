import { ly0withTable as withTable } from '@yoooloo42/ly0el'
export default {
    popup: {
        switch: true,
        visible: true,
    },
    titleLine: { // 标题线
        text: "损赔物品"
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
                label: '物品名称',
                show: 'text',
                fieldName: 'name',
            },
            {
                label: '单价/数量',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return Math.floor(row.price) / 100 + '/' + row.count
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
                        async hdlClick({scopeThis, row}) {
                            const row0 = JSON.parse(JSON.stringify(row))
                            row0.price0 = Math.floor(row0.price) / 100
                            await withTable.popupUpdateOne({scopeThis, row: row0})
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
            }
        ]
    }
}
