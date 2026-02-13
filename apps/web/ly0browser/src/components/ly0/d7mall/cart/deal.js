import dataRequest from "../../../../utils/data-request.js"

// 打开微信支付窗口
function qrcodeOpened(scopeThis){
    // 同步支付状态，获取支付记录，如已完成支付，清空购物车
    getPayments(scopeThis).then(result=>{
        scopeThis.$message(result.message)
        // 已完成支付，清空购物车
        if(result.code === 0){
            return
        }

        // 未完成支付，清空支付记录
        dataRequest.storpro({
            storproName: "ly0d2.wxzf.deletePayments",
            data: {id_business: scopeThis.business.objBusiness._id}
        }).then(()=>{
            // 开始微信支付流程
            // 测试金额：0.01元
            let amount = 1
            // let amount = scopeThis.qrcode.amount

            dataRequest.storpro({
                scopeThis,
                storproName: "ly0d2.wxzf.wxzf2",
                data: {
                    id_business: scopeThis.business.objBusiness._id,
                    businesstype_code: "ly0d7business",
                    amount,
                    note: "商城购物车结算",
                    appid: scopeThis.qrcode.appid,
                    mchid: scopeThis.qrcode.mchid,
                    description: "",
                    rec: scopeThis.ly0session.user.name ? scopeThis.ly0session.user.name : ""
                }
            }).then(result=>{
                scopeThis.$message(result.message)
                if(result.code !== 0){
                    return
                }

                // 二维码
                if(result.code === 0 && result.code_url){
                    scopeThis.qrcode.code_url = result.code_url
                } else {
                    // 测试
                    scopeThis.qrcode.code_url = "/ly0/frame/header/user.jpg"
                }
                // 打开二维码窗口
                scopeThis.qrcode.popup.visible = true
            })
        })
    })
}

// 微信支付窗口关闭
function qrcodeClosed(scopeThis){
    getPayments(scopeThis).then(result=>{
        scopeThis.$message(result.message)
        if(result.code === 0){
            // 刷新购物车页面
            location.reload()
        }
    })
}

// 同步支付状态，获取支付记录，如已完成支付，清空购物车
function getPayments(scopeThis){
    return new Promise(resolve=>{
        dataRequest.storpro({
            scopeThis,
            storproName: "ly0d2.wxzf.getPayments",
            data: {
                mchid: scopeThis.qrcode.mchid,
                id_business: scopeThis.qrcode.id_business
            }
        }).then(resultGetPayments=>{
            dataRequest.storpro({
                storproName: "ly0d7.business.findOne",
                data: {_id: scopeThis.qrcode.id_business}
            }).then(resultBusiness=>{
                if(resultGetPayments.data.amountSucceeded === resultBusiness.business.objBusiness.amount){
                    deal(scopeThis)
                    resolve({code: 0, message: "已完成支付，清空购物车"})
                }else{
                    resolve({code: 1, message: "未完成支付"})
                }
            })
        })
    })
}

// 订单成交
function deal(scopeThis){
    if(scopeThis.postal.selected >= 0){
        scopeThis.postal.data = {
            code6: scopeThis.ly0session.user.postal[scopeThis.postal.selected].gbt2260code,
            address: scopeThis.ly0session.user.postal[scopeThis.postal.selected].address,
            tel: scopeThis.ly0session.user.postal[scopeThis.postal.selected].tel,
            name: scopeThis.ly0session.user.postal[scopeThis.postal.selected].name
        }
    }else if(scopeThis.postal.selected === -1){
        scopeThis.postal.data = {
            code6: scopeThis.ly0session.user.gbt2260code,
            address: scopeThis.ly0session.user.address,
            tel: scopeThis.ly0session.user.tel,
            name: scopeThis.ly0session.user.name
        }
    }else{
        scopeThis.postal.data = scopeThis.postalDataInit
    }

    dataRequest.storpro({
        noSession: true,
        storproName: "ly0d7mall.cart.deal",
        data: {
            id_business: scopeThis.business.objBusiness._id,
            postal: scopeThis.postal.data
        }
    }).then(()=>{
    })
}

export default {
    qrcodeOpened,
    qrcodeClosed,
    getPayments,
    deal
}
