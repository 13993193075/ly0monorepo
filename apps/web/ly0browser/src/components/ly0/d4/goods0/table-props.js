import {ly0withTable as withTable} from 'packages/ly0el'
export default {
    titleLine: { // 标题线
        text: "配售商品"
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
                label: '旅店',
                show: 'text',
                fieldName: 'hotel_name',
                hdlVisible({scopeThis}) {
                    return scopeThis.pgData.data.arrHotel.length > 1 // 只有一个旅店时不显示
                },
            },
            {
                label: '商品名称',
                show: 'text',
                fieldName: 'name',
            },
            {
                label: '单价',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return Math.floor(row.price) / 100
                },
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "修改",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            withTable.popupUpdateOne({scopeThis, row})
                            scopeThis.formData.price0 = Math.floor(scopeThis.formData.price) / 100
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
