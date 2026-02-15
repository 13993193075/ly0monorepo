import {ly0withTable as withTable} from 'packages/ly0el/src/index.js'
export default {
    titleLine: { // 标题线
        text: "用户组"
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
                label: '用户组名称',
                show: 'text',
                fieldName: 'name'
            },
            {
                label: '应用路由',
                show: 'text',
                fieldName: 'route'
            },
            {
                label: "图标",
                show: "image",
                fieldName: "icon",
                imageWidth: "30px",
                imageHeight: "30px"
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
            },
        ]
    }
}
