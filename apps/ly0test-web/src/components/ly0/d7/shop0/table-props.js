import {withTable} from '@yoooloo42/ly0el'
export default {
    titleLine: { // 标题线
        text: "商店名称及参数设置"
    },
    topButtonGroups: [ // 置顶快捷按钮组
        [
            {
                text: "刷新",
                hdlClick: withTable.reload
            }
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: '商店编号',
                show: 'text',
                fieldName: '_id'
            },
            {
                label: '商店名称',
                show: 'text',
                fieldName: 'name'
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
                ]
            }
        ]
    }
}
