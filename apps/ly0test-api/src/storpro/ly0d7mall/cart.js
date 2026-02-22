import {GQuery} from '../../main/GQuery.js'
import id_business from "../ly0d7/id_business.js"
import {GBT} from '@yoooloo42/ly0utils'

// 获取购物车信息
async function getCart(data){
    // data.id_guest

    let result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {
            id_guest: data.id_guest,
            status_code: "1"
        }
    })
    if(!result.data){
        return {code: 1, message: "购物车空"}
    }

    result = await id_business.id_business({id_business: result.data})
    const business = result.business
    // 获取商城代收商户号
    result = await GQuery({
        tblName: "ly0d7shop",
        operator: "findOne",
        query: {
            id_dataunit: business.objBusiness.id_dataunit,
            mall: true
        }
    })
    const objShop = result.data

    return {code: 0, message: "已获取购物车信息",
        business,
        wx_appid: objShop.wx_appid || "",
        wx_mchid: objShop.wx_mchid || ""
    }
}

// 加入购物车
async function addOne(data){
    // data.id_goods
    // data.id_guest

    // 获取商品信息
    let result = await GQuery({
        tblName: "ly0d7goods",
        operator: "findOne",
        query: {_id: data.id_goods}
    })
    const objGoods = result.data
    if(!objGoods){
        return {code: 1, message: "商品id错误"}
    }

    // 获取购物车信息（交易中的订单信息）
    result = await GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {
            id_guest: data.id_guest,
            status_code: "1"
        }
    })
    let objBusiness = result.data
    const thisTime = new Date()
    if(!objBusiness){
        // 购物车为空，发生新订单
        result = await GQuery({
            tblName: "ly0d7business",
            operator: "insertOne",
            update: {
                time_create: thisTime,
                time_update: thisTime,
                id_dataunit: objGoods.id_dataunit,
                dataunit_name: objGoods.dataunit_name,

                // 1个订单内可能有多个商店的商品
                // id_shop: objGoods.id_shop,
                // shop_name: objGoods.shop_name,

                status_code: "1", // 交易中
                status_text: code.businessStatus.find(i=>{
                    return i.code === "1"
                }).text,
                time: thisTime,
                id_guest: data.id_guest
            }
        })
        objBusiness = result.dataNew
    }

    // 获取购物车中该商品的数量
    result= await GQuery({
        tblName: "ly0d7b_goods",
        operator: "findOne",
        query: {
            id_goods: objGoods._id,
            id_business: objBusiness._id
        }
    })
    let objBGoods = result.data
    // 加入购物车
    if(!objBGoods){
        // 购物车中没有该商品
        result = await GQuery({
            tblName: "ly0d7b_goods",
            operator: "insertOne",
            update: {
                time_create: thisTime,
                time_update: thisTime,
                id_dataunit: objGoods.id_dataunit,
                dataunit_name: objGoods.dataunit_name,
                id_shop: objGoods.id_shop,
                shop_name: objGoods.shop_name,
                id_business: objBusiness._id,
                id_goods: objGoods._id,
                number: objGoods.number,
                name: objGoods.name,
                price_name: objGoods.price[0].name ? objGoods.price[0].name : "",
                price: objGoods.price[0].price,
                thumb: objGoods.thumb ? objGoods.thumb : "",
                count: 1, // 数量
                id_guest: data.id_guest
            }
        })
    }else{
        // 购物车中已有该商品
        result = await GQuery({
            tblName: "ly0d7b_goods",
            operator: "updateOne",
            query:{_id: objBGoods._id},
            update: {
                $inc: {count: 1} // 数量加1
            }
        })
    }

    // 重新计费
    result = await id_business.id_business({id_business: objBusiness._id})
    return {code: 0, message: "加入购物车成功",
        business: result.business // 返回购物车信息（交易中的订单信息）
    }
}

// 删除一条记录
async function deleteOne({id_bGoods}){
    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "deleteOne",
        query: {_id: id_bGoods}
    })
    return {code: 0, message: "删除一条记录成功"}
}

// 修改数量
async function setCount(data){
    // data.id_bGoods
    // data.count

    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "updateOne",
        query: {_id: data.id_bGoods},
        update: {
            count: data.count
        }
    })
    return {code: 0, message: "修改数量成功"}
}

// 成交
async function deal(data){
    // data.id_business
    // data.postal.code6
    // data.postal.address
    // data.postal.tel
    // data.postal.name

    const objPostalCode6 = GBT.gbt2260code6.find(i=>{
        return i.code6 === data.postal.code6
    })
    const thisTime = new Date()
    const result = GQuery({
        tblName: "ly0d7business",
        operator: "findOne",
        query: {_id: data.id_business},
    })
    const objBusiness = result.data
    await GQuery({
        tblName: "ly0d7business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "2",
            status_text: code.businessStatus.find(i=>{
                return i.code === "2"
            }).text,
            time: thisTime,
            deal: objBusiness.amount,
            dealnote: "",
            postal_gbt2260code: data.postal.code6,
            postal_gbt2260text: objPostalCode6.text2 + "-" + objPostalCode6.text4 + "-" + objPostalCode6.text6,
            postal_address: data.postal.address,
            postal_tel: data.postal.tel,
            postal_name: data.postal.name
        }
    })
    // 已售出商品注入邮寄信息
    await GQuery({
        tblName: "ly0d7b_goods",
        operator: "updateMany",
        query: {id_business: data.id_business},
        update: {
            postal_status_code: "1", // 分拣中
            postal_status_text: code.postalStatus.find(i=>{
                return i.code === "1"
            }).text,
            postal_time: thisTime,
            postal_gbt2260code: data.postal.code6,
            postal_gbt2260text: objPostalCode6.text2 + "-" + objPostalCode6.text4 + "-" + objPostalCode6.text6,
            postal_address: data.postal.address,
            postal_tel: data.postal.tel,
            postal_name: data.postal.name
        }
    })
    return {code: 0, message: "已成交"}
}

export default {
    getCart,
    addOne,
    deleteOne,
    setCount,
    deal
}
