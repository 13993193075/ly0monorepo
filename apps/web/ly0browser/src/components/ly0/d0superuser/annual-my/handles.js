import {request} from 'packages/ly0libs'
import {ElMessage, ElMessageBox} from 'element-plus'
const ly0request = request.ly0
const ly0session = ly0request.ly0sessionLoad()

// 刷新订单（年费记录）的支付状态
function getStatus({scopeThis, row}){
    return new Promise((resolve, reject)=>{
        ly0request.storpro({
            storproName: "ly0d2.wxzf.getStatus",
            data: {id_business: row._id}
        }).then(result=>{
            let status_code = result.status_code
            ElMessage(result.message)

            // 查询微信后台：没有需要同步（支付中）的支付记录，不重置订单的支付状态
            if(status_code === "0"){
                scopeThis.handles.withTable.reload({scopeThis}).then(()=>{
                    resolve(result)
                })
                return
            }

            // 重置订单的支付状态
            setStatus(scopeThis, {
                _id: row._id,
                status_code
            }).then(()=>{
                scopeThis.handles.withTable.reload({scopeThis}).then(()=>{
                    resolve(result)
                })
            })
        })
    })
}

// 设置订单（年费记录）的支付状态
function setStatus(scopeThis, data){
    // data._id
    // data.status_code

    return new Promise((resolve, reject)=>{
        ly0request.storpro({
            storproName: "ly0d0.annual-my.setStatus",
            data: {
                _id: data._id,
                status_code: data.status_code
            }
        }).then(()=>{
            scopeThis.handles.reload({scopeThis}).then(()=>{
                resolve()
            })
        })
    })
}

// 中止支付
function setFail({scopeThis, row}){
    return new Promise((resolve, reject)=>{
        ly0request.storpro({
            storproName: "ly0d2.wxzf.setFail",
            data: {id_business: row._id}
        }).then(()=>{
            ly0request.storpro({
                storproName: "ly0d0.annual-my.setStatus",
                data: {
                    _id: row._id,
                    status_code: "3"
                }
            }).then(()=>{
                scopeThis.handles.withTable.reload({scopeThis}).then(()=>{
                    resolve()
                })
            })
        })
    })
}

// 发起支付
function getCodeUrl({scopeThis, row}){
    //获取用于本站微信登录的appid凭据信息
    ly0request.storpro({
        storproName: "ly0d1d0appid.getAppidWithAnnual",
        data: null
    }).then(result=>{
        let objAppid = result.objAppid
        // 获取用于系统年费的商户号
        ly0request.storpro({
            storproName: "ly0d1d0mchid.getMchidWithAnnual",
            data: null
        }).then(result=>{
            let objMchid = result.objMchid
            setStatus(scopeThis, {
                _id: row._id,
                status_code: "1"
            }).then(()=>{
                ly0request.storpro({
                    storproName: "ly0d2.wxzf.wxzf2",
                    data: {
                        id_dataunit: ly0session.dataunit._id,
                        recorder_cellphone: ly0session.user.cellphone,
                        recorder_name: ly0session.user.name,
                        id_business: row._id,
                        businesstype_code: "ly0d0annual",
                        businesstype_text: "系统年费",
                        amount: row.fee,
                        note: row.note ? row.note : null,
                        appid: objAppid.appid,
                        mchid: objMchid.mchid,
                        description: "系统年费"
                    }
                }).then(result=>{
                    ElMessage(result.message)
                    if(result.code !== 0){
                        return
                    }

                    // 二维码
                    if(result.code === 0 && result.code_url){
                        // 弹出二维码窗口
                        scopeThis.qrcode.code_url = result.code_url
                        scopeThis.qrcode.amount = Math.floor(row.fee) / 100
                        scopeThis.qrcode.id_business = row._id
                        scopeThis.qrcode.mchid = objMchid.mchid
                        scopeThis.qrcode.popup.visible = true
                    } else {
                        // 测试
                        scopeThis.qrcode.code_url = "/ly0/frame/header/user.jpg"
                        scopeThis.qrcode.popup.visible = true
                    }
                })
            })
        })
    })
}

export default{
    getStatus,
    setStatus,
    setFail,
    getCodeUrl
}
