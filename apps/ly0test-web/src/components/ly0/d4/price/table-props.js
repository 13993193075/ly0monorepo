import {withTable as withTable} from 'packages/ly0el/src/index.js'
import cascade from './cascade.js'
export default {
    titleLine: { // 标题线
        text: "房型标价"
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
                async hdlClick({scopeThis}){
                    await withTable.popupFind({scopeThis})
                    cascade.hotelChange({scopeThis})
                }
            },
            {
                text: "新增",
                async hdlClick({scopeThis}){
                    await withTable.popupInsertOne({scopeThis})
                    cascade.hotelChange({scopeThis})
                }
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
                label: '房型名称',
                show: 'text',
                fieldName: 'goods_name',
            },
            {
                label: "标价名称",
                show: "text",
                fieldName: "name",
            },
            {
                label: "计价方法",
                show: "text",
                fieldName: "method_text",
            },
            {
                label: "单价",
                show: "expression",
                hdlExpression({scopeThis, row}){
                    return Math.floor(row.price) / 100
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
                        hdlClick({scopeThis, row}) {
                            withTable.popupUpdateOne({scopeThis, row})
                            cascade.hotelChange({scopeThis})
                            scopeThis.formData.price0 = Math.floor(scopeThis.formData.price / 100)
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
