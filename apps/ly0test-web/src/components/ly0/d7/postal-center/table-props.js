import {withTable} from '@yoooloo42/ly0el'
import {utils as ly0utils} from '@yoooloo42/ly0utils'
import handles from "./handles.js";
const dateFormat = ly0utils.dateFormat.dateFormat

export default {
    titleLine: { // 标题线
        text: "邮件分拣中心"
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
        ]
    ],
    table: {
        hdlPageSizeChange: withTable.pageSizeChange,
        hdlCurrentPageChange: withTable.currentPageChange,
        cols: [
            {
                label: "",
                show: "image",
                fieldName: "thumb",
                imageWidth: "100px",
                imageHeight: "150px"
            },
            {
                label: '订单id/商品编号/商品名称',
                show: 'expression',
                hdlExpression ({scopeThis, row}) {
                    return row.id_business + "\n" +
                        row.number + "\n" +
                        row.name
                }
            },
            {
                label: '邮寄地址',
                show: 'expression',
                hdlExpression ({scopeThis, row}) {
                    return (row.postal_gbt2260text || "<省-市-县>") + "\n" +
                        (row.postal_address || "<详细地址>") + "\n" +
                        (row.postal_tel ? "收货联系电话：" + row.postal_tel : "<收货联系电话>") + "\n" +
                        (row.postal_name ? "收货联系人：" + row.postal_name : "<收货联系人>")
                }
            },
            {
                label: "邮寄状态",
                show: "expression",
                width: "300px",
                hdlExpression({scopeThis, row}){
                    return (row.postal_status_text || "<邮寄状态>") + "\n" +
                        (row.postal_time ? "邮寄开始时间：" + dateFormat(row.postal_time) : "<邮寄开始时间>") + "\n" +
                        (row.postal_sorted_time ? "分拣完成时间：" + dateFormat(row.postal_sorted_time) : "<分拣完成时间>") + "\n" +
                        (row.postal_received_time ? "收货时间：" + dateFormat(row.postal_received_time) : "<收货时间>")
                }
            },
            {
                label: '',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: '分拣中',
                        hdlClick: handles.setPostalStatus1,
                        style: "width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                    },
                    {
                        text: '分拣完成',
                        hdlClick: handles.setPostalStatus2,
                        style: "width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                    },
                    {
                        text: '已收货',
                        hdlClick: handles.setPostalStatus3,
                        style: 'width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;'
                    }
                ]
            }
        ]
    }
}
