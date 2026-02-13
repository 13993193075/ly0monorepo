import {ly0withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "开发者账号"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "全部",
                hdlClick: ly0withTable.reload
            },
            {
                text: "刷新",
                hdlClick: ly0withTable.refresh
            },
            {
                text: "查询",
                hdlClick: ly0withTable.popupFind
            },
            {
                text: "新增",
                hdlClick: ly0withTable.popupInsertOne
            }
        ]
    ],
    table: {
        hdlPageSizeChange: ly0withTable.pageSizeChange,
        hdlCurrentPageChange: ly0withTable.currentPageChange,
        cols: [
            {
                label: 'USER',
                show: 'text',
                fieldName: 'user',
            },
            {
                label: '备注',
                show: 'text',
                fieldName: 'note',
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick: ly0withTable.popupDoc
                    },
                    {
                        text: "修改",
                        size: "small",
                        hdlClick: ly0withTable.popupUpdateOne
                    },
                    {
                        text: "删除",
                        size: "small",
                        hdlClick: ly0withTable.submitDeleteOne,
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
