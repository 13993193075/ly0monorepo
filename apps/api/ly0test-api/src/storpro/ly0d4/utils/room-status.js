import {GQuery} from '../../../main/GQuery.js'
import {ly0d4 as beanLy0d4} from 'packages/ly0utils'

// 修改房态
async function setRoomStatus (data) {
    // data.id_room
    // data.status_code

    const upd = {
        status_code: data.status_code,
        status_text: beanLy0d4.busicode.roomStatus.find(i=>{
            return i.code === data.status_code
        }).text
    }
    if(data.status_code === "0" || data.status_code === "1"){ // 维修 || 空房：取消房态关联
        upd.id_business = null
        upd.id_b_goods = null
        upd.checkin = null
        upd.checkout = null
    }
    let result = await GQuery({
        tblName: 'ly0d4room',
        operator: 'updateOne',
        query: {
            _id: data.id_room
        },
        update: upd
    })
    const objRoom = result.dataNew
    if(!objRoom.id_b_goods){
        return {code: 0, message: "已修改房态"}
    }

    // 房态缓存至配房记录
    await GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateOne',
        query: {
            _id: objRoom.id_b_goods
        },
        update: {
            room_status_code: objRoom.status_code,
            room_status_text: beanLy0d4.busicode.roomStatus.find(i=>{
                return i.code === objRoom.status_code
            }).text
        }
    })
    return {code: 0, message: "已修改房态"}
}

// 同步房态：不能修改其它订单的房态
async function setRoomStatusWithBusiness(data) {
    // data.id_business
    try {
        // 获取订单基本信息
        const resBusiness = await GQuery({
            tblName: 'ly0d4business',
            operator: 'findOne',
            query: { _id: data.id_business }
        });
        const objBusiness = resBusiness.data;
        if (!objBusiness) return { code: 1, message: '订单id错误' };

        // 清除本订单相关的所有房态关联
        await GQuery({
            tblName: 'ly0d4room',
            operator: 'updateMany',
            query: { id_business: objBusiness._id },
            update: {
                id_business: null,
                id_b_goods: null,
                checkin: null,
                checkout: null,
                status_code: '1', // 空房
                status_text: beanLy0d4.busicode.roomStatus.find(i => i.code === '1').text
            }
        });

        // 获取配房记录
        const resBGoods = await GQuery({
            tblName: 'ly0d4b_goods',
            operator: 'find',
            query: { id_business: objBusiness._id }
        });
        const arrBGoods = resBGoods.data || [];
        if (arrBGoods.length === 0) return { code: 0, message: '已同步房态（无配房记录）' };

        // 同步配房记录状态
        if(objBusiness.status_code !== "1"){
            // 订单状态非入住，用房状态重置为订单状态
            await GQuery({
                tblName: "ly0d4b_goods",
                operator: 'updateMany',
                query: { id_business: objBusiness._id },
                update: {
                    status_code: objBusiness.status_code,
                    status_text: objBusiness.status_text
                }
            })
        }else{
            // 订单状态：入住，用房状态保持不变，
            /* 但不能是预订
            await GQuery({
                tblName: "ly0d4b_goods",
                operator: 'updateMany',
                query: {
                    id_business: objBusiness._id,
                    status_code: '0'
                },
                update: {
                    status_code: '1',
                    status_text: beanLy0d4.busicode.businessStatus.find(i=>{return i.code === '1'}).text
                }
            })
            */
        }

        // 订单状态非入住，不继续同步房态
        if (objBusiness.status_code !== "1") {
            return { code: 0, message: '已同步房态（订单状态非入住）' };
        }

        // 同步房态
        // 通过 Promise.all 并行处理，而不是串行等待
        const roomUpdateTasks = []
        arrBGoods.forEach(iBGoods => {
            if(iBGoods.status_code === '1'){
                roomUpdateTasks.push(
                    GQuery({
                        tblName: 'ly0d4room',
                        operator: 'updateOne',
                        query: {
                            _id: iBGoods.id_room,
                            id_business: { $in: [null, undefined] } // 确保不覆盖其他订单
                        },
                        update: {
                            id_business: objBusiness._id,
                            id_b_goods: iBGoods._id,
                            checkin: iBGoods.checkin,
                            checkout: iBGoods.checkout,
                            status_code: iBGoods.room_status_code || "2",
                            status_text: iBGoods.room_status_text || beanLy0d4.busicode.roomStatus.find(i=>{return i.code === '2'}).text
                        }
                    })
                )
            }
        })
        await Promise.all(roomUpdateTasks);
        return { code: 0, message: '已同步房态' };
    } catch (error) {
        console.error("同步房态失败:", error);
        return { code: 1, message: error.message };
    }
}

// 预订
async function book(data) {
    // data.id_business

    await GQuery({ // 订单状态重置：预订
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "0", status_text: "预订"
        }
    })
    // 同步房态
    await setRoomStatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "订单状态：预订"}
}

// 入住
async function arrive(data) {
    // data.id_business

    await GQuery({ // 订单状态重置：入住
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "1", status_text: "入住"
        }
    })
    // 同步房态
    await setRoomStatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "订单状态：入住"}
}

// 离开
async function leave(data) {
    // data.id_business

    let result = await GQuery({ // 查询支付状态
        tblName: "ly0d2payment",
        operator: "findOne",
        query: {
            id_business: data.id_business,
            status_code: "1"
        }
    })
    if (!!result.data) {
        return {code: 1, message: "未完成支付，不能办理离开手续"}
    }

    await GQuery({ // 订单状态重置：离店
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "2", status_text: "离开"
        }
    })
    // 同步房态
    await setRoomStatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "已结算，订单状态：离开"}
}

export default {
    setRoomStatus,
    setRoomStatusWithBusiness,
    book,
    arrive,
    leave
}