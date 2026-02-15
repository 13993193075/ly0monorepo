// 微信小程序.旅客自助
import {GQuery} from '../../main/GQuery.js'

// 我的订单
function myBusiness(data) {
    // 订单手机号
    // data.cellphone

    return new Promise((resolve, reject) => {
        GQuery({
            tblName: "ly0d4business",
            operator: "find",
            query: {
                status_code: "1",
                cellphone: data.cellphone
            }
        }).then(result => {
            let arrBusiness = result.data;
            if (arrBusiness.length === 0) {
                return resolve({code: 1, message: "没有订单"})
            }

            let arrRoom = [],
                arrPromise = [];
            arrBusiness.forEach(iBusiness => {
                arrPromise.push(
                    GQuery({
                        tblName: "ly0d4room",
                        operator: "find",
                        query: {id_business: iBusiness._id}
                    })
                )
            })
            Promise.all(arrPromise).then(result => {
                result.forEach(iResult => {
                    arrRoom = arrRoom.concat(iResult.data)
                })
                resolve({code: 0, message: "获取订单信息成功",
                    data: {
                        arrBusiness,
                        arrRoom
                    }
                })
            })
        })
    })
}

export default {
    myBusiness
}
