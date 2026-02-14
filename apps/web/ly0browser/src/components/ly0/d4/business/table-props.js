import { ly0withTable as withTable } from 'packages/ly0el'
import cascade from './cascade.js'
import {blindboxes} from 'packages/ly0utils'

export default {
    titleLine: { // 标题线
        text: "订单记录 - 维护"
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
                label: '订单编号',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    if (scopeThis.pgData.data.arrHotel.length > 1) {
                        return row.hotel_name + '/' + row._id
                    } else {
                        return row._id
                    }
                },
            },
            {
                label: '订单状态',
                show: 'text',
                fieldName: 'status_text',
            },
            {
                label: '入住时间 - 离开时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (
                        blindboxes.dateFormat.dateFormat(row.checkin) + ' - ' +
                        blindboxes.dateFormat.dateFormat(row.checkout)
                    )
                },
            },
            {
                label: '客户信息/入住人数',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (
                        (row.client_name ? row.client_name : '-') + '/' +
                        (row.peoples ? row.peoples : '-')
                    )
                },
            },
            {
                label: '预订类型',
                show: 'text',
                fieldName: 'booktype_text',
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "订单详细",
                        size: "small",
                        // hdlClick: withTable.popupDoc
                        hdlClick({scopeThis, row}) {
                            scopeThis.id_business = row._id
                        }
                    },
                    {
                        text: "修改",
                        size: "small",
                        hdlClick({scopeThis, row}) {
                            withTable.popupUpdateOne({scopeThis, row})
                            cascade.hotelChange({scopeThis})
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
