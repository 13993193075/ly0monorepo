import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "楼层服务员"
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
                label: '手机号',
                show: 'text',
                fieldName: 'cellphone',
            },
            {
                label: '姓名',
                show: 'text',
                fieldName: 'name',
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
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
