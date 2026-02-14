import {request} from 'packages/ly0libs'
import {ly0withTable as withTable} from 'packages/ly0el'
const ly0request = request.ly0

export default {
    titleLine: { // 标题线
        text: "初始化"
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
                label: '名称',
                show: 'text',
                fieldName: 'name'
            },
            {
                label: '路由类型',
                show: 'text',
                fieldName: 'route_type_text',
            },
            {
                label: '路由',
                show: 'text',
                fieldName: 'route',
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "开始测试",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            ly0request.navigate({
                                code: row.route_type,
                                path: row.route,
                                routerInstance: scopeThis.routerInstance
                            })
                        }
                    }
                ],
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
