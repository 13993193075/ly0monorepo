// 微信支付

// 客户付款码付款
async function wxzf0({data, dependencies, storproRun}){
    const id_business = data.id_business, // 订单ID
        businesstype_code = data.businesstype_code, // 订单类型
        amount = data.amount, // 金额
        note = data.note, // 备注
        micropay_code = data.micropay_code, // 客户付款码
        appid = data.appid, // 应用ID
        mchid = data.mchid, // 商户号
        description = data.description || '', // 商品描述
        spbill_create_ip = data.spbill_create_ip || '', // 发起支付的终端设备IP地址
        rec = data.rec // 记录

    if(amount <= 0){
        return {code: 1, message: "金额为 0，不能发起支付"}
    }
    if(! appid || ! mchid){
        return {code: 1, message: "应用ID或商户号不存在，不能发起支付"}
    }
    // 查询支付流水
    let result = await getPayments({
        id_business
    })
    if(result.data.arrStarted.length > 0){
        return {code: 1, message: "支付中，不能再次发起支付"}
    }
    const objCodeBusinessType = dependencies.ly0utils.ly0d2.busicode.businessType.find(i=>{
        return i.code === businesstype_code
    })
    if(!objCodeBusinessType){
        return {code: 1, message: "订单类型错误"}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: businesstype_code,
        operator: "findOne",
        data: {
            _id: id_business
        }
    })
    const objBusiness = result.data
    if(!objBusiness){
        return {code: 1, message: "订单id不存在"}
    }

    //发生新的支付记录
    const thisTime = new Date ()
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name || "数据缺失",
            rec,
            id_business,
            businesstype_code,
            businesstype_text: objCodeBusinessType.text,
            amount,
            process_code: "wxzf0",
            process_text: "微信支付.客户付款码付款",
            note,
            status_code: "1",
            status_text: "支付中",
            time: thisTime,
            wxzf_appid: appid,
            wxzf_mchid: mchid
        }
    })
    const newId = result.dataNew._id

    result = await storproRun({
        storproName: "ly0d1.d0mchid.getMchidMore",
        data: {mchid}
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 MCHID 凭据失败"}
    }
    const objMchid = result.objMchid;

    result = await dependencies.ly0nodejs.WeChat_Pay.v2micropay({
        appid,
        mchid,
        apikey: objMchid.v2apikey,
        auth_code: micropay_code,
        total_fee: amount,
        body: description,
        out_trade_no: newId,
        spbill_create_ip
    })
    let code = result.code, message = result.message,
        rtn_bodyJson = result.rtn_bodyJson;
    if(code !== 0){//支付失败
        message = message + " [错误码：" +(rtn_bodyJson.err_code ? rtn_bodyJson.err_code: "无")
            + " 说明：" + (rtn_bodyJson.err_code_des ? rtn_bodyJson.err_code_des: "无" ) + "]";

        // 删除新记录
        await dependencies.GQuery.GQuery({
            tblName: "ly0d2payment",
            operator: "deleteOne",
            query: {_id: newId}
        })
        return {code, message}
    } else {
        return {code, message}
    }
}

// 客户微信号付款
async function wxzf1({data, dependencies, storproRun}){
    const id_business = data.id_business, // 订单ID
        businesstype_code = data.businesstype_code, //订单类型
        amount = data.amount, //金额
        note = data.note, // 备注
        appid = data.appid, // 应用ID
        mchid = data.mchid, // 商户号
        js_code = data.js_code, // 临时票据
        description = data.description || '', // 商品描述
        notify_url = data.notify_url || '', // 异步接收支付结果通知的回调地址
        rec = data.rec // 记录

    if(amount <= 0){
        return {code: 1, message: "金额为 0，不能发起支付"}
    }
    if(! appid || ! mchid || ! js_code){
        return {code: 1, message: "应用ID或商户号不存在，不能发起支付"}
    }
    // 查询支付流水
    let result = await getPayments({id_business})
    if(result.data.arrStarted.length > 0){
        return {code: 1, message: "支付中，不能再次发起支付"}
    }
    const objCodeBusinessType = dependencies.ly0utils.ly0d2.busicode.businessType.find(i=>{
        return i.code === businesstype_code
    })
    if(!objCodeBusinessType){
        return {code: 1, message: "订单类型错误"}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: businesstype_code,
        operator: "findOne",
        data: {
            _id: id_business
        }
    })
    const objBusiness = result.data
    if(!objBusiness){
        return {code: 1, message: "订单id不存在"}
    }

    // 发生新的支付记录
    const thisTime = new Date()
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name ? objBusiness.dataunit_name : "数据缺失",
            rec,
            id_business,
            businesstype_code,
            businesstype_text: objCodeBusinessType.text,
            amount,
            process_code: "wxzf1",
            process_text: "微信支付.客户微信号付款",
            note,
            status_code: "1",
            status_text: "支付中",
            time: thisTime,
            wxzf_appid: appid,
            wxzf_mchid: mchid
        }
    })
    const newId = result.dataNew._id

    result = await storproRun({
        storproName: "ly0d1.d0appid.getAppidMore",
        data: {appid}
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 APPID 凭据失败"}
    }
    const secret = result.objAppid.secret

    // 获取openid
    result = await dependencies.ly0nodejs.WeChat.Token.getMiniProgramSession({
        appid,
        secret,
        js_code
    })
    const openid = result.openid

    result = await storproRun({
        storproName: "ly0d1.d0mchid.getMchidMore",
        data: {mchid}
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 MCHID 凭据失败"}
    }
    const serial_no = result.objMchid.serial_no,
        private_key = result.objMchid.private_key;

    result = await dependencies.ly0nodejs.WeChat_Pay.v3jsapi({
        appid,
        mchid,
        serial_no,
        private_key,
        openid,
        amount,
        description,
        out_trade_no: newId,
        notify_url
    })
    if(result.code !== 0){
        return {code: 1, message: result.message}
    }
    return {code: 0, message: "发起支付成功",
        objPrepayId: result.data
    }
}

// 商户二维码收款
async function wxzf2({data, dependencies, storproRun}){
    const id_business = data.id_business, // 订单ID
        businesstype_code = data.businesstype_code, // 订单类型
        amount = data.amount, // 金额
        note = data.note, // 备注
        appid = data.appid, // 应用ID
        mchid = data.mchid, // 商户号
        description = data.description || '', // 商品描述
        notify_url = data.notify_url || '', // 异步接收支付结果通知的回调地址
        rec = data.rec // 记录

    //不能发起支付
    if(amount <= 0){
        return {code: 1, message: "金额为 0，不能发起支付"}
    }
    if(! appid || ! mchid){
        return {code: 1, message: "应用ID或商户号不存在，不能发起支付"}
    }
    // 查询支付流水
    let result = await getPayments({
        id_business
    })
    if(result.data.arrStarted.length > 0){
        return {code: 1, message: "支付中，不能再次发起支付"}
    }
    const objCodeBusinessType = dependencies.ly0d2.busicode.businessType.find(i=>{
        return i.code === businesstype_code
    })
    if(!objCodeBusinessType){
        return {code: 1, message: "订单类型错误"}
    }
    result = await dependencies.GQuery.GQuery({
        tblName: businesstype_code,
        operator: "findOne",
        data: {
            _id: id_business
        }
    })
    const objBusiness = result.data
    if(!objBusiness){
        return {code: 1, message: "订单id不存在"}
    }

    // 发生新的支付记录
    const thisTime = new Date ()
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name ? objBusiness.dataunit_name : "数据缺失",
            rec,
            id_business,
            businesstype_code,
            businesstype_text: objCodeBusinessType.text,
            amount,
            process_code: "wxzf2",
            process_text: "微信支付.商户二维码收款",
            note,
            status_code: "1",
            status_text: "支付中",
            time: thisTime,
            wxzf_appid: appid,
            wxzf_mchid: mchid
        }
    })
    const newId = result.dataNew._id
    result = storproRun({
        storproName: "ly0d1.d0mchid.getMchidMore",
        data: {mchid}
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 MCHID 凭据失败"}
    }

    const serial_no = result.objMchid.serial_no,
        private_key = result.objMchid.private_key;
    result = await dependencies.ly0nodejs.WeChat_Pay.v3native({
        appid,
        mchid,
        serial_no,
        private_key,
        amount,
        description,
        out_trade_no: newId,
        notify_url
    })
    if(result.code !== 0){
        return {code: 1, message: result.message}
    }
    const code_url = result.code_url

    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "updateOne",
        query: {_id: newId},
        update: {wxzf_code_url: code_url}
    })
    return {
        code: 0, message: "获取收款二维码成功",
        code_url
    }
}

// 查询微信后台并同步，每次仅同步一条
async function getStatus({data, dependencies, storproRun}) {
    // data.mchid
    // data.id_business

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "findOne",
        query: {
            id_business: data.id_business,
            $or: [
                {process_code: "wxzf0"},
                {process_code: "wxzf1"},
                {process_code: "wxzf2"}
            ],
            status_code: "1"
        }
    })
    const objStarted = result.data
    if(! objStarted){
        //没有需要同步（支付中）的支付记录
        return {
            code: 0, message: "查询微信后台：没有需要同步（支付中）的支付记录",
            status_code: "0",
            status_text: "未支付"
        }
    }

    const mchid = data.mchid || objStarted.wxzf_mchid
    result = storproRun({
        storproName: "ly0d1.d0mchid.getMchidMore",
        data: {mchid}
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 MCHID 凭据失败"}
    }
    const serial_no = result.objMchid.serial_no,
        private_key = result.objMchid.private_key

    const objTransaction = await dependencies.ly0nodejs.WeChat_Pay.v3outTradeNo({
        mchid,
        serial_no,
        private_key,
        out_trade_no: objStarted._id
    })
    if(objTransaction.code !== 0){
        return {code: 1, message: objTransaction.message}
    }
    if(!objTransaction.transaction){
        return {code: 0, message: "查询微信后台：已同步"}
    }

    const objResolve = {code: 0, message: "查询微信后台：同步成功"}
    const objUpdate = {
        wxzf_out_trade_no: objTransaction.transaction.out_trade_no || null,
        wxzf_transaction_id: objTransaction.transaction.transaction_id || null,
        wxzf_trade_type: objTransaction.transaction.trade_type || null,
        wxzf_trade_state: objTransaction.transaction.trade_state || null,
        wxzf_trade_state_desc: objTransaction.transaction.trade_state_desc || null,
        wxzf_bank_type: objTransaction.transaction.bank_type || null,
        wxzf_success_time: objTransaction.transaction.success_time || null,
        wxzf_payer_openid: objTransaction.transaction.payer && objTransaction.transaction.payer.openid
            ? objTransaction.transaction.payer.openid: null,
        wxzf_amount_total: objTransaction.transaction.amount && objTransaction.transaction.amount.total
            ? objTransaction.transaction.amount.total: null
    }

    const thisTime = new Date()
    if(objTransaction.transaction.trade_state && objTransaction.transaction.trade_state === "SUCCESS"){
        objUpdate.status_code = "2"
        objUpdate.status_text = "支付成功"
        objUpdate.end = thisTime

        objResolve.status_code = "2"
        objResolve.status_text = "支付成功"
    } else if(objTransaction.transaction.trade_state
        &&(objTransaction.transaction.trade_state === "CLOSED"
            || objTransaction.transaction.trade_state === "REVOKED"
            || objTransaction.transaction.trade_state === "PAYERROR"
        )
    ){
        objUpdate.status_code = "3"
        objUpdate.status_text = "支付失败"
        objUpdate.end = thisTime

        objResolve.status_code = "3"
        objResolve.status_text = "支付失败"
    } else {
        objUpdate.status_code = "1"
        objUpdate.status_text = "支付中"

        objResolve.status_code = "1"
        objResolve.status_text = "支付中"
    }
    objResolve.amount = objStarted.amount

    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "updateOne",
        query: {_id: objStarted._id},
        update: objUpdate
    })
    return Object.assign(objResolve, {
        out_trade_no: objStarted._id
    })
}

// 查询支付流水
async function getPayments({data, dependencies, storproRun}){
    // data.mchid
    // data.id_business

    // 查询微信后台并同步
    let result = getStatus({
        mchid: data.mchid || null,
        id_business: data.id_business
    })
    const status_code = result.status_code,
        status_text = result.status_text
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "find",
        query: {id_business: data.id_business},
        sort: {time: -1}
    })
    const arrPayment = result.data

    // 已支付
    const arrSucceeded = arrPayment.filter(function(i){
            return i.status_code === "2"
        }),
        amountSucceeded = [0].concat(arrSucceeded).reduce(function(total, i){
            return total + Number(i.amount )
        })

    // 支付中
    const arrStarted = arrPayment.filter(function(i){
            return i.status_code === "1"
        }),
        amountStarted = [ 0 ].concat(arrStarted ).reduce(function(total, i){
            return total + Number(i.amount )
        })

    // 支付失败
    const arrFailed = arrPayment.filter(function(i){
            return i.status_code === "3"
        }),
        amountFailed = [ 0 ].concat(arrFailed ).reduce(function(total, i){
            return total + Number(i.amount )
        })

    return {code: 0, message: "微信后台已同步",
        data: {
            status_code,
            status_text,
            arrPayment,
            arrSucceeded,
            amountSucceeded,
            arrStarted,
            amountStarted,
            arrFailed,
            amountFailed
        }
    }
}

// 中止支付
async function setFail({data, dependencies, storproRun}){
    // data.mchid
    // data.id_business

    // 查询微信后台并同步
    let result = await getStatus({
        id_business: data.id_business
    })
    result = await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "findOne",
        query: {
            id_business: data.id_business,
            $or: [
                {process_code: "wxzf0"},
                {process_code: "wxzf1"},
                {process_code: "wxzf2"}
            ],
            status_code: "1"
        }
    })
    const objStarted = result.data
    if(! objStarted){
        return {code: 0, message: "没有需要中止支付的记录"}
    }

    const mchid = data.mchid || objStarted.mchid
    result = await storproRun({
        storproName: "ly0d1.d0mchid.getMchidMore",
    })
    if(result.code !== 0){
        return {code: 1, message: "获取 MCHID 凭据失败"}
    }
    const serial_no = result.objMchid.serial_no,
        private_key = result.objMchid.private_key

    await dependencies.ly0nodejs.WeChat_Pay.v3close({
        mchid,
        serial_no,
        private_key,
        out_trade_no: objStarted._id
    })
    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "updateOne",
        query: {_id: objStarted._id},
        update: {status_code: "3", status_text: "支付失败"}
    })
    return {code: 0, message: "支付已中止"}
}

// 收银-系统外流转
async function cash({data, dependencies, storproRun}){
    const id_business = data.id_business, // 订单ID
        businesstype_code = data.businesstype_code, // 订单类型
        amount = data.amount, // 金额
        method_code = data.method_code ? data.method_code : "0",
        note = data.note,
        rec = data.rec // 记录

    if(! /^[0-9]+$/.test(amount ) || amount <= 0){
        return {code: 1, message: "金额：大于 0，小数点后 2 位"}
    }
    let objCodeBusinessType = dependencies.ly0utils.ly0d2.busicode.businessType.find(i=>{
        return i.code === businesstype_code
    })
    if(!objCodeBusinessType){
        return {code: 1, message: "订单类型错误"}
    }
    if(!data.method_code){
        return {code: 1, message: "必选项：用户自主支付方式"}
    }
    const result = await dependencies.GQuery.GQuery({
        tblName: businesstype_code,
        operator: "findOne",
        query: {
            _id: id_business
        }
    })
    const objBusiness = result.data
    if(!objBusiness){
        return {code: 1, message: "订单id不存在"}
    }

    // 发生新的支付记录
    const thisTime = new Date ()
    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "insertOne",
        update: {
            time_create: thisTime,
            time_update: thisTime,
            id_dataunit: objBusiness.id_dataunit,
            dataunit_name: objBusiness.dataunit_name ? objBusiness.dataunit_name : "数据缺失",
            rec,
            id_business,
            businesstype_code,
            businesstype_text: objCodeBusinessType.text,
            amount,
            process_code: "0",
            process_text: "系统外流转",
            method_code,
            method_text: dependencies.ly0utils.ly0d2.busicode.paymentMethod.find(i=>{
                return i.code === data.method_code
            }).text,
            status_code: "2",
            status_text: "支付成功",
            time: thisTime,
            note: note ? note: ""
        }
    })
    return {code: 0, message: "收银成功"}
}

// 退款
async function refund({data, dependencies, storproRun}){
    // data.id_business

    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "updateMany",
        query: {
            id_business: data.id_business,
            $or: [
                {status_code: "1"},
                {status_code: "2"}
            ]
        },
        update: {
            status_code: "4", status_text: "已退款"
        }
    })
    return{code: 0, message: "退款成功"}
}

// 删除所有支付记录
async function deletePayments({data, dependencies, storproRun}){
    // data.id_business

    await dependencies.GQuery.GQuery({
        tblName: "ly0d2payment",
        operator: "deleteMany",
        query: {
            id_business: data.id_business
        }
    })
    return {code: 0, message: "已删除所有支付记录"}
}

export default {
    wxzf0,
    wxzf1,
    wxzf2,
    getStatus,
    getPayments,
    setFail,
    cash,
    refund,
    deletePayments
}