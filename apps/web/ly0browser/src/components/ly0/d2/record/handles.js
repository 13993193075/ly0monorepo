import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
import {ly0withTable as withTable} from 'packages/ly0el'
// 刷新支付状态
function status({scopeThis, row}){
    request.ly0.storpro({
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
    request.ly0.storpro({
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
