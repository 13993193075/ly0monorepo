import dataRequest from "../../../../utils/data-request.js"
import jump from "../handles/jump.js"

// 获取商城用户订单记录
function getBusiness(scopeThis){
    return new Promise((resolve, reject)=>{
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.record.getBusiness",
            data: {
                id_guest: scopeThis.ly0session.user._id,
                limit: scopeThis.dataBox.limit,
                page: scopeThis.dataBox.page
            }
        }).then(result=>{
            scopeThis.dataBox.dataBusiness = result.dataBusiness
            resolve()
        })
    })
}

// 获取某一订单记录的商品清单
function getBGoods(scopeThis, id_business){
    return new Promise((resolve, reject)=>{
        dataRequest.storpro({
            noSession: true,
            storproName: "ly0d7mall.record.getBGoods",
            data: {id_business}
        }).then(result=>{
            scopeThis.dataBox.dataBGoods = result.dataBGoods
            resolve()
        })
    })
}

//
function reload(scopeThis){
    scopeThis.ly0session = dataRequest.ly0sessionLoad()
    scopeThis.srcPrefix = dataRequest.srcPrefix
    getBusiness(scopeThis).then(()=>{
        if(!scopeThis.dataBox.dataBusiness.data || scopeThis.dataBox.dataBusiness.data.length === 0){
            scopeThis.dataBox.dataBGoods = []
            return
        }
        scopeThis.dataBox.id_business = scopeThis.dataBox.dataBusiness.data[0]._id
        scopeThis.handles.getBGoods(scopeThis, scopeThis.dataBox.dataBusiness.data[0]._id).then(()=>{
        })
    })
}

// 选中订单
function id_business(scopeThis, id_business){
    scopeThis.dataBox.id_business = id_business
    getBGoods(scopeThis, id_business)
}

export default {
    dataRequest,
    getBusiness,
    getBGoods,
    reload,
    id_business,
    jump
}