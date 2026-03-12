import {withTable} from '@yoooloo42/ly0el'
import {request as ly0request} from '@yoooloo42/ly0browser'

export default {
    titleLine: { // 标题线
        text: "商店名称及参数设置"
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
                label: "商城代收",
                show: "switch",
                fieldName: "mall",
                activeValue: true,
                inactiveValue: false,
                activeText: "是",
                inactiveText: "否",
                activeColor: "#ff640a",
                hdlChange({scopeThis, row, inherit}){
                    ly0request.ly0.storpro({
                        storproName: "ly0d7.shop.mall",
                        data: {
                            _id: row._id,
                            mall: inherit.valNew
                        }
                    }).then(result=>{
                        withTable.refresh({scopeThis})
                    })
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
