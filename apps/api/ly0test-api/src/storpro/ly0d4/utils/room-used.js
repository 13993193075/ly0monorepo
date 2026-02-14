import {GQuery} from '../../../main/GQuery.js'

// 查询客房是否已被使用
async function roomUsed(data){
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
    const result = await GQuery({
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
async function allocation(data) {
    try {
        const thisTime = new Date();

        // 获取订单基本信息
        const resBusiness = await GQuery({
            tblName: "ly0d4business",
            operator: "findOne",
            query: { _id: data.id_business }
        });
        if (!resBusiness.data) throw new Error("订单id错误");
        const objBusiness = resBusiness.data;

        // 并行：获取预订记录 & 清空已有配房记录
        const [resSalebook] = await Promise.all([
            GQuery({
                tblName: "ly0d4salebook",
                operator: "find",
                query: { id_business: data.id_business }
            }),
            GQuery({
                tblName: "ly0d4b_goods",
                operator: "deleteMany",
                query: { id_business: data.id_business }
            })
        ]);
        const arrSalebook = JSON.parse(JSON.stringify(resSalebook.data || []));

        // 获取所有相关房型的候选房间
        const roomQueries = arrSalebook.map(i => {
            i.count0 = 0; // 初始化计数器
            return GQuery({
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
            roomUsed({
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
            await GQuery({
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

export default {
    roomUsed,
    allocation
}