import {ly0withTable as withTable} from '@yoooloo42/ly0el'
import cascade from './cascade.js'
export default {
    titleLine: { // 标题线
        text: "客房信息"
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
                label: '客房分区',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    const hotel = scopeThis.pgData.data.arrHotel.length > 1 ? row.hotel_name : ''
                    const roomplace = row.roomplace_text ? row.roomplace_text : ''
                    if (!hotel && !roomplace) {
                        return ''
                    } else if (!hotel) {
                        return roomplace
                    } else if (!roomplace) {
                        return hotel
                    } else {
                        return hotel + '/' + roomplace
                    }
                },
            },
            {
                label: '房号',
                show: 'text',
                fieldName: 'roomno',
            },
            {
                label: '房型',
                show: 'text',
                fieldName: 'goods_name',
            },
            {
                label: '客房状态',
                show: 'text',
                fieldName: 'status_text',
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
