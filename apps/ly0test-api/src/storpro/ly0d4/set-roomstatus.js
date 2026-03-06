// 修改房态
async function setRoomstatus ({data, dependencies}) {
    // data.id_room
    // data.status_code

    const upd = {
        status_code: data.status_code,
        status_text: dependencies.ly0utils.ly0d4.busicode.roomStatus.find(i=>{
            return i.code === data.status_code
        }).text
    }
    if(data.status_code === "0" || data.status_code === "1"){ // 维修 || 空房：取消房态关联
        upd.id_business = null
        upd.id_b_goods = null
        upd.checkin = null
        upd.checkout = null
    }
    let result = await dependencies.GQuery.GQuery({
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
    await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'updateOne',
        query: {
            _id: objRoom.id_b_goods
        },
        update: {
            room_status_code: objRoom.status_code,
            room_status_text: dependencies.ly0utils.ly0d4.busicode.roomStatus.find(i=>{
                return i.code === objRoom.status_code
            }).text
        }
    })
    return {code: 0, message: "已修改房态"}
}

// 同步房态：不能修改其它订单的房态
async function setRoomstatusWithBusiness({data, dependencies}) {
    // data.id_business

    try {
        // 获取订单基本信息
        const resBusiness = await dependencies.GQuery.GQuery({
            tblName: 'ly0d4business',
            operator: 'findOne',
            query: { _id: data.id_business }
        });
        const objBusiness = resBusiness.data;
        if (!objBusiness) return { code: 1, message: '订单id错误' };

        // 清除本订单相关的所有房态关联
        await dependencies.GQuery.GQuery({
            tblName: 'ly0d4room',
            operator: 'updateMany',
            query: { id_business: objBusiness._id },
            update: {
                id_business: null,
                id_b_goods: null,
                checkin: null,
                checkout: null,
                status_code: '1', // 空房
                status_text: dependencies.ly0utils.ly0d4.busicode.roomStatus.find(i => i.code === '1').text
            }
        });

        // 获取配房记录
        const resBGoods = await dependencies.GQuery.GQuery({
            tblName: 'ly0d4b_goods',
            operator: 'find',
            query: { id_business: objBusiness._id }
        });
        const arrBGoods = resBGoods.data || [];
        if (arrBGoods.length === 0) return { code: 0, message: '已同步房态（无配房记录）' };

        // 同步配房记录状态
        if(objBusiness.status_code !== "1"){
            // 订单状态非入住，用房状态重置为订单状态
            await dependencies.GQuery.GQuery({
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
            await dependencies.GQuery.GQuery({
                tblName: "ly0d4b_goods",
                operator: 'updateMany',
                query: {
                    id_business: objBusiness._id,
                    status_code: '0'
                },
                update: {
                    status_code: '1',
                    status_text: dependencies.ly0utils.ly0d4.busicode.businessStatus.find(i=>{return i.code === '1'}).text
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
                    dependencies.GQuery.GQuery({
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
                            status_text: iBGoods.room_status_text || dependencies.ly0utils.ly0d4.busicode.roomStatus.find(i=>{return i.code === '2'}).text
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

// 查询客房是否已被使用
async function roomused({data, dependencies}) {
    // data.id_b_goods ID排除
    // data.id_room
    // data.checkin
    // data.checkout

    const q = {
        id_room: data.id_room,
        $or: [
            {$and: [
                    {checkin: {
                            $exists: true,
                            $ne: null,
                            $lt: new Date(data.checkin)
                        }},
                    {checkout: {
                            $exists: true,
                            $ne: null,
                            $gt: new Date(data.checkin)
                        }}
                ]},
            {$and: [
                    {checkin: {
                            $exists: true,
                            $ne: null,
                            $lt: new Date(data.checkout)
                        }},
                    {checkout: {
                            $exists: true,
                            $ne: null,
                            $gt: new Date(data.checkout)
                        }}
                ]}
        ]
    }
    if(!!data.id_b_goods){
        Object.assign(q, {_id: {$ne: data.id_b_goods}})
    }
    const result = await dependencies.GQuery.GQuery({
        tblName: 'ly0d4b_goods',
        operator: 'findOne',
        query: q
    })
    if (result.data) {
        return {code: 1, message: '客房已被使用'}
    }
    return {code: 0, message: '客房未被使用'}
}

// 自动配房
async function allocation({data, dependencies}) {
    try {
        const thisTime = new Date();

        // 获取订单基本信息
        const resBusiness = await dependencies.GQuery.GQuery({
            tblName: "ly0d4business",
            operator: "findOne",
            query: { _id: data.id_business }
        });
        if (!resBusiness.data) throw new Error("订单id错误");
        const objBusiness = resBusiness.data;

        // 并行：获取预订记录 & 清空已有配房记录
        const [resSalebook] = await Promise.all([
            dependencies.GQuery.GQuery({
                tblName: "ly0d4salebook",
                operator: "find",
                query: { id_business: data.id_business }
            }),
            dependencies.GQuery.GQuery({
                tblName: "ly0d4b_goods",
                operator: "deleteMany",
                query: { id_business: data.id_business }
            })
        ]);
        const arrSalebook = JSON.parse(JSON.stringify(resSalebook.data || []));

        // 获取所有相关房型的候选房间
        const roomQueries = arrSalebook.map(i => {
            i.count0 = 0; // 初始化计数器
            return dependencies.GQuery.GQuery({
                tblName: "ly0d4room",
                operator: "find",
                query: { id_goods: i.id_goods },
                sort: { roomno: 1 }
            });
        });
        const roomResults = await Promise.all(roomQueries);
        const arrRoom = roomResults.flatMap(res => res.data || []);

        // 并行检查房间占用状态
        const statusChecks = arrRoom.map(room =>
            roomused({
                id_room: room._id,
                checkin: objBusiness.checkin,
                checkout: objBusiness.checkout
            })
        );
        const statusResults = await Promise.all(statusChecks);

        // 筛选可用房间并组装待插入数据
        let insertDataList = [];
        statusResults.forEach((status, index) => {
            const currentRoom = arrRoom[index];
            const targetSalebook = arrSalebook.find(sb => String(sb.id_goods) === String(currentRoom.id_goods));

            if (status.code === 0 && targetSalebook && targetSalebook.count0 < targetSalebook.count) {
                // 构造插入对象
                insertDataList.push({
                    time_create: thisTime,
                    time_update: thisTime,
                    id_dataunit: objBusiness.id_dataunit,
                    dataunit_name: objBusiness.dataunit_name,
                    id_hotel: objBusiness.id_hotel,
                    hotel_name: objBusiness.hotel_name,
                    id_business: objBusiness._id,
                    id_room: currentRoom._id,
                    roomno: currentRoom.roomno,
                    id_goods: currentRoom.id_goods,
                    goods_name: currentRoom.goods_name,
                    method_code: currentRoom.method_code,
                    method_text: currentRoom.method_text,
                    price_name: currentRoom.price_name,
                    price: currentRoom.price,
                    checkin: objBusiness.checkin,
                    checkout: objBusiness.checkout,
                    status_code: objBusiness.status_code,
                    status_text: objBusiness.status_text,
                    room_status_code: currentRoom.status_code,
                    room_status_text: currentRoom.status_text,
                });
                targetSalebook.count0++;
            }
        });

        // 执行批量插入 (效率最高)
        if (insertDataList.length > 0) {
            await dependencies.GQuery.GQuery({
                tblName: "ly0d4b_goods",
                operator: "insertMany",
                data: insertDataList
            });
        }

        return { code: 0, message: `已完成配房：${insertDataList.length}` };
    } catch (err) {
        console.error("配房失败: ", err);
        return { code: 1, message: "配房失败: " + err.message };
    }
}

// 预订
async function book({data, dependencies}) {
    // data.id_business

    await dependencies.GQuery.GQuery({ // 订单状态重置：预订
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "0", status_text: "预订"
        }
    })
    // 同步房态
    await setRoomstatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "订单状态：预订"}
}

// 入住
async function arrive({data, dependencies}) {
    // data.id_business

    await dependencies.GQuery.GQuery({ // 订单状态重置：入住
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "1", status_text: "入住"
        }
    })
    // 同步房态
    await setRoomstatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "订单状态：入住"}
}

// 离开
async function leave({data, dependencies}) {
    // data.id_business

    let result = await dependencies.GQuery.GQuery({ // 查询支付状态
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

    await dependencies.GQuery.GQuery({ // 订单状态重置：离店
        tblName: "ly0d4business",
        operator: "updateOne",
        query: {_id: data.id_business},
        update: {
            status_code: "2", status_text: "离开"
        }
    })
    // 同步房态
    await setRoomstatusWithBusiness({
        id_business: data.id_business
    })
    return {code: 0, message: "已结算，订单状态：离开"}
}

export default {
    setRoomstatus,
    setRoomstatusWithBusiness,
    roomused,
    allocation,
    book,
    arrive,
    leave
}