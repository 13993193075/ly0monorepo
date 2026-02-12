export default {
    fun({scopeThis}){
        let started = 0, // 支付中
            succeeded = 0, // 支付成功
            failed = 0; // 支付失败

        scopeThis.tableData.data.forEach(i=>{
            if(i.status_code === '1'){
                started = started + i.amount
            }else if(i.status_code === '2'){
                succeeded = succeeded + i.amount
            }else if(i.status_code === '3'){
                failed = failed + i.amount
            }
        })

        return {
            started,
            succeeded,
            failed,
            // 未支付
            unpaid: scopeThis.initBox.deal - succeeded - started,
        }
    }
}