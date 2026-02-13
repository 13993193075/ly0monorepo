// with-table标准句柄
import handles from "../../../common/table/with-table/handles.js"
import hdlsSupplement from "./handles.js"
import dateFormat from "../../../../utils/date-format.js"

function getTableProps (scopeThis) {
    return {
        titleLine: {
            text: '邮件分拣中心'
        },
        topButtonGroups: {
            buttonSize: "small",
            box: [
                {
                    box: [
                        {
                            text: '全部',
                            hdlClick: handles.reloadAll
                        },
                        {
                            text: '刷新',
                            hdlClick: handles.reload
                        },
                        {
                            text: '查询',
                            hdlClick: handles.findPopup
                        }
                    ]
                }
            ]
        },
        table: {
            cols: [
                {
                    label: '',
                    show: 'image',
                    fieldName: 'thumb',
                    imageHeight: '100px',
                    width: "150px"
                },
                {
                    label: '订单id/商品编号/商品名称',
                    show: 'expression',
                    hdlExpression (scopeThis, row) {
                        return row.id_business + "\n" +
                            row.number + "\n" +
                            row.name
                    }
                },
                {
                    label: '邮寄地址',
                    show: 'expression',
                    hdlExpression (scopeThis, row) {
                        return (!!row.postal_gbt2260text ? row.postal_gbt2260text : "<省-市-县>") + "\n" +
                            (!!row.postal_address ? row.postal_address : "<详细地址>") + "\n" +
                            (!!row.postal_tel ? "收货联系电话：" + row.postal_tel : "<收货联系电话>") + "\n" +
                            (!!row.postal_name ? "收货联系人：" + row.postal_name : "<收货联系人>")
                    }
                },
                {
                    label: "邮寄状态",
                    show: "expression",
                    width: "300px",
                    hdlExpression(scopeThis, row){
                        return (!!row.postal_status_text ? row.postal_status_text : "<邮寄状态>") + "\n" +
                            (!!row.postal_time ? "邮寄开始时间：" + dateFormat.dateFormat(row.postal_time) : "<邮寄开始时间>") + "\n" +
                            (!!row.postal_sorted_time ? "分拣完成时间：" + dateFormat.dateFormat(row.postal_sorted_time) : "<分拣完成时间>") + "\n" +
                            (!!row.postal_received_time ? "收货时间：" + dateFormat.dateFormat(row.postal_received_time) : "<收货时间>")
                    }
                },
                {
                    label: '',
                    show: 'button-group',
                    width: "150px",
                    buttonGroup: [
                        {
                            text: '分拣中',
                            hdlClick: hdlsSupplement.setPostalStatus1,
                            style: "width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                        },
                        {
                            text: '分拣完成',
                            hdlClick: hdlsSupplement.setPostalStatus2,
                            style: "width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;"
                        },
                        {
                            text: '已收货',
                            hdlClick: hdlsSupplement.setPostalStatus3,
                            style: 'width: 100px; border-radius: 0; background-color: #009f95; color: #ffffff;'
                        }
                    ]
                }
            ]
        }
    }
}

export default {
    getTableProps
}