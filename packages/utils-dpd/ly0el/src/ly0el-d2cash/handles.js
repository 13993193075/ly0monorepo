import {ElMessage, ElMessageBox} from 'element-plus'
import {request} from '@yoooloo42/ihavebacking'
const ly0request = request.ly0
const ly0session = ly0request.ly0sessionLoad()

function init({scopeThis}){
    ly0request.storpro({
        storproName: 'ly0d2.record0.getPgData',
        data: null,
    }).then(result => {
        scopeThis.pgData.arrBusinessType = result.data.arrBusinessType
        scopeThis.pgData.arrProcess = result.data.arrProcess.filter((i) => {
            return i.code !== 'wxzf1'
        })
        scopeThis.pgData.arrMethod = result.data.arrMethod
    })
}

function submit({scopeThis}){
    if(scopeThis.formData.process_code === "0"){ //系统外流转
        ly0request.storpro({
            storproName: "ly0d2.wxzf.cash",
            data: {
                id_business: scopeThis.formData.id_business,
                businesstype_code: scopeThis.formData.businesstype_code,
                amount: Math.floor(scopeThis.formData.amount * 100),
                method_code: scopeThis.formData.method_code,
                note: scopeThis.formData.note,
                rec: ly0session.user.name ? ly0session.user.name : ""
            }
        }).then(result=>{
            ElMessage(result.message)
            if(result.code !== 0){
                return
            }
            // 关闭收银窗口
            scopeThis.formProps.popup.visible = false
            // 通知外部组件已提交
            scopeThis.formProps.submitted = true
        })
    } else if(scopeThis.formData.process_code === "wxzf0"){ // 微信支付.客户付款码付款
        ly0request.storpro({
            storproName: "ly0d2.wxzf.wxzf0",
            data: {
                id_business: scopeThis.formData.id_business,
                businesstype_code: scopeThis.formData.businesstype_code,
                amount: Math.floor(scopeThis.formData.amount * 100),
                note: scopeThis.formData.note,
                micropay_code: scopeThis.formData.wx_micropay_code,
                appid: scopeThis.formData.wx_appid,
                mchid: scopeThis.formData.wx_mchid,
                description: scopeThis.pgData.arrBusinessType.find(i=>{
                    return i.code === scopeThis.formData.businesstype_code
                }).text,
                rec: ly0session.user.name ? ly0session.user.name : ""
            }
        }).then(result=>{
            ElMessage(result.message)
            if(result.code !== 0){
                return
            }
            // 关闭收银窗口
            scopeThis.formProps.popup.visible = false
            // 通知外部组件已提交
            scopeThis.formProps.submitted = true
        })
    } else if(scopeThis.formData.process_code === "wxzf2"){ // 微信支付.商户二维码收款
        ly0request.storpro({
            storproName: "ly0d2.wxzf.wxzf2",
            data: {
                id_business: scopeThis.formData.id_business,
                businesstype_code: scopeThis.formData.businesstype_code,
                amount: Math.floor(scopeThis.formData.amount * 100),
                note: scopeThis.formData.note,
                appid: scopeThis.formData.wx_appid,
                mchid: scopeThis.formData.wx_mchid,
                description: scopeThis.pgData.arrBusinessType.find(i=>{
                    return i.code === scopeThis.formData.businesstype_code
                }).text,
                rec: ly0session.user.name ? ly0session.user.name : ""
            }
        }).then(result=>{
            ElMessage(result.message)
            if(result.code !== 0){
                return
            }
            // 关闭收银窗口
            scopeThis.formProps.popup.visible = false
            // 通知外部组件已提交
            scopeThis.formProps.submitted = true

            // 弹出二维码窗口
            if(result.code === 0 && result.code_url){
                scopeThis.qrcode.formData.code_url = result.code_url
                scopeThis.qrcode.formData.amount = scopeThis.formData.amount
                scopeThis.qrcode.formData.id_business = scopeThis.formData.id_business
                scopeThis.qrcode.formData.mchid = scopeThis.formData.wx_mchid
            } else {
                // 测试
                scopeThis.qrcode.formData.code_url = "./qrcode/test-show.jpg"
            }
            scopeThis.qrcode.popup.visible = true
        })
    } else {
        ElMessage("未选择：系统内置支付流程");
    }
}

export default{
    init,
    submit
}
