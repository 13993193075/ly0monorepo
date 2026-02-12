import ly0withTable from '../ly0with-table/index.js'
import {request} from '@yoooloo42/blindboxes-depend'
import {ElMessage, ElMessageBox} from 'element-plus'
import {unclassified as LibsJsUnclass} from '@yoooloo42/blindboxes'
const ly0request = request.ly0

export default {
    // 置顶菜单
    menu: {
        menu: [
            {
                title: "刷新",
                handle: ly0withTable.reload
            },
            {
                title: "收银",
                hdlDisabled({scopeThis, item, index}){
                    return scopeThis.initBox.readOnly
                },
                menu: [
                    {
                        title: "收银",
                        handle({scopeThis, index}){
                            scopeThis.cashBox.formData.id_business = scopeThis.initBox.id_business
                            scopeThis.cashBox.formData.businesstype_code = scopeThis.initBox.businesstype_code
                            // 支付金额合计
                            scopeThis.cashBox.formData.amount = Math.floor(
                                scopeThis.initBox.deal - // 订单金额（应收应付）
                                scopeThis.amountBox.succeeded - // 支付成功
                                scopeThis.amountBox.started // 支付中
                            ) / 100
                            scopeThis.cashBox.formData.wx_appid = scopeThis.initBox.wx_appid
                            scopeThis.cashBox.formData.wx_mchid = scopeThis.initBox.wx_mchid
                            scopeThis.cashBox.formProps.popup.visible = true
                        }
                    },
                    {
                        title: "退款",
                        handle({scopeThis, index}){
                            ElMessageBox.confirm('退款?', '警告', {
                                confirmButtonText: '确认',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(()=>{
                                ly0request.storpro({
                                    storproName: "ly0d2.wxzf.refund",
                                    data: {id_business: scopeThis.initBox.id_business}
                                }).then(()=>{
                                    ElMessage("已退款")
                                    ly0withTable.refresh({scopeThis})
                                })
                            }).catch(err=>{
                                ElMessage({type: 'info', message: '取消退款'})
                            })
                        }
                    },
                    {
                        title: "中止支付",
                        handle({scopeThis, index}){
                            ly0request.storpro({
                                storproName: "ly0d2.wxzf.setFail",
                                data: {
                                    mchid: scopeThis.initBox.mchid,
                                    id_business: scopeThis.initBox.id_business
                                }
                            }).then(()=>{
                                ElMessage("已中止支付")
                                ly0withTable.refresh({scopeThis})
                            })
                        }
                    }
                ]
            }
        ],
    },
    table: {
        hdlPageSizeChange: ly0withTable.pageSizeChange,
        hdlCurrentPageChange: ly0withTable.currentPageChange,
        cols: [
            {
                label: '金额',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.amount ? Math.floor(row.amount) / 100 : 0
                },
                width: "75px"
            },
            {
                label: '支付方式',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.process_text + (row.process_code==='0' ? "/" + row.method_text : "")
                }
            },
            {
                label: '支付状态',
                show: 'expression',
                hdlExpression({scopeThis, row}){
                    return row.status_text + "\n" + LibsJsUnclass.dateFormat.dateFormat(row.time, 'yyyy/MM/dd hh:mm:ss')
                }
            },
            {
                label: '操作',
                show: 'button-group',
                buttonGroup: [
                    {
                        text: "详细",
                        size: "small",
                        hdlClick({scopeThis, row}){
                            ly0withTable.popupDoc({scopeThis, row})
                        }
                    },
                    {
                        text: "删除",
                        hdlVisible({scopeThis, row}){
                            return scopeThis.initBox.readOnly
                        },
                        size: "small",
                        hdlClick({scopeThis, row}){
                            ly0withTable.submitDeleteOne({scopeThis, row})
                        },
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
