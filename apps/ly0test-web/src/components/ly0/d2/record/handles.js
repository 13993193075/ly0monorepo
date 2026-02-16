import { request as ly0request } from '@yoooloo42/ly0browser'
import {ElMessage, ElMessageBox} from 'element-plus'
import {withTable} from '@yoooloo42/ly0el'

// 刷新支付状态
function status({scopeThis, row}){
    ly0request.ly0request.storpro({
        storproName: scopeThis.storpro.getStatus,
        data: {
            id_business: row.id_business
        }
    }).then(result=>{
        ElMessage(result.message)
        withTable.refresh({scopeThis})
    })
}

// 中止支付
function cancel({scopeThis, row}){
    ly0request.ly0request.storpro({
        storproName: scopeThis.storpro.setFail,
        data: {id_business: row.id_business}
    }).then(result=>{
        ElMessage(result.message)
        withTable.refresh({scopeThis})
    })
}

export default{
    status,
    cancel
}
