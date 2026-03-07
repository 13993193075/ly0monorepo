// 微信小程序.旅客自助

// 我的订单
async function myBusiness({data, dependencies}) {
    // 订单手机号
    // data.cellphone

    let result = await dependencies.GQuery.GQuery({
        tblName: "ly0d4business",
        operator: "find",
        query: {
            status_code: "1",
            cellphone: data.cellphone
        }
    })
    const arrBusiness = result.data;
    if (arrBusiness.length === 0) {
        return {code: 1, message: "没有订单"}
    }

    let arrRoom = [],
        arrPromise = [];
    arrBusiness.forEach(iBusiness => {
        arrPromise.push(
            dependencies.GQuery.GQuery({
                tblName: "ly0d4room",
                operator: "find",
                query: {id_business: iBusiness._id}
            })
        )
    })
    result = Promise.all(arrPromise)
    result.forEach(iResult => {
        arrRoom = arrRoom.concat(iResult.data)
    })
    return {code: 0, message: "获取订单信息成功",
        data: {
            arrBusiness,
            arrRoom
        }
    }
}

export default {
    myBusiness
}
