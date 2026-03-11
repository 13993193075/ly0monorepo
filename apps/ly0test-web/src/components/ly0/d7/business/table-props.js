import {withTable} from '@yoooloo42/ly0el'
import {utils as ly0utils} from '@yoooloo42/ly0utils'

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
                label: '订单编号',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    if (scopeThis.pgData.data.arrShop.length > 1) {
                        return row.shop_name + '/' + row._id
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
                label: '交易时间',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return ly0utils.dateFormat.dateFormat(row.time)
                },
            },
            {
                label: '客户信息',
                show: 'expression',
                hdlExpression({scopeThis, row}) {
                    return (row.client_cellphone ? row.client_cellphone : "-") + "/" +
                        (row.client_name ? row.client_name : "-")
                },
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "订单详细",
                        size: "small",
                        // hdlClick: withTable.popupDoc
                        hdlClick({scopeThis, row}) {scopeThis.id_business = row._id}
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
